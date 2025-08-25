import React from "react";
import { wolfskinTheme } from "../assets/wolfskin-theme";

interface LayoutProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ leftPanel, centerPanel, rightPanel }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    height: 'calc(100vh - 80px)',
    background: wolfskinTheme.colors.background
  }}>
    <aside style={{
      width: 220,
      background: wolfskinTheme.colors.panel,
      padding: 16,
      boxShadow: wolfskinTheme.boxShadow
    }}>
      {leftPanel}
    </aside>
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12
    }}>
      {centerPanel}
    </main>
    <aside style={{
      width: 320,
      background: wolfskinTheme.colors.panel,
      padding: 16,
      boxShadow: wolfskinTheme.boxShadow
    }}>
      {rightPanel}
    </aside>
  </div>
);

export default Layout;