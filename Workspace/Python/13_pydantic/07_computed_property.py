# Video 95 - Computed Property in Pydantic
from pydantic import BaseModel, computed_field

# Product
class Product(BaseModel):
    price: float
    quantity: int

    @computed_field
    @property
    def total_price(self) -> float:
        return self.price * self.quantity
    
product = Product(price=10.10, quantity=2)
print(product.model_dump())