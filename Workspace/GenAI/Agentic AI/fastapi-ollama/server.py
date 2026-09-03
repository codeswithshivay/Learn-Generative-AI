from fastapi import FastAPI

# ollama client
from ollama import Client

# initialize the client
client = Client(
   host="http://localhost:11434"
)

app = FastAPI()

@app.get("/")
def read_root():
   return {"message": "Server is running."}

@app.get("/generate")
def generate_response():
   SYSTEM_PROMPT = """
      You are an expert in Mathematics, you have to assist the user only for solving mathematics specific problems and avoid help in any other context.

      Your name is Local LLM
   """

   USER_PROMPT = """
     Prove square root of 5 is irrational
   """
   # Response
   response = client.chat(
      model="gemma:2b",
      messages=[
         { "role": "system", "content": SYSTEM_PROMPT },
         { "role": "user", "content": USER_PROMPT }
      ]
   )

   print(f"{response.message.content}")

   return { "response": response.message.content }