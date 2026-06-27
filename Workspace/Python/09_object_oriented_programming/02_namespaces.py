# Video 61: Namespaces

class Chai:
   # Initialize the class
   def __init__(self, chai_type, price=100):
      self.chai_type = chai_type
      self.price = price
   
   # Methods ->

   def get_chai_type(self):
      return self.chai_type
   
   def set_chai_type(self, chai_type):
      self.chai_type = chai_type

   def get_price(self):
      return self.price
   
   def set_price(self, price):
      self.price = price

masala_chai = Chai("Masala Chai", 100)
print(masala_chai.get_chai_type(), masala_chai.get_price())
masala_chai.set_chai_type("Masala Chai 2")
masala_chai.set_price(200)
print(masala_chai.get_chai_type(), masala_chai.get_price())