# Imports
from pydantic import BaseModel, field_validator

# Class Person
class Person(BaseModel):
    first_name: str
    last_name: str

    @field_validator("first_name", "last_name") 
    def validate_name(cls, v): # Function runs for each field
        if len(v) < 3:
            raise ValueError("Name must be at least 3 characters")
        

person1 = Person(first_name="John", last_name="Doe")