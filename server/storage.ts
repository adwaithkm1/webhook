import { uploads, type Upload, type InsertUpload } from "@shared/schema";

export interface IStorage {
  createUpload(upload: InsertUpload): Promise<Upload>;
  getRecentUploads(limit: number): Promise<Upload[]>;
}

export class MemStorage implements IStorage {
  private uploads: Map<number, Upload>;
  private currentId: number;

  constructor() {
    this.uploads = new Map();
    this.currentId = 1;
  }

  async createUpload(insertUpload: InsertUpload): Promise<Upload> {
    const id = this.currentId++;
    const timestamp = new Date();
    const upload: Upload = { ...insertUpload, id, timestamp };
    this.uploads.set(id, upload);
    return upload;
  }

  async getRecentUploads(limit: number): Promise<Upload[]> {
    const allUploads = Array.from(this.uploads.values());
    // Sort by timestamp descending (newest first)
    return allUploads
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
