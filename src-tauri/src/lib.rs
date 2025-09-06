// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use std::fs;
use std::path::Path;

#[derive(serde::Serialize)]
pub struct FileNode {
    pub path: String,
    pub r#type: String, // "file" or "folder"
    pub children: Vec<FileNode>,
}

#[tauri::command]
fn scan_folder(path: &str) -> Result<FileNode, String> {
    let dir_path = Path::new(path);

    if !dir_path.exists() {
        return Err("Provided path does not exist".to_string());
    }

    fn scan(path: &Path) -> Vec<FileNode> {
        let mut nodes = Vec::new();

        if let Ok(entries) = fs::read_dir(path) {
            for entry in entries.flatten() {
                let entry_path = entry.path();
                let node = if entry_path.is_dir() {
                    FileNode {
                        path: entry_path.to_string_lossy().to_string(),
                        r#type: "folder".to_string(),
                        children: scan(&entry_path),
                    }
                } else {
                    FileNode {
                        path: entry_path.to_string_lossy().to_string(),
                        r#type: "file".to_string(),
                        children: vec![],
                    }
                };
                nodes.push(node);
            }
        }

        nodes
    }

    let root = FileNode {
        path: dir_path.to_string_lossy().to_string(),
        r#type: "folder".to_string(),
        children: scan(dir_path),
    };

    Ok(root)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, scan_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
