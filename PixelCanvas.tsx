import React from "react";
import { wolfskinTheme } from "../assets/wolfskin-theme";

interface Props {
  canvasData: string[][];
  onPixelChange: (x: number, y: number, color: string) => void;
  selectedColor: string;
  selectedTool: "brush" | "eraser" | "fill" | "eyedropper";
  visibleParts: Record<string, boolean>;
}

const gridSize = 64;

const PixelCanvas: React.FC<Props> = ({
  canvasData,
  onPixelChange,
  selectedColor,
  selectedTool,
  visibleParts
}) => {
  // Basic fill and eyedropper tool implementation
  const handleClick = (x: number, y: number) => {
    if (selectedTool === "brush") onPixelChange(x, y, selectedColor);
    else if (selectedTool === "eraser") onPixelChange(x, y, "#F9FFFE");
    else if (selectedTool === "fill") {
      const targetColor = canvasData[y][x];
      if (targetColor === selectedColor) return;
      // Simple flood fill
      const filled = canvasData.map(row => [...row]);
      const stack = [[x, y]];
      while (stack.length > 0) {
        const [cx, cy] = stack.pop()!;
        if (cx < 0 || cy < 0 || cx >= gridSize || cy >= gridSize) continue;
        if (filled[cy][cx] !== targetColor) continue;
        filled[cy][cx] = selectedColor;
        stack.push([cx-1, cy], [cx+1, cy], [cx, cy-1], [cx, cy+1]);
      }
      onPixelChange(-1, -1, ""); // Hack to trigger update
      // Replace canvasData
      for(let y=0;y<gridSize;y++) for(let x=0;x<gridSize;x++) canvasData[y][x]=filled[y][x];
    }
    // Eyedropper handled in parent (or by double click as enhancement)
  };

  return (
    <div style={{
      marginTop: 16,
      padding: 8,
      background: wolfskinTheme.colors.panel,
      borderRadius: wolfskinTheme.borderRadius,
      boxShadow: wolfskinTheme.boxShadow
    }}>
      <h3 style={{ color: wolfskinTheme.colors.accent, marginBottom: 8 }}>2D Editor</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 10px)`,
          gridTemplateRows: `repeat(${gridSize}, 10px)`,
          gap: 1,
          justifyContent: "center"
        }}
      >
        {canvasData.map((row, y) =>
          row.map((color, x) => (
            <div
              key={`${x}-${y}`}
              onClick={() => handleClick(x, y)}
              style={{
                width: 10,
                height: 10,
                background: color,
                border: "1px solid #232332",
                cursor: "crosshair"
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PixelCanvas;