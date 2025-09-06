import { Editor } from '@monaco-editor/react';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { FileContext } from '../../contexts/File/FileContext';
import { readTextFile } from '@tauri-apps/plugin-fs';
import { getAllLanguages } from '../../utils/fileUtils';

const EditorComp = () => {
  const [language, setLanguage] = useState("typescript");
  const [theme, setTheme] = useState("vs-dark");
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [activeFileContent, setActiveFileContent] = useState<string>("");
  const { state } = useContext(FileContext)!;

  const languages = getAllLanguages();
  const themes = ["vs", "vs-dark", "hc-black"];

  useEffect(() => {
    if (state.openedFiles.length > 0) {
      const activeFileFound = state.openedFiles.find(f => f.id === state.activeFileId);
      if (activeFileFound) {
        setActiveFile(activeFileFound.id);
        readTextFile(activeFileFound.path).then(content => {
          setActiveFileContent(content);
          setLanguage(activeFileFound.language);
        }).catch(err => {
          console.error("Error reading file:", err);
          setActiveFileContent("// Error loading file content");
        });
      }
    }
  }, [state.openedFiles, state.activeFileId]);

  return (
    <div className='h-[95%]'>
      <div className={clsx("flex gap-4 p-2 bg-gray-800 text-white")}>
        <div>
          <label>Language:</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="ml-2 p-1 rounded bg-gray-700 text-white"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Theme:</label>
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="ml-2 p-1 rounded bg-gray-700 text-white"
          >
            {themes.map(th => (
              <option key={th} value={th}>{th}</option>
            ))}
          </select>
        </div>
      </div>
      <Editor
        language={language}
        value={activeFileContent || "// Open a file to start editing..."}
        height={"90%"}
        theme={theme}
      />
    </div>
  );
};

export default EditorComp;