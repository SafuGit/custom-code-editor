import { open } from "@tauri-apps/plugin-dialog";
import { useContext } from "react";
import { FileContext } from "../../contexts/File/FileContext";
import { FileNode, OpenedFile } from "../../contexts/File/FileReducer";
import { createFileId, getFileLanguage, getFileName, getLastModified } from "../../utils/fileUtils";

const Toolbar = () => {
  const { state, dispatch } = useContext(FileContext)!;
  const handleOpenFile = async () => {
    const file = await open({
      multiple: false,
      directory: false,
    })
    const fileNode: OpenedFile = {
      id: await createFileId(file!),
      name: await getFileName(file!),
      path: file!,
      language: getFileLanguage(file!),
      value: "",
      isDirty: false,
      lastModified: await getLastModified(file!),
    }
    dispatch({ type: "OPEN_FILE", payload: { file: fileNode }});

    console.log("Current opened files:", state.openedFiles);
  }

  const handleOpenFolder = async () => {
    const folder = await open({
      multiple: false,
      directory: true,
    })
    const folderNode: FileNode = {
      id: await createFileId(folder!),
      name: await getFileName(folder!),
      path: folder!,
      type: "folder",
      isRoot: true,
    }
    dispatch({ type: "OPEN_FOLDER", payload: { id: folderNode.id } });

    console.log("Current opened folder:", folderNode);
  }

  return (
    <div className='flex gap-2'>
      <button onClick={handleOpenFile} className="bg-white text-black">Open File</button>
      <button onClick={handleOpenFolder} className="bg-white text-black">Open Folder</button>
    </div>
  );
};

export default Toolbar;