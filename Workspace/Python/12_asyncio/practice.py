# 1. Simple asyncio example

# import asyncio
# import time

# async def fetch_orders():
#    await asyncio.sleep(3)
#    print("Orders fetched")

# async def fetch_products():
#    await asyncio.sleep(1)
#    print("Products fetched")

# async def main():
#    await asyncio.gather(fetch_orders(), fetch_products())

# asyncio.run(main())

# Thread + Lock example (Unsafe)
# import threading
# import time

# wallet = 1000

# def deposit(amount):
#    time.sleep(2)
#    global wallet
#    wallet += amount
#    print(f"Deposited {amount}")
#    print(f"Wallet balance: {wallet}")

# def withdraw(amount):
#    global wallet
#    if wallet >= amount:
#       wallet -= amount
#       print(f"Withdrawn {amount}")
#       print(f"Wallet balance: {wallet}")
#    else:
#       print("Insufficient funds")
#       print(f"Wallet balance: {wallet}")

# def main():
#    thread1 = threading.Thread(target=deposit, args=(500,))
#    thread2 = threading.Thread(target=withdraw, args=(200,))
#    thread1.start()
#    thread2.start()
#    thread1.join()
#    thread2.join()

# if __name__ == "__main__":
#    main()

# Thread + Lock example (Safe)
# import threading
# import time

# wallet = 1000
# lock = threading.Lock()

# def deposit(amount):
#    with lock:
#       time.sleep(2)
#       global wallet
#       wallet += amount
#       print(f"Deposited {amount}")
#       print(f"Wallet balance: {wallet}")

# def withdraw(amount):
#    with lock:
#       global wallet
#       if wallet >= amount:
#          wallet -= amount
#          print(f"Withdrawn {amount}")
#          print(f"Wallet balance: {wallet}")
#       else:
#          print("Insufficient funds")
#          print(f"Wallet balance: {wallet}")

# def main():
#    thread1 = threading.Thread(target=deposit, args=(500,))
#    thread2 = threading.Thread(target=withdraw, args=(200,))
#    thread1.start()
#    thread2.start()
#    thread1.join()
#    thread2.join()

# if __name__ == "__main__":
#    main()

# 3. ProcessPoolExecutor example
import asyncio
import time
from concurrent.futures import ThreadPoolExecutor

async def fetch_orders():
   await asyncio.sleep(3)
   print("Orders fetched")

async def fetch_products():
   await asyncio.sleep(1)
   print("Products fetched")

def blocking_function():
   print("Blocking function started")
   time.sleep(5)
   print("Blocking function completed")
   return 'I am executed!'

async def main():
   await asyncio.gather(fetch_orders(), fetch_products())
   with ThreadPoolExecutor(max_workers=2) as pool:
      loop = asyncio.get_running_loop()
      result = await loop.run_in_executor(pool, blocking_function)
      print('Blocking function result:', result)

asyncio.run(main())