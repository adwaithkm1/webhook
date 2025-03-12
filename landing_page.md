# Discord Webhook File Uploader API

Upload files from URLs or your local computer to your Discord channel

## How It Works

This service allows you to upload files from both URLs and local files to a Discord channel using a pre-configured webhook. Simply send a POST request to the endpoint with either a file URL or a local file, and it will be automatically forwarded to Discord.

## API Reference

### Method 1: Upload from URL

**Endpoint**
```
POST /api/webhook/upload
```

**Request Body (JSON)**
```json
{
  "fileUrl": "https://example.com/path/to/file.jpg"
}
```

**Response**
```json
{
  "success": true,
  "message": "File uploaded successfully to Discord"
}
```

**Python Example**
```python
import requests

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
    print("Error:", response.status_code, response.text)
```

### Method 2: Upload Local File

**Endpoint**
```
POST /api/webhook/upload
```

**Request Body (Multipart Form Data)**
- Form field name: `file`
- Value: Your file binary data

**Response**
```json
{
  "success": true,
  "message": "File uploaded successfully to Discord"
}
```

**Python Example**
```python
import requests
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
    print("Error:", response.status_code, response.text)
```

### Command-Line Tool

The included Python script can be used to upload files directly from the command line:

```bash
# Upload a local file
python discord_file_uploader.py /path/to/your/file.jpg

# Upload a file from a URL
python discord_file_uploader.py https://example.com/path/to/file.jpg
```

## Supported File Types

- Images (.jpg, .png, .gif)
- Documents (.pdf, .doc, .txt)
- Media (.mp3, .mp4)
- Archives (.zip)

## Note

This service uses a pre-configured Discord webhook URL set on the server. There is no need to configure the webhook URL through the UI.