import { CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadStatusProps {
  status: "idle" | "success" | "error";
  errorMessage?: string;
}

export default function UploadStatus({ status, errorMessage }: UploadStatusProps) {
  if (status === "idle") return null;

  if (status === "success") {
    return (
      <div className="mt-4">
        <div className="bg-green-100 border border-success text-success px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="block sm:inline font-medium">
              File successfully uploaded to Discord!
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="bg-red-100 border border-error text-error px-4 py-3 rounded relative" role="alert">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="block sm:inline font-medium">
            {errorMessage || "Failed to upload file. Please try again."}
          </span>
        </div>
      </div>
    </div>
  );
}
