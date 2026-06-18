# Write a order summary generator code using zip

customers = ['Shivay', 'Hitesh', 'Piyush']
bills = [10, 38, 100]

for customer, bill in zip(customers, bills):
    print(f'{customer} paid ₹{bill}')