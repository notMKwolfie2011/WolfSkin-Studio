import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, query, where } from "firebase/firestore";
import { MinecraftSkin } from "./MinecraftSkin";

export async function saveSkin(skin: MinecraftSkin) {
  await setDoc(doc(db, "skins", skin.id), skin);
}

export async function loadSkins(userId: string): Promise<MinecraftSkin[]> {
  const q = query(collection(db, "skins"), where("authorId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as MinecraftSkin);
}

export async function deleteSkin(skinId: string) {
  await deleteDoc(doc(db, "skins", skinId));
}