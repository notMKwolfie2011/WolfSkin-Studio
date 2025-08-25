import React, { useState, useEffect } from "react";
import { auth } from "../db/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { wolfskinTheme } from "../assets/wolfskin-theme";

const AuthPanel: React.FC = () => {
  const [email, setEmail] = useState(""); 
  const [pw, setPw] = useState("");
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return () => unsub();
  }, []);

  const login = () => signInWithEmailAndPassword(auth, email, pw);
  const signup = () => createUserWithEmailAndPassword(auth, email, pw);
  const logout = () => signOut(auth);

  return (
    <div style={{ marginBottom: 16 }}>
      {user ?
        <div>
          <span style={{ marginRight: 8 }}>Logged in as {user.email}</span>
          <button
            onClick={logout}
            style={{
              background: wolfskinTheme.colors.primary,
              color: wolfskinTheme.colors.text,
              border: "none",
              borderRadius: wolfskinTheme.borderRadius,
              padding: "5px 10px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >Logout</button>
        </div>
        :
        <div>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ marginRight: 4 }} />
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" style={{ marginRight: 4 }} />
          <button onClick={login} style={{ marginRight: 4 }}>Login</button>
          <button onClick={signup}>Sign Up</button>
        </div>
      }
    </div>
  );
};

export default AuthPanel;