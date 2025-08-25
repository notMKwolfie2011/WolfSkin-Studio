import React from "react";
import { wolfskinTheme } from "../assets/wolfskin-theme";

interface Props {
  selectedTool: "brush" | "eraser" | "fill" | "eyedropper";
  setSelectedTool: (tool: Props["selectedTool"]) => void;
  undo: () => void;
  redo: () => void;
}

const tools = [
  { name: "Brush", value: "brush", icon: "🖌️" },
  { name: "Eraser", value: "eraser", icon: "🧽" },
  { name: "Fill", value: "fill", icon: "🪣" },
  { name: "Eyedropper", value: "eyedropper", icon: "🎯" },
];

const ToolPalette: React.FC<Props> = ({ selectedTool, setSelectedTool, undo, redo }) => (
  <div>
    <h3 style={{ color: wolfskinTheme.colors.accent, marginBottom: 8 }}>Tools</h3>
    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
      {tools.map(tool => (
        <button
          key={tool.value}
          onClick={() => setSelectedTool(tool.value as Props["selectedTool"])}
          style={{
            background: selectedTool === tool.value ? wolfskinTheme.colors.primary : wolfskinTheme.colors.panel,
            color: wolfskinTheme.colors.text,
            border: "none",
            borderRadius: wolfskinTheme.borderRadius,
            padding: "10px 16px",
            fontSize: 18,
            cursor: "pointer",
            transition: "0.1s"
          }}
        >
          {tool.icon} {tool.name}
        </button>
      ))}
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={undo} style={{
        background: wolfskinTheme.colors.highlight,
        color: wolfskinTheme.colors.text,
        border: "none",
        borderRadius: wolfskinTheme.borderRadius,
        padding: "8px 14px",
        fontWeight: 700,
        cursor: "pointer"
      }}>Undo</button>
      <button onClick={redo} style={{
        background: wolfskinTheme.colors.highlight,
        color: wolfskinTheme.colors.text,
        border: "none",
        borderRadius: wolfskinTheme.borderRadius,
        padding: "8px 14px",
        fontWeight: 700,
        cursor: "pointer"
      }}>Redo</button>
    </div>
  </div>
);

export default ToolPalette;