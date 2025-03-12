import requests
import sys
import json
import argparse

def upload_file_to_discord(file_url, api_url=None):
    """
    Upload a file from a URL to Discord via the webhook API
    
    Args:
        file_url (str): URL of the file to upload
        api_url (str, optional): API endpoint URL. Defaults to localhost:5000.
    
    Returns:
        dict: API response
    """
    if api_url is None:
        # Default to the local development server
        api_url = "http://localhost:5000/api/webhook/upload"
    
    # Prepare request data
    payload = {
        "fileUrl": file_url
    }
    
    # Make the request
    print(f"Uploading file from {file_url} to Discord...")
    try:
        response = requests.post(
            api_url,
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Check if the request was successful
        if response.status_code == 200:
            print("Success! File uploaded to Discord.")
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            print(f"Response: {response.text}")
            return {"success": False, "message": response.text}
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return {"success": False, "message": str(e)}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Upload a file from a URL to Discord')
    parser.add_argument('file_url', help='URL of the file to upload')
    parser.add_argument('--api', help='API endpoint URL (default: http://localhost:5000/api/webhook/upload)')
    
    args = parser.parse_args()
    
    # Use the provided API URL or default to localhost
    api_url = args.api if args.api else "http://localhost:5000/api/webhook/upload"
    
    # Upload the file
    result = upload_file_to_discord(args.file_url, api_url)
    
    # Print the result
    print(json.dumps(result, indent=2))