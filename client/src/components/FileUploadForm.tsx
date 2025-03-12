import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FileUploadFormProps {
  fileUrl: string;
  setFileUrl: (url: string) => void;
  onUpload: () => void;
  isUploading: boolean;
}

export default function FileUploadForm({ 
  fileUrl, 
  setFileUrl, 
  onUpload, 
  isUploading 
}: FileUploadFormProps) {
  return (
    <div>
      <label htmlFor="file-url" className="block text-medium font-medium mb-2">
        File URL
      </label>
      <Input
        id="file-url"
        type="text"
        placeholder="https://example.com/file.jpg"
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
        className="mb-4"
        disabled={isUploading}
      />

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <label className="text-medium font-medium">Supported File Types</label>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-purple-100 text-primary px-2 py-1 rounded">Images (.jpg, .png, .gif)</span>
          <span className="bg-purple-100 text-primary px-2 py-1 rounded">Documents (.pdf, .doc, .txt)</span>
          <span className="bg-purple-100 text-primary px-2 py-1 rounded">Media (.mp3, .mp4)</span>
          <span className="bg-purple-100 text-primary px-2 py-1 rounded">Archives (.zip)</span>
        </div>
      </div>

      <Button
        onClick={onUpload}
        className="w-full"
        disabled={isUploading}
      >
        Upload to Discord
      </Button>
    </div>
  );
}
