# Video 68 - Static Method

# Static method is a method that can be called without creating an instance of the class

class Math:
   @staticmethod
   def add(x, y):
      return x + y
   
   @staticmethod
   def subtract(x, y):
      return x - y
   
math = Math()
print(math.add(10, 20))
print(math.subtract(10, 20))