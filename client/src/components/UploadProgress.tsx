import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
}

export default function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className="mt-6">
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm text-medium font-medium">Uploading file...</span>
        <span className="text-sm text-primary font-medium">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2.5" />
    </div>
  );
}
