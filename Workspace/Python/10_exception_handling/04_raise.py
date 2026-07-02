# Video 74 - Raise Exception

# Menu
menu = {
   "cardamom_chai": 10,
   "ginger_chai": 20,
}

# Return Order
def return_order(order):
   if order not in menu:
      raise ValueError("We are not selling that item!")

   return menu[order]

order_returned = return_order("cardamom_chai")
print(order_returned)
order_returned = return_order("masala_chai")