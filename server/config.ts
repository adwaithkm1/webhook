// Server configuration settings
export const config = {
  // Discord webhook URL from environment variables
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL || "",
  // Maximum file size in bytes (default: 8MB)
  maxFileSize: 8 * 1024 * 1024,
  // API key for authentication (optional, leave empty for no authentication)
  apiKey: "",
};