# Video 70 - Property Decorator

class BankAccount:
   # Constructor
   def __init__(self, account_number, money):
      self._account_number = account_number
      self._money = money

   @property
   def account_number(self):
      return self._account_number[:-3] + "XXX"
   
   @account_number.setter
   def account_number(self, _):
      raise ValueError('Account number cannot be changed once initialized')
   
   @property
   def money(self):
      return self._money
   
   @money.setter
   def money(self, new_money):
      if(0 > new_money):
         raise ValueError('Cannot have negative money')
      self._money = new_money

# Account
account = BankAccount('1234567890', 1000)
print(account.account_number)
account.account_number = '4432219876'