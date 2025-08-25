import React from "react";
import { wolfskinTheme } from "../assets/wolfskin-theme";

interface Props {
  visibleParts: Record<string, boolean>;
  setVisibleParts: (parts: Record<string, boolean>) => void;
}

const partNames = [
  { key: "head", label: "Head" },
  { key: "body", label: "Body" },
  { key: "leftArm", label: "Left Arm" },
  { key: "rightArm", label: "Right Arm" },
  { key: "leftLeg", label: "Left Leg" },
  { key: "rightLeg", label: "Right Leg" }
];

const PartVisibility: React.FC<Props> = ({ visibleParts, setVisibleParts }) => {
  return (
    <div style={{ marginTop: 16 }}>
      <h4 style={{ color: wolfskinTheme.colors.accent }}>Body Part Visibility</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {partNames.map(part => (
          <label key={part.key} style={{ fontWeight: 500, fontSize: 14 }}>
            <input
              type="checkbox"
              checked={visibleParts[part.key]}
              onChange={e => {
                setVisibleParts({
                  ...visibleParts,
                  [part.key]: e.target.checked
                });
              }}
              style={{ marginRight: 4 }}
            />
            {part.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PartVisibility;