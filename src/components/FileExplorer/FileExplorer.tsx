import { useContext, useEffect } from "react";
import { FileContext } from "../../contexts/File/FileContext";
// import { FileDTO } from "../../contexts/File/FileReducer";
import { invoke } from "@tauri-apps/api/core";
import { FileNode } from "../../contexts/File/FileReducer";
import { createFileId, getFileName } from "../../utils/fileUtils";

const FileExplorer = () => {
  const { state, dispatch } = useContext(FileContext)!
  useEffect(() => {
    console.log("in use effect");
    if (state.openedFolderId) {
      const folderPath = state.openedFolderId.split(">")[0];

      console.log(folderPath)
      invoke<FileNode>('scan_folder', { path: folderPath }).then(async (root) => {
        const nodes: FileNode[] = await Promise.all(
          root!.children!.map(async (file) => {
            return {
              id: await createFileId(file.path),
              name: await getFileName(file.path),
              type: file.type,
              path: file.path,
              isRoot: file.path === folderPath,
            } as FileNode;
          })
        );

        console.log(root);

        const tree: FileNode = {
          id: await createFileId(root.path),
          name: await getFileName(root.path),
          type: "folder",
          path: root.path,
          children: nodes,
          isRoot: true,
        }

        dispatch({
          type: "SET_TREE",
          payload: {
            tree: tree,
          },
        })
        console.log(state.tree);
      });
    }
  }, [state.openedFolderId])
  return (
    <div>
      
    </div>
  );
};

export default FileExplorer;