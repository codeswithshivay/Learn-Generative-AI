# Video 66 - Three Ways Of Calling Base Class

class Chai:
   def __init__(self, type_, strength):
      self.type = type_
      self.strength = strength

   def get_type(self):
      print(f"This chai is of type {self.type}")

class GingerChai(Chai):
   def __init__(self, type_, strength, ginger_level):
      # Bad practice
      # self.type = type_
      # self.strength = strength

      # Not prefferred way of calling base class
      # Chai.__init__(self, type_, strength)

      # Preferred way of calling base class
      super().__init__(type_, strength)
      # Specialization of ginger chai class
      self.ginger_level = ginger_level

ginger_chai = GingerChai("Ginger", 10, 5)
print('ginger_chai: ',ginger_chai.strength, 'type: ', ginger_chai.get_type())