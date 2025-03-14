# Discord Webhook File Uploader

This application allows you to upload files (from URLs or local files) directly to a Discord channel using a pre-configured webhook URL.

### Method 1: Upload from URL
```python
import requests

# Replace with your actual API endpoint
API_URL = "https://webhook-og7v.onrender.com/api/webhook/upload"

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
    print("Error:", response.status_code, response.text)
```

### Method 2: Upload from Local File
```python
import requests
import os

# Replace with your actual API endpoint
API_URL = "https://webhook-og7v.onrender.com/api/webhook/upload"

# The local file you want to upload
file_path = "/path/to/your/local/file.jpg"

# Open the file and create a multipart form request
with open(file_path, 'rb') as file:
    files = {'file': file}
    response = requests.post(API_URL, files=files)

# Check the response
if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Error:", response.status_code, response.text)
```

### Command-Line Usage
```bash
# Upload a local file
python discord_file_uploader.py /path/to/your/local/file.jpg

# Upload a file from a URL
python discord_file_uploader.py https://example.com/path/to/file.jpg
```

## Features

- Upload files from any public URL to Discord
- Upload local files directly from your computer
- Pre-configured webhook (no UI configuration needed)
- Simple API endpoint for programmatic uploads
- Python script included for easy integration

## Getting Started

### Prerequisites

- Python 3.6+ with `requests` library installed
- A Discord webhook URL (already configured in the server)

### Running the Application

1. Start the server:

```
npm run dev
```

2. The server will run on port 5000 by default

### Using the Python Script

You can use the included Python script to upload files from both local paths and URLs:

#### Upload from URL:

```bash
python discord_file_uploader.py https://example.com/image.jpg
```

#### Upload from Local File:

```bash
python discord_file_uploader.py /path/to/your/local/file.jpg
```

### Using a Deployed Version

If the application is deployed, you can specify the API URL:

```bash
# For URL-based upload
python discord_file_uploader.py https://example.com/image.jpg --api https://webhook-og7v.onrender.com/api/webhook/upload

# For local file upload
python discord_file_uploader.py /path/to/your/local/file.jpg --api https://webhook-og7v.onrender.com/api/webhook/upload
```

## Deployment Options

### Option 1: Deploy to Render.com

This application is already configured for easy deployment to Render.com using the included `render.yaml` file:

1. Push this repository to GitHub, GitLab, or Bitbucket.

2. Log in to your Render.com account and click "New Web Service".

3. Connect your repository and select it.

4. Render will automatically detect the configuration from `render.yaml`.

5. Important: Add your `DISCORD_WEBHOOK_URL` as an environment variable in the Render dashboard:
   - Go to your web service dashboard
   - Click "Environment" in the left panel
   - Add a key `DISCORD_WEBHOOK_URL` with your Discord webhook URL as the value
   - Click "Save Changes"

6. Render will automatically build and deploy your service.

### Option 2: Deploy on Replit

This application can also be deployed directly on Replit:

1. In your Replit project, click the "Deployment" tab at the top of the screen.

2. Select the appropriate deployment tier.

3. Add your `DISCORD_WEBHOOK_URL` as an environment secret:
   - Go to the "Secrets" tool in the sidebar
   - Add a key `DISCORD_WEBHOOK_URL` with your Discord webhook URL as the value

4. Deploy with the following settings:
   - Build command: `npm run build`
   - Run command: `npm start`

5. Click "Deploy" to make your app available at your Replit app URL.

## API Reference

### Upload a File

**Endpoint:** `POST /api/webhook/upload`

#### Method 1: URL-based Upload

**Request Body (JSON):**

```json
{
  "fileUrl": "https://example.com/path/to/file.jpg"
}
```

**Content-Type:** `application/json`

#### Method 2: Direct File Upload

**Request Body (Multipart Form Data):**

- Key: `file`
- Value: The file binary data

**Content-Type:** `multipart/form-data`

**Response (for both methods):**

```json
{
  "success": true,
  "message": "File uploaded successfully to Discord"
}
```

### Python Integration Examples

#### Example 1: URL-based Upload

```python
import requests

# Replace with your actual API endpoint if deployed
API_URL = "https://webhook-og7v.onrender.com/api/webhook/upload"

# OPTION 1: For uploading a file from a URL
file_url = "https://example.com/path/to/file.jpg"  # Replace with your actual URL

# Make the request for URL-based upload
response = requests.post(
    API_URL,
    json={"fileUrl": file_url}  # JSON payload for URL-based upload
)

# Check the response
if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Error:", response.status_code, response.text)
```

#### Example 2: Local File Upload

```python
import requests
import os

# Replace with your actual API endpoint if deployed
API_URL = "https://webhook-og7v.onrender.com/api/webhook/upload"

# OPTION 2: For uploading a file from your local computer
file_path = "/path/to/your/local/file.jpg"  # Replace with your actual local file path

# Verify the file exists
if not os.path.exists(file_path):
    print(f"Error: File not found at {file_path}")
else:
    # Open the file and create a multipart form request
    with open(file_path, 'rb') as file:
        # Note: 'file' is the form field name expected by the server
        files = {'file': (os.path.basename(file_path), file)}
        
        # Make the request for local file upload
        response = requests.post(API_URL, files=files)  # Multipart form for local files
    
        # Check the response
        if response.status_code == 200:
            print("Success:", response.json())
        else:
            print("Error:", response.status_code, response.text)
```

## Limitations

- Maximum file size is 8MB (Discord limitation)
- Only supports files that Discord can display/handle
- When using URL-based upload, the file must be accessible via a public URL

## Supported File Types

- Images (.jpg, .png, .gif)
- Documents (.pdf, .doc, .txt)
- Media (.mp3, .mp4)
- Archives (.zip)

## Note

This service uses a pre-configured Discord webhook URL set on the server. There is no need to configure the webhook URL through the UI.

## Troubleshooting

If you encounter any issues:

1. For URL-based uploads, make sure the file URL is publicly accessible
2. For local file uploads, ensure you have read permissions for the file
3. Check if the Discord webhook URL is correctly configured
4. Ensure the file size is under 8MB

## Command-Line Usage

The included Python script can be used as a command-line tool for quick file uploads:

```bash
# Upload a local file
python discord_file_uploader.py /path/to/your/file.jpg

# Upload a file from a URL
python discord_file_uploader.py https://example.com/path/to/file.jpg

# Use a custom API endpoint (if deployed)
python discord_file_uploader.py your_file.png --api https://webhook-og7v.onrender.com/api/webhook/upload
```

The script will automatically detect whether you're uploading a local file or a URL, and handle it accordingly.
