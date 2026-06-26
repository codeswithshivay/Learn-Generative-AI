from functools import wraps

# Video 57 - Python Generators - Decorators

# Decorators
def logger(func):
   @wraps(func)
   def inner(*args, **kwargs):
      print(f'Calling {func.__name__}')
      return func(*args, **kwargs)
   return inner

@logger
def add(a, b):
   return a + b

print(add(1, 2))