import React, { useState } from "react";
import Layout from "./Layout";
import PixelCanvas from "./PixelCanvas";
import SkinPreview3D from "./SkinPreview3D";
import ToolPalette from "./ToolPalette";
import ColorPicker from "./ColorPicker";
import PartVisibility from "./PartVisibility";
import SavePanel from "./SavePanel";
import AuthPanel from "./AuthPanel";
import ProjectGallery from "./ProjectGallery";
import { minecraftColors } from "../assets/colors";
import { wolfskinTheme } from "../assets/wolfskin-theme";
import { auth } from "../db/firebase";
import { v4 as uuidv4 } from "uuid";
import { saveSkin } from "../db/skins";

const gridSize = 64;

const SkinEditor: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<"brush" | "eraser" | "fill" | "eyedropper">("brush");
  const [selectedColor, setSelectedColor] = useState<string>(minecraftColors[0].hex);
  const [visibleParts, setVisibleParts] = useState<Record<string, boolean>>({
    head: true, body: true, leftArm: true, rightArm: true, leftLeg: true, rightLeg: true
  });
  const [canvasData, setCanvasData] = useState<string[][]>(() =>
    Array(gridSize).fill(null).map(() => Array(gridSize).fill("#F9FFFE"))
  );
  const [history, setHistory] = useState<string[][][]>([canvasData]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [skinName, setSkinName] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  // Undo/Redo
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasData(history[historyIndex - 1]);
    }
  };
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasData(history[historyIndex + 1]);
    }
  };

  // Canvas edit handler
  const handlePixelChange = (x: number, y: number, color: string) => {
    const newCanvas = canvasData.map((row, rowIdx) =>
      row.map((col, colIdx) =>
        rowIdx === y && colIdx === x ? color : col
      )
    );
    const newHistory = [...history.slice(0, historyIndex + 1), newCanvas];
    setCanvasData(newCanvas);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Save to Firebase
  const handleSaveToDB = async () => {
    if (!auth.currentUser) {
      alert("Please log in to save skins.");
      return;
    }
    const skin = {
      id: uuidv4(),
      name: skinName || "Untitled",
      authorId: auth.currentUser.uid,
      dataUrl: JSON.stringify(canvasData),
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic,
      tags: [],
      description: ""
    };
    await saveSkin(skin);
    alert("Skin saved!");
  };

  return (
    <Layout
      leftPanel={
        <>
          <AuthPanel />
          <ToolPalette
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            undo={undo}
            redo={redo}
          />
          <ColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            palette={minecraftColors}
          />
        </>
      }
      centerPanel={
        <SkinPreview3D
          canvasData={canvasData}
          visibleParts={visibleParts}
        />
      }
      rightPanel={
        <>
          <PixelCanvas
            canvasData={canvasData}
            onPixelChange={handlePixelChange}
            selectedColor={selectedColor}
            selectedTool={selectedTool}
            visibleParts={visibleParts}
          />
          <PartVisibility
            visibleParts={visibleParts}
            setVisibleParts={setVisibleParts}
          />
          <SavePanel
            canvasData={canvasData}
            setCanvasData={setCanvasData}
            skinName={skinName}
            setSkinName={setSkinName}
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            handleSaveToDB={handleSaveToDB}
          />
          <ProjectGallery setCanvasData={setCanvasData} />
        </>
      }
    />
  );
};

export default SkinEditor;