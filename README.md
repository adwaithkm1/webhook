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

You can use the included Python script to upload files:

```bash
python discord_file_uploader.py URL_OF_FILE_TO_UPLOAD
```

Example:

```bash
python discord_file_uploader.py https://example.com/image.jpg
```

### Using a Deployed Version

If the application is deployed, you can specify the API URL:

```bash
python discord_file_uploader.py https://example.com/image.jpg --api https://your-app-url.replit.app/api/webhook/upload
```

## API Reference

### Upload a File

**Endpoint:** `POST /api/webhook/upload`

**Request Body:**

```json
{
  "fileUrl": "https://example.com/path/to/file.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "message": "File uploaded successfully to Discord"
}
```

### Python Integration Example

```python
import requests

# Replace with your actual API endpoint if deployed
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
    print("Error:", response.status_code, response.text)
```

## Limitations

- The file must be accessible via a public URL
- Maximum file size is 8MB (Discord limitation)
- Only supports files that Discord can display/handle

## Troubleshooting

If you encounter any issues:

1. Make sure the file URL is publicly accessible
2. Check if the Discord webhook URL is correctly configured
3. Ensure the file size is under 8MB