import { open } from "@tauri-apps/plugin-dialog";
import { useContext } from "react";
import { FileContext } from "../../contexts/File/FileContext";
import { FileNode, OpenedFile } from "../../contexts/File/FileReducer";
import { createFileId, getFileLanguage, getFileName, getLastModified } from "../../utils/fileUtils";

const Toolbar = () => {
  const { dispatch } = useContext(FileContext)!;
  const handleOpenFile = async () => {
    const file = await open({
      multiple: false,
      directory: false,
    })
    const fileNode: OpenedFile = {
      id: await createFileId(file!),
      name: await getFileName(file!),
      path: file!,
      language: await getFileLanguage(file!),
      value: "",
      isDirty: false,
      lastModified: await getLastModified(file!),
    }
    dispatch({ type: "OPEN_FILE", payload: { file: fileNode }});
  }
  return (
    <div className='flex gap-2'>
      <button onClick={handleOpenFile} className="bg-white text-black">Open File</button>
    </div>
  );
};

export default Toolbar;