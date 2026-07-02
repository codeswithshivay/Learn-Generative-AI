# Video 75 - Custom Exception

class InvalidAge(Exception):
   pass

def person(name, age):
   if age < 0:
      raise InvalidAge("Age cannot be negative!")
   return f"{name} is {age} years old."

person1 = person("Shivay", -10)
print(person1)