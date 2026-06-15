# Write a program to generate delivery free
order_amount = int(input('Enter order amount? (Numbers only)'))
def generate_delivery_fee(order_amount):
  return 0 if order_amount > 300 else 30

print(generate_delivery_fee(order_amount))