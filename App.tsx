import React from "react";
import SkinEditor from "./components/SkinEditor";
import { wolfskinTheme } from "./assets/wolfskin-theme";

const App: React.FC = () => (
  <div style={{
    background: wolfskinTheme.colors.background,
    color: wolfskinTheme.colors.text,
    fontFamily: wolfskinTheme.font,
    minHeight: "100vh"
  }}>
    <header style={{ display: "flex", alignItems: "center", padding: 24, background: wolfskinTheme.colors.panel }}>
      <img src="/pawprint.svg" alt="Wolfskin Logo" width={40} height={40} style={{ marginRight: 14 }} />
      <h1 style={{ fontWeight: 800, fontSize: 28, letterSpacing: 2 }}>Wolfskin</h1>
      <span style={{
        marginLeft: 18,
        fontSize: 16,
        color: wolfskinTheme.colors.accent,
        fontStyle: "italic"
      }}>Advanced Minecraft Skin Editor</span>
    </header>
    <SkinEditor />
  </div>
);

export default App;