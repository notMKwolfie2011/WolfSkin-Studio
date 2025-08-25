import React, { useState, useRef } from "react";
import { wolfskinTheme } from "../assets/wolfskin-theme";

interface Props {
  canvasData: string[][];
  setCanvasData?: (data: string[][]) => void;
  skinName: string;
  setSkinName: (v: string) => void;
  isPublic: boolean;
  setIsPublic: (v: boolean) => void;
  handleSaveToDB: () => void;
}

const gridSize = 64;

function canvasDataToPNG(canvasData: string[][]): string {
  const canvas = document.createElement("canvas");
  canvas.width = gridSize;
  canvas.height = gridSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      ctx.fillStyle = canvasData[y][x];
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas.toDataURL("image/png");
}

function pngToCanvasData(img: HTMLImageElement): string[][] {
  const canvas = document.createElement("canvas");
  canvas.width = gridSize;
  canvas.height = gridSize;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, gridSize, gridSize);
  const data: string[][] = [];
  const imgData = ctx.getImageData(0, 0, gridSize, gridSize).data;
  for (let y = 0; y < gridSize; y++) {
    const row: string[] = [];
    for (let x = 0; x < gridSize; x++) {
      const idx = (y * gridSize + x) * 4;
      row.push(
        `rgba(${imgData[idx]},${imgData[idx + 1]},${imgData[idx + 2]},${imgData[idx + 3] / 255})`
      );
    }
    data.push(row);
  }
  return data;
}

const SavePanel: React.FC<Props> = ({
  canvasData, setCanvasData, skinName, setSkinName, isPublic, setIsPublic, handleSaveToDB
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const url = canvasDataToPNG(canvasData);
    const link = document.createElement("a");
    link.download = `${skinName || "minecraft_skin"}.png`;
    link.href = url;
    link.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !setCanvasData) return;
    const file = e.target.files[0];
    const img = new window.Image();
    img.onload = () => {
      setCanvasData(pngToCanvasData(img));
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div style={{
      marginTop: 16,
      background: wolfskinTheme.colors.panel,
      borderRadius: wolfskinTheme.borderRadius,
      padding: 12,
      boxShadow: wolfskinTheme.boxShadow
    }}>
      <h4 style={{ color: wolfskinTheme.colors.accent }}>Save / Export / Import</h4>
      <input
        type="text"
        placeholder="Skin name"
        value={skinName}
        onChange={e => setSkinName(e.target.value)}
        style={{
          width: "80%",
          padding: 8,
          marginBottom: 8,
          borderRadius: wolfskinTheme.borderRadius,
          border: "none"
        }}
      />
      <label style={{ display: "block", marginBottom: 8 }}>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={e => setIsPublic(e.target.checked)}
        /> Public
      </label>
      <button
        onClick={handleExport}
        style={{
          background: wolfskinTheme.colors.primary,
          color: wolfskinTheme.colors.text,
          border: "none",
          borderRadius: wolfskinTheme.borderRadius,
          padding: "10px 18px",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 16,
          marginRight: 8
        }}
      >
        Export as PNG
      </button>
      <input
        type="file"
        accept="image/png"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={handleImport}
      />
      <button
        onClick={() => fileRef.current?.click()}
        style={{
          background: wolfskinTheme.colors.highlight,
          color: wolfskinTheme.colors.text,
          border: "none",
          borderRadius: wolfskinTheme.borderRadius,
          padding: "10px 18px",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 16,
          marginRight: 8
        }}
      >Import PNG</button>
      <button
        onClick={handleSaveToDB}
        style={{
          background: wolfskinTheme.colors.primary,
          color: wolfskinTheme.colors.text,
          border: "none",
          borderRadius: wolfskinTheme.borderRadius,
          padding: "10px 18px",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 16,
        }}
      >Save to Cloud</button>
    </div>
  );
};

export default SavePanel;