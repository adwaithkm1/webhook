import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Code } from './ui/code';

export default function LandingPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary/90 mb-2">Discord Webhook File Uploader API</h1>
        <p className="text-xl text-muted-foreground">
          Upload files from URLs or your local computer to your Discord channel
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            This service allows you to upload files from both URLs and local files to a Discord channel 
            using a pre-configured webhook. Simply send a POST request to the endpoint with either a 
            file URL or a local file, and it will be automatically forwarded to Discord.
          </CardDescription>
        </CardHeader>
      </Card>

      <h2 className="text-2xl font-bold mb-4">API Reference</h2>

      <Tabs defaultValue="url" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">Upload from URL</TabsTrigger>
          <TabsTrigger value="local">Upload Local File</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url">
          <Card>
            <CardHeader>
              <CardTitle>Method 1: Upload from URL</CardTitle>
              <CardDescription>Send a JSON payload with the file URL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Endpoint</h3>
                <Code>POST /api/webhook/upload</Code>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Request Body (JSON)</h3>
                <Code>{`{
  "fileUrl": "https://example.com/path/to/file.jpg"
}`}</Code>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Response</h3>
                <Code>{`{
  "success": true,
  "message": "File uploaded successfully to Discord"
}`}</Code>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Python Example</h3>
                <Code>{`import requests

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
    print("Error:", response.status_code, response.text)`}</Code>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="local">
          <Card>
            <CardHeader>
              <CardTitle>Method 2: Upload Local File</CardTitle>
              <CardDescription>Send a multipart form with the file data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Endpoint</h3>
                <Code>POST /api/webhook/upload</Code>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Request Body (Multipart Form Data)</h3>
                <ul className="list-disc pl-6">
                  <li>Form field name: <code className="bg-muted px-1 rounded">file</code></li>
                  <li>Value: Your file binary data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Response</h3>
                <Code>{`{
  "success": true,
  "message": "File uploaded successfully to Discord"
}`}</Code>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Python Example</h3>
                <Code>{`import requests
import os

# Replace with your actual API endpoint
API_URL = "https://your-app-url.replit.app/api/webhook/upload"

# Local file path
file_path = "/path/to/your/local/file.jpg"

# Open the file and create a multipart form request
with open(file_path, 'rb') as file:
    files = {'file': file}
    response = requests.post(API_URL, files=files)

# Check the response
if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Error:", response.status_code, response.text)`}</Code>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Command-Line Tool</CardTitle>
          <CardDescription>
            The included Python script can be used to upload files directly from the command line
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Code>{`# Upload a local file
python discord_file_uploader.py /path/to/your/file.jpg

# Upload a file from a URL
python discord_file_uploader.py https://example.com/path/to/file.jpg`}</Code>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Supported File Types</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm">
          Images (.jpg, .png, .gif)
        </span>
        <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm">
          Documents (.pdf, .doc, .txt)
        </span>
        <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm">
          Media (.mp3, .mp4)
        </span>
        <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm">
          Archives (.zip)
        </span>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded">
        <p className="font-medium">Note:</p>
        <p>This service uses a pre-configured Discord webhook URL set on the server. There is no need to configure the webhook URL through the UI.</p>
      </div>
    </div>
  );
}