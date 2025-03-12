import requests
import sys
import json
import argparse
import os
from pathlib import Path

def upload_file_to_discord(file_path, api_url=None):
    """
    Upload a file to Discord via the webhook API
    
    Args:
        file_path (str): Path to local file or URL of the file
        api_url (str, optional): API endpoint URL. Defaults to localhost:5000.
    
    Returns:
        dict: API response
    """
    if api_url is None:
        # Default to the local development server
        api_url = "http://localhost:5000/api/webhook/upload"
    
    # Check if file_path is a local file
    path = Path(file_path)
    
    if path.exists() and path.is_file():
        # For local files, use multipart form data
        print(f"Uploading local file: {file_path} to Discord...")
        try:
            with open(file_path, 'rb') as file:
                response = requests.post(
                    api_url,
                    files={'file': (path.name, file, 'application/octet-stream')},
                )
        except Exception as e:
            print(f"Error reading file: {str(e)}")
            return {"success": False, "message": str(e)}
    else:
        # For URLs, use JSON payload
        print(f"Uploading file from URL: {file_path} to Discord...")
        try:
            response = requests.post(
                api_url,
                json={"fileUrl": file_path},
                headers={"Content-Type": "application/json"}
            )
        except Exception as e:
            print(f"Error with URL: {str(e)}")
            return {"success": False, "message": str(e)}
    
    # Check if the request was successful
    if response.status_code == 200:
        print("Success! File uploaded to Discord.")
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(f"Response: {response.text}")
        return {"success": False, "message": response.text}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Upload a file or URL to Discord')
    parser.add_argument('file_path', help='Path to local file or URL of the file to upload')
    parser.add_argument('--api', help='API endpoint URL (default: http://localhost:5000/api/webhook/upload)')
    
    args = parser.parse_args()
    
    # Use the provided API URL or default to localhost
    api_url = args.api if args.api else "http://localhost:5000/api/webhook/upload"
    
    # Upload the file
    result = upload_file_to_discord(args.file_path, api_url)
    
    # Print the result
    print(json.dumps(result, indent=2))