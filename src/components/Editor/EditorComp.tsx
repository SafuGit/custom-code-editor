import { Editor } from '@monaco-editor/react';
import clsx from 'clsx';
import { useState } from 'react';

const EditorComp = () => {
  const [language, setLanguage] = useState("typescript");
  const [theme, setTheme] = useState("vs-dark");

  const languages = ["javascript", "typescript", "python", "html", "css", "java", "c", "cpp", "json", "markdown"];
  const themes = ["vs", "vs-dark", "hc-black"];

  return (
    <div className='h-full'>
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
        defaultLanguage={language}
        defaultValue="// type your code here"
        height={"90%"}
        theme={theme}
      />
    </div>
  );
};

export default EditorComp;