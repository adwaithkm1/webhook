# Discord Webhook File Uploader

This application allows you to upload files from URLs directly to a Discord channel using a pre-configured webhook URL.

## Features

- Upload files from any public URL to Discord
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
python discord_file_uploader.py https://example.com/image.jpg --api https://your-app-url.onrender.com/api/webhook/upload

# For local file upload
python discord_file_uploader.py /path/to/your/local/file.jpg --api https://your-app-url.onrender.com/api/webhook/upload
```

## Deployment to Render.com

This application is configured for easy deployment to Render.com:

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
API_URL = "https://your-app-url.onrender.com/api/webhook/upload"

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

#### Example 2: Local File Upload

```python
import requests

# Replace with your actual API endpoint if deployed
API_URL = "https://your-app-url.onrender.com/api/webhook/upload"

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

## Limitations

- Maximum file size is 8MB (Discord limitation)
- Only supports files that Discord can display/handle
- When using URL-based upload, the file must be accessible via a public URL

## Troubleshooting

If you encounter any issues:

1. For URL-based uploads, make sure the file URL is publicly accessible
2. For local file uploads, ensure you have read permissions for the file
3. Check if the Discord webhook URL is correctly configured
4. Ensure the file size is under 8MB