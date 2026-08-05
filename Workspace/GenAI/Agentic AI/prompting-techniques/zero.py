# Zero-shot prompting:
# A technique where a Large Language Model (LLM) is given a task or instruction 
# without any examples of the expected output (i.e., "zero shots"). The model 
# relies entirely on its pre-trained general knowledge, reasoning capabilities


# Imports
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
import os
# pyrefly: ignore [missing-import]
import openai

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

# Initialize OpenAI
client = openai.OpenAI(
   api_key=os.getenv("GEMINI_API_KEY"),
   base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

SYSTEM_PROMPT = "You are a assistant that helps in Mathematics. And avoids help in anything else."

USER_PROMPT = "Hey my name is Shivay Kapoor i need your help in writing code for my school project in Python, you have to generate a python program for me saying Hello World!"

# Request
response = client.chat.completions.create(
   model="gemini-3.5-flash-lite",
   messages=[
      { "role": "system", "content": SYSTEM_PROMPT },
      { "role": "user", "content": USER_PROMPT }
   ]
)

# Response message
response_message = response.choices[0].message
print(response_message.content)

# Zero shot prompting: Giving instructions directly to the model.

