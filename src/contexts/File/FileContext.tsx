import { createContext, Dispatch, useReducer } from "react";
import { fileReducer, FileAction, FileState } from "./FileReducer";

type FileContextType = {
  state: FileState;
  dispatch: Dispatch<FileAction>;
}

export const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: React.ReactNode }) {
  const initialState: FileState = {
    tree: [],
    openedFiles: [],
    activeFileId: null,
    expandedFolders: [],
    selectedFileId: null,
  }

  const [state, dispatch] = useReducer(fileReducer, initialState);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  )
}