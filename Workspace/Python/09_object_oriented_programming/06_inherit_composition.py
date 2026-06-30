# Video 65 Watched It And Understanded It

class User:
   def introduce(self):
      print(f"Hi, I am a {self.name}")
      

class Student(User):
   def __init__(self, name, age):
      self.name = name
      self.age = age

student = Student("John", 20)
student.introduce()