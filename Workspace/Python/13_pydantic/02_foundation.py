# Video 90 - Foundation of Pydantic
from pydantic import BaseModel

class User(BaseModel):
   name: str
   age: int
   is_active: bool

input_data = {"name": "Piyush", "age": "25", "is_active": True}

validated_user = User(**input_data).model_dump()
print(validated_user)