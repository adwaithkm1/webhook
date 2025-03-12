import WebhookConfigForm from "./WebhookConfigForm";
import FileUploadForm from "./FileUploadForm";
import UploadProgress from "./UploadProgress";
import UploadStatus from "./UploadStatus";
import UploadHistory from "./UploadHistory";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { apiRequest } from "@/lib/queryClient";
import { UploadHistoryItem } from "@shared/schema";

export default function WebhookUploader() {
  const [webhookUrl, setWebhookUrl] = useLocalStorage<string>("discord_webhook_url", "");
  const [fileUrl, setFileUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadHistory, setUploadHistory] = useLocalStorage<UploadHistoryItem[]>("upload_history", []);
  
  const { toast } = useToast();

  const handleSaveWebhook = (url: string) => {
    setWebhookUrl(url);
  };

  const handleUpload = async () => {
    if (!webhookUrl) {
      toast({
        title: "Webhook URL required",
        description: "Please set your Discord webhook URL first",
        variant: "destructive"
      });
      return;
    }

    if (!fileUrl) {
      toast({
        title: "File URL required",
        description: "Please enter a file URL to upload",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage("");

    try {
      const response = await apiRequest("POST", "/api/upload", {
        webhookUrl,
        fileUrl
      });

      // Use progress events from server-sent events if available
      // For now, simulate progress
      const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          setUploadProgress(Math.floor(progress));
        }, 300);

        return interval;
      };

      const progressInterval = simulateProgress();

      const result = await response.json();

      // Clear progress interval when done
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Add to history
      const filename = getFilenameFromUrl(fileUrl);
      const newHistoryItem: UploadHistoryItem = {
        id: Date.now(),
        filename,
        fileUrl,
        timestamp: new Date().toISOString(),
        status: result.success ? "success" : "failed"
      };

      setUploadHistory([newHistoryItem, ...uploadHistory.slice(0, 9)]);

      // Set status after a slight delay to let progress finish
      setTimeout(() => {
        if (result.success) {
          setUploadStatus("success");
          toast({
            title: "Upload successful",
            description: "File has been sent to Discord",
            variant: "default"
          });
        } else {
          setUploadStatus("error");
          setErrorMessage(result.message || "Failed to upload file to Discord");
          toast({
            title: "Upload failed",
            description: result.message || "Failed to upload file to Discord",
            variant: "destructive"
          });
        }
        
        setFileUrl("");
        setIsUploading(false);
      }, 500);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
      setIsUploading(false);
      
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  };

  const getFilenameFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname.substring(pathname.lastIndexOf('/') + 1) || "file";
    } catch (e) {
      return url.substring(url.lastIndexOf('/') + 1) || "file";
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-primary px-6 py-4">
        <h1 className="text-xl font-bold text-white">Discord Webhook Uploader</h1>
        <p className="text-purple-200 text-sm">Upload files from URL to your Discord channel</p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <WebhookConfigForm
          webhookUrl={webhookUrl}
          onSave={handleSaveWebhook}
        />

        <FileUploadForm
          fileUrl={fileUrl}
          setFileUrl={setFileUrl}
          onUpload={handleUpload}
          isUploading={isUploading}
        />

        {isUploading && (
          <UploadProgress progress={uploadProgress} />
        )}

        <UploadStatus
          status={uploadStatus}
          errorMessage={errorMessage}
        />

        <UploadHistory history={uploadHistory} />
      </div>
    </div>
  );
}
