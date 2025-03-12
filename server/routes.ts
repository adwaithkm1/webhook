import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { uploadRequestSchema, apiUploadRequestSchema } from "@shared/schema";
import fetch from "node-fetch";
import { createReadStream } from "fs";
import { createWriteStream } from "fs";
import { unlink } from "fs/promises";
import { pipeline } from "stream/promises";
import path from "path";
import os from "os";
import { log } from "./vite";
import { config } from "./config";

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload file from URL to Discord webhook
  app.post("/api/upload", async (req, res) => {
    try {
      // Validate request
      const validationResult = uploadRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: validationResult.error.errors[0]?.message || "Invalid request data"
        });
      }
      
      const { fileUrl, webhookUrl } = validationResult.data;
      
      // Extract filename from URL
      let filename;
      try {
        const url = new URL(fileUrl);
        filename = path.basename(url.pathname) || "file";
      } catch (e) {
        filename = path.basename(fileUrl) || "file";
      }
      
      // Create temp file path
      const tempFilePath = path.join(os.tmpdir(), `discord-upload-${Date.now()}-${filename}`);
      
      try {
        // Fetch the file
        log(`Fetching file from ${fileUrl}`);
        const fileResponse = await fetch(fileUrl);
        
        if (!fileResponse.ok) {
          return res.status(400).json({ 
            success: false, 
            message: `Failed to fetch file: ${fileResponse.statusText}` 
          });
        }
        
        // Stream the file to disk
        await pipeline(
          fileResponse.body as any,
          createWriteStream(tempFilePath)
        );
        
        log(`File downloaded to ${tempFilePath}`);
        
        // Send the file to Discord webhook
        const formData = new FormData();
        
        // Add the file as an attachment
        formData.append("file", createReadStream(tempFilePath) as any);
        
        // Add a message
        formData.append("content", `Uploaded file: ${filename}`);
        
        // Send to Discord
        log(`Sending file to Discord webhook`);
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          body: formData as any,
        });
        
        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text();
          return res.status(500).json({
            success: false,
            message: `Discord webhook error: ${errorText || webhookResponse.statusText}`
          });
        }
        
        // Log the upload in storage
        await storage.createUpload({
          fileUrl,
          filename,
          webhookUrl,
          status: "success"
        });
        
        return res.json({
          success: true,
          message: "File uploaded successfully"
        });
      } catch (error) {
        log(`Error during upload: ${error instanceof Error ? error.message : String(error)}`);
        
        // Log the failed upload
        await storage.createUpload({
          fileUrl,
          filename,
          webhookUrl,
          status: "failed"
        });
        
        return res.status(500).json({
          success: false,
          message: error instanceof Error ? error.message : "File upload failed"
        });
      } finally {
        // Clean up temp file
        try {
          await unlink(tempFilePath);
        } catch (err) {
          // Ignore errors if file doesn't exist
        }
      }
    } catch (error) {
      log(`Unhandled error: ${error instanceof Error ? error.message : String(error)}`);
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });

  // Get recent uploads
  app.get("/api/uploads/recent", async (req, res) => {
    try {
      const limit = Number(req.query.limit) || 10;
      const uploads = await storage.getRecentUploads(limit);
      return res.json(uploads);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching uploads"
      });
    }
  });
  
  // API endpoint for programmatic uploads with pre-configured webhook URL
  app.post("/api/webhook/upload", async (req, res) => {
    try {
      // Optional API key validation
      if (config.apiKey) {
        const providedApiKey = req.headers['x-api-key'];
        if (providedApiKey !== config.apiKey) {
          return res.status(401).json({
            success: false,
            message: "Invalid or missing API key"
          });
        }
      }
      
      // Validate request
      const validationResult = apiUploadRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: validationResult.error.errors[0]?.message || "Invalid request data"
        });
      }
      
      const { fileUrl } = validationResult.data;
      // Use the pre-configured webhook URL
      const webhookUrl = config.discordWebhookUrl;
      
      if (!webhookUrl || !webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
        return res.status(500).json({
          success: false,
          message: "Discord webhook URL is not configured correctly on the server"
        });
      }
      
      // Extract filename from URL
      let filename;
      try {
        const url = new URL(fileUrl);
        filename = path.basename(url.pathname) || "file";
      } catch (e) {
        filename = path.basename(fileUrl) || "file";
      }
      
      // Create temp file path
      const tempFilePath = path.join(os.tmpdir(), `discord-upload-${Date.now()}-${filename}`);
      
      try {
        // Fetch the file
        log(`Fetching file from ${fileUrl}`);
        const fileResponse = await fetch(fileUrl);
        
        if (!fileResponse.ok) {
          return res.status(400).json({ 
            success: false, 
            message: `Failed to fetch file: ${fileResponse.statusText}` 
          });
        }
        
        // Stream the file to disk
        await pipeline(
          fileResponse.body as any,
          createWriteStream(tempFilePath)
        );
        
        log(`File downloaded to ${tempFilePath}`);
        
        // Send the file to Discord webhook
        const formData = new FormData();
        
        // Add the file as an attachment
        formData.append("file", createReadStream(tempFilePath) as any);
        
        // Add a message
        formData.append("content", `Uploaded file: ${filename} (via API)`);
        
        // Send to Discord
        log(`Sending file to Discord webhook`);
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          body: formData as any,
        });
        
        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text();
          return res.status(500).json({
            success: false,
            message: `Discord webhook error: ${errorText || webhookResponse.statusText}`
          });
        }
        
        // Log the upload in storage
        await storage.createUpload({
          fileUrl,
          filename,
          webhookUrl,
          status: "success"
        });
        
        return res.json({
          success: true,
          message: "File uploaded successfully to Discord"
        });
      } catch (error) {
        log(`Error during upload: ${error instanceof Error ? error.message : String(error)}`);
        
        // Log the failed upload
        await storage.createUpload({
          fileUrl,
          filename,
          webhookUrl,
          status: "failed"
        });
        
        return res.status(500).json({
          success: false,
          message: error instanceof Error ? error.message : "File upload failed"
        });
      } finally {
        // Clean up temp file
        try {
          await unlink(tempFilePath);
        } catch (err) {
          // Ignore errors if file doesn't exist
        }
      }
    } catch (error) {
      log(`Unhandled error: ${error instanceof Error ? error.message : String(error)}`);
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
