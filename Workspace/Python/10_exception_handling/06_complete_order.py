# Video 76 - Complete Order Mini Project

class InvalidChaiError(Exception): pass

def bill(flavor, cups):
   menu = {
      "cardamom_chai": 10,
      "ginger_chai": 20,
   }
   try:
      if not flavor in menu:
         raise InvalidChaiError("We are not selling that chai!")
      if not isinstance(cups, int):
         raise TypeError("Cups must be an integer!")

      total = menu[flavor] * cups

      print(f"Your bill of {flavor} chai is {total} dollars.")
      return total
   
   except Exception as e:
      print('Error:', e)

   finally:
      print("Thank you for using our service!")

bill("cardamom_chai", 10)
bill("mint_chai", 10)