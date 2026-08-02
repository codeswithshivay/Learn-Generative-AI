# OpenAI Client
from openai import OpenAI

# Environment variables (OPENAI_API_KEY) must be loaded before instantiating the OpenAI object

# Client
client = OpenAI()

# Request to a model
response = client.chat.completions.create(
   model="gpt-4o-mini",
   messages=[
      { "role": "user", "content": "Hello, how are you?" }
   ]
)

# Response message
response_message = response.choices[0].message
print(response_message.content)