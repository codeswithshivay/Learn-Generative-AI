# Imports
from dotenv import load_dotenv
import os
import openai

# Load environment variables
load_dotenv()

# Initialize OpenAI
client = openai.OpenAI(
   api_key=os.getenv("GEMINI_API_KEY"),
   base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Request
response = client.chat.completions.create(
   model="gemini-3.5-flash-lite",
   messages=[
      { "role": "user", "content": "Hello, how are you?" }
   ]
)

# Response message
response_message = response.choices[0].message
print(response_message.content)