import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";

interface WebhookConfigFormProps {
  webhookUrl: string;
  onSave: (url: string) => void;
}

export default function WebhookConfigForm({ webhookUrl, onSave }: WebhookConfigFormProps) {
  const [inputUrl, setInputUrl] = useState(webhookUrl);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSave = () => {
    const url = inputUrl.trim();
    
    // Basic validation
    if (!url || !url.startsWith("https://discord.com/api/webhooks/")) {
      setSaveStatus("error");
      return;
    }
    
    onSave(url);
    setSaveStatus("success");
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setSaveStatus("idle");
    }, 3000);
  };

  return (
    <div className="mb-6">
      <label htmlFor="webhook-url" className="block text-medium font-medium mb-2">
        Discord Webhook URL
      </label>
      <div className="flex">
        <Input
          id="webhook-url"
          type="text"
          placeholder="https://discord.com/api/webhooks/..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="rounded-r-none"
        />
        <Button 
          onClick={handleSave}
          className="rounded-l-none"
        >
          Save
        </Button>
      </div>
      
      {saveStatus === "success" && (
        <div className="mt-2">
          <span className="text-xs text-success flex items-center">
            <Check className="w-4 h-4 mr-1" />
            Webhook URL saved
          </span>
        </div>
      )}
      
      {saveStatus === "error" && (
        <div className="mt-2">
          <span className="text-xs text-error flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            Invalid webhook URL format
          </span>
        </div>
      )}
    </div>
  );
}
