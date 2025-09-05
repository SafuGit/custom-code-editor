// import { path } from "@tauri-apps/api";
import { exists, stat } from "@tauri-apps/plugin-fs";
import langMap from "lang-map";

async function createFileId(filePath: string) {
  await exists(filePath);

  const info = await stat(filePath);
  return `${filePath}-${info.size}-${new Date().getTime()}`;
}

async function getFileName(filePath: string) {
  await exists(filePath);

  const name = filePath.split(/(\/|\\)/).pop();
  return name || "untitled";
}

async function getLastModified(filePath: string) {
  await exists(filePath);

  const info = await stat(filePath);
  return info.mtime || new Date();
}

function getFileLanguage(filePath: string) {
  const ext = filePath.split(".").pop();
  if (!ext) return "plaintext";
  const langs = langMap.languages(ext.toString());
  if (langs!.length > 1) {
    return langs![0];
  } else {
    return langs ? langs[0] : "plaintext";
  }
}

export { createFileId, getFileName, getLastModified, getFileLanguage };