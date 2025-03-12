import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Upload schema
export const uploads = pgTable("uploads", {
  id: serial("id").primaryKey(),
  fileUrl: text("file_url").notNull(),
  filename: text("filename").notNull(),
  webhookUrl: text("webhook_url").notNull(),
  status: text("status").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertUploadSchema = createInsertSchema(uploads).pick({
  fileUrl: true,
  filename: true,
  webhookUrl: true,
  status: true,
});

export type InsertUpload = z.infer<typeof insertUploadSchema>;
export type Upload = typeof uploads.$inferSelect;

// Zod schemas for request validation
export const uploadRequestSchema = z.object({
  fileUrl: z.string().url("Please provide a valid URL"),
  webhookUrl: z.string().url("Please provide a valid webhook URL")
    .startsWith("https://discord.com/api/webhooks/", 
      "Please provide a valid Discord webhook URL")
});

// Type for front-end upload history
export interface UploadHistoryItem {
  id: number;
  fileUrl: string;
  filename: string;
  timestamp: string;
  status: "success" | "failed";
}
