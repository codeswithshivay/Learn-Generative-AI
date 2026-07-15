# Video 94 - Field and Model Validator in Pydantic
from pydantic import BaseModel, field_validator, model_validator

class Signup(BaseModel):
    username: str
    password: str
    confirm_password: str

    @field_validator('username')
    def check_username(cls, v):
        if v == 'admin':
            raise ValueError('Username cannot be admin')
        return v
    
    @model_validator(mode='after')
    def check_password(self):
        if self.password != self.confirm_password:
            raise ValueError('Passwords do not match')
        return self
    
signup_data = Signup(username='manoj', password='1234', confirm_password='1234')
print(signup_data.model_dump())