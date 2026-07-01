# Video 69 - Classmethod

class Chai:
   # Constructor
   def __init__(self, chai_type, size):
      self.chai_type = chai_type
      self.size = size
   
   # Classmethod
   @classmethod
   def from_dict(cls, chai_dict):
      return cls(
         chai_dict['chai_type'],
         chai_dict['size']
      )
   
chai1 = Chai('Ginger', 'Medium')
chai2 = Chai.from_dict({
   'chai_type': 'Ginger',
   'size': 'Medium'
})
print('Chai 1: ->,', 'Chai type:', chai1.chai_type, 'Chai size:', chai1.size)
print('Chai 2: ->,', 'Chai type:', chai2.chai_type, 'Chai size:', chai2.size)