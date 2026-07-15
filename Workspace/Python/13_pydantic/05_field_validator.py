# Video 93 - Field Validator in Pydantic
from pydantic import BaseModel, Field
from typing import Optional

class Cart(BaseModel):
    name: str = Field(..., min_length=3)
    items: Optional[list] = Field([])

cart1 = Cart(name='S',items=['apple', 'banana'])
print(cart1.model_dump())

# Type Annotation

# ↓

# "What type is this field?"

# ──────────────

# Field(...)

# ↓

# "What extra rules should this field satisfy?"