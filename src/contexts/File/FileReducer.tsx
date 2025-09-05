type FileNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  path: string;
  isRoot: boolean;
}

type OpenedFile = {
  id: string;
  name: string;
  path: string;
  language: string;
  value: string;
  isDirty: boolean;
  lastModified: Date;
}

type FileState = {
  tree: FileNode[];
  openedFiles: OpenedFile[];
  activeFileId: string | null;
  expandedFolders: string[];
  selectedFileId: string | null;
}

type FileAction =
  | { type: "CREATE_FILE"; payload: { parentId: string; file: FileNode } }
  | { type: "CREATE_FOLDER"; payload: { parentId: string; folder: FileNode } }
  | { type: "DELETE_NODE"; payload: { id: string } }
  | { type: "RENAME_NODE"; payload: { id: string; newName: string } }
  | { type: "OPEN_FILE"; payload: { file: OpenedFile } }
  | { type: "CLOSE_FILE"; payload: { id: string } }
  | { type: "SET_ACTIVE_FILE"; payload: { id: string | null } }
  | { type: "UPDATE_FILE_CONTENT"; payload: { id: string; value: string } }
  | { type: "TOGGLE_FOLDER"; payload: { id: string } }
  | { type: "SELECT_NODE"; payload: { id: string | null } };

function fileReducer(state: FileState, action: FileAction): FileState {
  switch (action.type) {
    default:
      return state;
    case "OPEN_FILE": {
      const { file } = action.payload;

      const alreadyOpened = state.openedFiles.some(f => f.id === file.id);

      return {
        ...state,
        openedFiles: alreadyOpened ? state.openedFiles : [...state.openedFiles, file],
        activeFileId: file.id,
        selectedFileId: file.id,
      };
    }
    case "CLOSE_FILE": {
      const { id } = action.payload;

      const openedFile = state.openedFiles.find(f => f.id === id);
      const activeFile = state.openedFiles.find(f => f.id === state.activeFileId);
      const newOpenedFiles = state.openedFiles.filter(f => f.id !== id);

      if (!openedFile) return state;
      if (activeFile) {
        return {
          ...state,
          openedFiles: newOpenedFiles,
          activeFileId: activeFile.id === id ? (newOpenedFiles[newOpenedFiles.length - 1]?.id || null) : state.activeFileId,
        }
      }

      return {
        ...state,
        openedFiles: newOpenedFiles,
      }
    }
  }
}

