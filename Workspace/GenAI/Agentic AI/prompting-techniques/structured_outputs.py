# Structured outputs:
# A technique or feature that ensures a Large Language Model (LLM) responds with data
# conforming to a specific, predefined structure or schema (such as JSON), making the
# output predictable and easy to parse programmatically.


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
  A: {"is_applicable": false, "response": ""}

  Q: What is the capital of India?
  A: {"is_applicable": false, "response": ""}

  Q: Generate a javascript function that can modify an DOM element
  A: {"is_applicable": true, "response": "function modifyDOM() {\n  const element = document.getElementById('myElement');\n  if (element) {\n    element.textContent = 'Modified DOM element';\n    element.style.color = 'red';\n  }\n}"}

  Output Format:
  1. You have to respond in JSON format.
  2. The JSON object should have two keys: "is_applicable" (boolean) and "response" (string).
  3. If the user's question is related to programming, set "is_applicable" to true and "response" to the answer.
  4. If the user's question is not related to programming, set "is_applicable" to false and "response" to an empty string.
  5. If "is_applicable" is false, set "response" to an empty string.
  6. If "is_applicable" is true, set "response" to the answer.
"""

USER_PROMPT = "What's your name?, Teach me python"

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