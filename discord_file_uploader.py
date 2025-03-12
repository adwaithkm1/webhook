import requests
import sys
import json
import argparse
import os
from pathlib import Path

def is_url(string):
    return string.startswith(('http://', 'https://'))

def upload_from_url(api_url, file_url):
    """Upload a file from a URL to Discord via the webhook API"""
    try:
        response = requests.post(
            api_url,
            json={"fileUrl": file_url}
        )
        return response
    except Exception as e:
        print(f"Error uploading from URL: {e}")
        return None

def upload_from_local(api_url, file_path):
    """Upload a local file to Discord via the webhook API"""
    try:
        if not os.path.exists(file_path):
            print(f"Error: File not found at {file_path}")
            return None

        with open(file_path, 'rb') as file:
            files = {'file': (os.path.basename(file_path), file)}
            response = requests.post(api_url, files=files)
            return response
    except Exception as e:
        print(f"Error uploading local file: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description='Upload files to Discord via webhook')
    parser.add_argument('file_path_or_url', help='Path to local file or URL to upload')
    parser.add_argument('--api', default='http://localhost:5000/api/webhook/upload',
                        help='API URL (defaults to http://localhost:5000/api/webhook/upload)')

    args = parser.parse_args()

    file_path_or_url = args.file_path_or_url
    api_url = args.api

    print(f"Using API endpoint: {api_url}")

    # Determine if it's a URL or local file path
    if is_url(file_path_or_url):
        print(f"Uploading from URL: {file_path_or_url}")
        response = upload_from_url(api_url, file_path_or_url)
    else:
        print(f"Uploading local file: {file_path_or_url}")
        response = upload_from_local(api_url, file_path_or_url)

    if response:
        if response.status_code == 200:
            print("Success:", response.json())
        else:
            print(f"Error: {response.status_code} - {response.text}")
    else:
        print("Upload failed due to an error")

if __name__ == "__main__":
    main()