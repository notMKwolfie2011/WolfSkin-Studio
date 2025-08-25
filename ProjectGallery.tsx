import React, { useEffect, useState } from "react";
import { loadSkins, deleteSkin } from "../db/skins";
import { auth } from "../db/firebase";
import { MinecraftSkin } from "../db/MinecraftSkin";
import { wolfskinTheme } from "../assets/wolfskin-theme";

const ProjectGallery: React.FC<{ setCanvasData: (d: string[][]) => void }> = ({ setCanvasData }) => {
  const [skins, setSkins] = useState<MinecraftSkin[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user)
      loadSkins(user.uid).then(setSkins);
  }, [user]);

  const handleLoad = (skin: MinecraftSkin) => {
    setCanvasData(JSON.parse(skin.dataUrl));
  };

  const handleDelete = async (id: string) => {
    await deleteSkin(id);
    if (user) {
      loadSkins(user.uid).then(setSkins);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ color: wolfskinTheme.colors.accent }}>Your Skins</h3>
      <ul>
        {skins.map(skin => (
          <li key={skin.id} style={{ marginBottom: 6 }}>
            <span style={{ marginRight: 8 }}>{skin.name}</span>
            <button onClick={() => handleLoad(skin)} style={{ marginRight: 4 }}>Load</button>
            <button onClick={() => handleDelete(skin.id)} style={{ color: "red" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectGallery;