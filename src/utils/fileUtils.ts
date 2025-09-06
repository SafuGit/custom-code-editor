// import { path } from "@tauri-apps/api";
import { exists, stat } from "@tauri-apps/plugin-fs";
import langMap from "language-map";

type ExtensionMap = {
  extensions?: string[];
}

async function createFileId(filePath: string) {
  await exists(filePath);

  const info = await stat(filePath);
  return `${filePath}>${info.size}>${new Date().getTime()}`;
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
  const ext = '.' + (filePath.split(".").pop() || "");
  for (const [lang, meta] of Object.entries(langMap) as [string, ExtensionMap][]) {
    if (meta.extensions && meta.extensions.includes(ext)) {
      return lang.toLowerCase();
    }
  }
  return "plaintext";
}

function getAllLanguages() {
  return Object.keys(langMap).map(lang => lang.toLowerCase());
}

export { createFileId, getFileName, getLastModified, getFileLanguage, getAllLanguages };