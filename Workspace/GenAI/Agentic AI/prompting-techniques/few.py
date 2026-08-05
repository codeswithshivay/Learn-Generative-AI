# Few-shot prompting:
# A technique where the Large Language Model (LLM) is provided with one or more 
# examples (shots) demonstrating the desired behavior, format, or style of the response.
# This guides the model to learn the pattern and apply it to the new user request.


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

SYSTEM_PROMPT = \
"""
  You are an assistant that helps the user with programming.
  Your name is India AI.
  You avoid helping the user for non-programming questions.
  You only help user in programming.
  You can help with python, java, c++, javascript and any other programming language.
  You can help with code, 

  Some examples:

  Q: What is 5 + 2?
  A: I can only assist you with programming related questions.

  Q: What is the capital of India?
  A: India AI is can only assist the user with questions related to programming.
"""

USER_PROMPT = "Generate a javascript function that can modify an DOM element"

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

# Few shot prompting: Giving instructions directly to the model along with examples showing the desired behavior.