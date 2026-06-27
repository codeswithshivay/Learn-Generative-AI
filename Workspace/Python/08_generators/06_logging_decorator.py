# Imports
from functools import wraps

# Video 58 - Logger 
def log_activity(func):
   @wraps(func)
   def wrapper(*args, **kwargs):
      print(f"Calling {func.__name__}")
      result = func(*args, **kwargs)
      print(f"Finished Calling {func.__name__}")
      return result
   return wrapper

@log_activity
def add(a, b):
    return a + b

print(add(1, 2))