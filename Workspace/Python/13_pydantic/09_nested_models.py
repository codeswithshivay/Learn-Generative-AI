# Video 97 - Nested Models in Pydantic
from pydantic import BaseModel
from typing import Optional

# Class Product
class Product(BaseModel):
    name: str
    price: float
    quantity: int

# Class Cart
class Cart(BaseModel):
    name: Optional[str] = 'Cart'
    products: list[Product]

product1 = Product(name='Product 1', price=10.10, quantity=2)
product2 = Product(name='Product 2', price=20.20, quantity=3)

cart = Cart(products=[product1, product2])
print(cart.model_dump())