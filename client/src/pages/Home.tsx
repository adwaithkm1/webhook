import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";

export default function Home() {
  return (
    <div className="bg-slate-100 font-sans min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Discord Webhook File Uploader API</h1>
          <p className="text-purple-200 text-sm">Upload files from URLs to your Discord channel</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">How It Works</h2>
            <p className="text-gray-700 mb-4">
              This service allows you to upload files from URLs to a Discord channel using a pre-configured webhook.
              Simply send a POST request to the endpoint with a file URL, and it will be automatically forwarded to Discord.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">API Reference</h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Endpoint</h3>
              <div className="bg-gray-100 p-3 rounded-md">
                <Code>POST /api/webhook/upload</Code>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Request Body</h3>
              <div className="bg-gray-100 p-3 rounded-md">
                <pre className="text-sm">
                  {`{
  "fileUrl": "https://example.com/path/to/file.jpg"
}`}
                </pre>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Response</h3>
              <div className="bg-gray-100 p-3 rounded-md">
                <pre className="text-sm">
                  {`{
  "success": true,
  "message": "File uploaded successfully to Discord"
}`}
                </pre>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Python Example</h3>
              <div className="bg-gray-100 p-3 rounded-md">
                <pre className="text-sm overflow-auto">
                  {`import requests

# Replace with your actual API endpoint
API_URL = "https://your-app-url.replit.app/api/webhook/upload"

# The file URL you want to upload
file_url = "https://example.com/path/to/file.jpg"

# Make the request
response = requests.post(
    API_URL,
    json={"fileUrl": file_url}
)

# Check the response
if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Error:", response.status_code, response.text)`}
                </pre>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Supported File Types</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-purple-100 text-primary px-2 py-1 rounded">Images (.jpg, .png, .gif)</span>
              <span className="bg-purple-100 text-primary px-2 py-1 rounded">Documents (.pdf, .doc, .txt)</span>
              <span className="bg-purple-100 text-primary px-2 py-1 rounded">Media (.mp3, .mp4)</span>
              <span className="bg-purple-100 text-primary px-2 py-1 rounded">Archives (.zip)</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Note</h2>
            <p className="text-gray-700">
              This service uses a pre-configured Discord webhook URL set on the server.
              There is no need to configure the webhook URL through the UI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
