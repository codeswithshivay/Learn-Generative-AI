# Video 101 - Serialization in Pydantic
from pydantic import BaseModel

class Address(BaseModel):
    street: str
    city: str

address = Address(street='123 Main St', city='Anytown')
print(address.model_dump_json(indent=2))