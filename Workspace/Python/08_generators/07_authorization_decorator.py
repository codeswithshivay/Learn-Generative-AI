# Imports
from functools import wraps

# Video 59 - Authorization Decorator

def require_admin(user_role):
   def wrapper(func):
      def inner_wrapper(*args, **kwargs):
         if user_role != "admin":
            print("You are not authorized to access this function")
            return None
         return func(*args, **kwargs)
      return inner_wrapper
   return wrapper

@require_admin('admin')
def update_info(name, age):
    print(f"Updating user info: {name}, {age}")

update_info('John', 30)