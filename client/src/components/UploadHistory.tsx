import { Check, AlertCircle } from "lucide-react";
import { UploadHistoryItem } from "@shared/schema";
import { cn } from "@/lib/utils";

interface UploadHistoryProps {
  history: UploadHistoryItem[];
}

export default function UploadHistory({ history }: UploadHistoryProps) {
  // Format date to friendly string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Less than a minute
    if (diff < 60 * 1000) {
      return "Just now";
    }
    
    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    }
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }
    
    // Format as date
    return date.toLocaleDateString();
  };

  return (
    <div className="mt-6">
      <h2 className="text-medium font-medium mb-2">Recent Uploads</h2>
      <div className="border border-light rounded-md overflow-hidden">
        {history.length === 0 ? (
          <div className="p-4 text-center text-light text-sm">
            No uploads yet
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id} 
              className="p-3 border-b border-light last:border-b-0 flex items-center justify-between"
            >
              <div className="flex items-center">
                {item.status === "success" ? (
                  <Check className="w-5 h-5 mr-2 text-success" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2 text-error" />
                )}
                <div className="text-sm">
                  <p className="text-dark truncate max-w-[180px]">{item.filename}</p>
                  <p className="text-light text-xs">{formatDate(item.timestamp)}</p>
                </div>
              </div>
              <span 
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded",
                  item.status === "success" 
                    ? "bg-green-100 text-success" 
                    : "bg-red-100 text-error"
                )}
              >
                {item.status === "success" ? "Success" : "Failed"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
