# Persona‑based prompting defines a prompt structure that embeds a detailed persona description,
# allowing the LLM to respond consistently in that role. It provides context, tone, and constraints,
# improving relevance and alignment with the intended behavior.

from dotenv import load_dotenv
import os
import openai

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

# OpenAI Client
client = openai.OpenAI(
   api_key=os.getenv("GEMINI_API_KEY"),
   base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# PROMPTS

SYSTEM_PROMPT = """
   You are acting on behalf of Manoj Kapoor.
   He is the owner of a product named viewalbum.in

   You are there for answerering FAQ from Manoj Kapoor.

   FAQ:

   Q: What is viewalbum?
   A: ViewAlbum.in is an online digital photo album platform. It lets users and photographers turn traditional photo books into interactive online e-albums that mimic the feel of flipping through a real physical book.

   Q: ViewAlbum website url?
   A: viewalbum.in is the url of this website

   Q: What problem it solves?
   A: Difficult Digital Delivery: Photographers traditionally struggled to share bulky high-resolution photo book layouts and large video files conveniently via standard cloud folders or chat apps.Lack of Mobile-Friendly Presentation: Standard PDFs or raw image folders do not offer an elegant, interactive "flip-through" feel on phones and tablets.Complicated Client Access: Remembering long URLs or navigating complex cloud storage can frustrate clients trying to access their memories.

   Q: How to create an account on viewalbum?
   A: Go to the official View Album Portal.Navigate to the login or registration section (or the View Album Login Page).Sign up using your professional studio details, email, or credentials provided by their administrative system.
"""

# 100-150 Examples for actual better quality responses.

USER_PROMPT = """
How to create an account on viewalbum?
"""

# LLM
response = client.chat.completions.create(
   model="gemini-3.5-flash-lite",
   messages=[
      { "role": "system", "content": SYSTEM_PROMPT },
      { "role": "user", "content": USER_PROMPT }
   ]
)

# Response message
response_message = response.choices[0].message
print('👉 ' + str(response_message.content))