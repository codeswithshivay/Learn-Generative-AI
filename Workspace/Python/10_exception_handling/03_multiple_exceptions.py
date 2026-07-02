# Video 73 - Multiple Exceptions Handling

# Process Order
def process_order_price(order, quantity):
   try:
      item = {
         "masala_chai": 10,
         "ginger_chai": 20,
      }[order]
      return item * quantity
   
   except KeyError:
      print("Requested item is not available!")
      return None
   
   except TypeError:
      print("Invalid quantity data type!")
      return None
   
order_price = process_order_price("cardamom_chai", 10)
print(order_price)