import { useContext, useEffect } from "react";
import { FileContext } from "../../contexts/File/FileContext";
// import { FileDTO } from "../../contexts/File/FileReducer";
import { invoke } from "@tauri-apps/api/core";

const FileExplorer = () => {
  const { state, dispatch } = useContext(FileContext)!
  useEffect(() => {
    console.log("in use effect");
    if (state.openedFolderId) {
      const folderPath = state.openedFolderId.split(">")[0];
      // const folderNode: FileDTO = {
      //   path: folderPath,
      //   type: "folder",
      //   children: []
      // }
      console.log(folderPath)
      const data = invoke('scan_folder', { path: folderPath }).then((data) => {
        console.log(data);
      })
      // console.log(data);
    }
  }, [state.openedFolderId])
  return (
    <div>
      
    </div>
  );
};

export default FileExplorer;