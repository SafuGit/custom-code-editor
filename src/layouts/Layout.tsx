import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import EditorComp from "../components/Editor/EditorComp";

const Layout = () => {
  const layout = [
    { i: "toolbar", x: 0, y: 0, w: 12, h: 1, static: true },   // toolbar
    { i: "fileExplorer", x: 0, y: 1, w: 3, h: 10 },             // sidebar
    { i: "editor", x: 3, y: 1, w: 9, h: 10 },                   // main editor
    { i: "console", x: 0, y: 11, w: 12, h: 3 },                  // bottom console
    { i: "commandPalette", x: 4, y: 12, w: 12, h: 2 }              // command palette
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      draggableHandle=".draggable"
    >
      <div key="toolbar" className="bg-gray-800 text-white draggable">
        <h1>Toolbar</h1>
      </div>
      <div key="fileExplorer" className="bg-gray-200 p-2">
        File Explorer
      </div>
      <div key="editor" className="bg-white p-2">
        <EditorComp />
      </div>
      <div key="console" className="bg-gray-200 p-2">
        Console
      </div>
      <div key="commandPalette" className="bg-gray-200 p-2">
        Command Palette
      </div>
    </GridLayout>
  );
};

export default Layout;
