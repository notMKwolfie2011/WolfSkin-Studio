export interface MinecraftSkin {
  id: string;
  name: string;
  authorId: string;
  dataUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  tags?: string[];
  description?: string;
}