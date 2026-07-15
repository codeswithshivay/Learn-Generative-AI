# Video 92 - Mixing Pydantic and Typing
from pydantic import BaseModel
from typing import List

class User(BaseModel):
    name: str
    hobbies: List[str]

# Wrong
user1 = User(name="John", hobbies=["reading", []])
# Correct
user1 = User(name="John", hobbies=["reading", "coding"])
print(user1.model_dump())