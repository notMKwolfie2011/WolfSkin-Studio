import React, { useState } from "react";
import { wolfskinTheme } from "../assets/wolfskin-theme";

interface Color {
  name: string;
  hex: string;
}
interface Props {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  palette: Color[];
}

const ColorPicker: React.FC<Props> = ({ selectedColor, setSelectedColor, palette }) => {
  const [customColor, setCustomColor] = useState<string>(selectedColor);

  return (
    <div style={{ marginTop: 18 }}>
      <h3 style={{ color: wolfskinTheme.colors.accent, marginBottom: 7 }}>Colors</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {palette.map(col => (
          <button
            key={col.hex}
            title={col.name}
            onClick={() => setSelectedColor(col.hex)}
            style={{
              width: 30,
              height: 30,
              background: col.hex,
              border: selectedColor === col.hex ? `2px solid ${wolfskinTheme.colors.primary}` : "none",
              borderRadius: "50%",
              cursor: "pointer"
            }}
          />
        ))}
        <input
          type="color"
          value={customColor}
          onChange={e => {
            setCustomColor(e.target.value);
            setSelectedColor(e.target.value);
          }}
          style={{
            width: 32,
            height: 32,
            marginLeft: 8,
            border: "none",
            borderRadius: "50%",
            overflow: "hidden",
            cursor: "pointer"
          }}
          title="Custom Color"
        />
      </div>
    </div>
  );
};

export default ColorPicker;