# Video 64 - Constructors and __init__ in Python

class Chai:
   def __init__(self, color, size):
      self.color = color
      self.size = size
   
   def summary(self):
      print(f"Chai color: {self.color}, size: {self.size}")

chai = Chai("red", 10)
chai.summary()