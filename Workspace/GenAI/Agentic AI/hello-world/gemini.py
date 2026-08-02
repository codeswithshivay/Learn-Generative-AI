# Imports
from dotenv import load_dotenv
import os
from google import genai

# Load environment variables
load_dotenv()

# Initialize Gemini
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# for model in client.models.list():
#    print(model.name)

# Request
response = client.models.generate_content(
   model="gemini-3.5-flash-lite",
   contents="Hello, how are you?, Generate an python program for me that helps me calculating the electrivity bill by telling it units consumed."
)

# Response message
response_message = response.text
print(response_message)