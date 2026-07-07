# Practicing My Mental Models And Converting them in visibile code

# One Thread

# for i in range(10):
#    print(i)

# Two threads handling two users
# import threading
# from time import sleep

# def serve_chai(chai_type, name):
#    print(f'Active threads when chai was {chai_type}',threading.active_count())
#    print(f"Boiling {chai_type} Chai wait...")
#    sleep(2)
#    print(f"{chai_type} Chai ready to serve for {name}")

# # initiate two threads
# thread1 = threading.Thread(target=serve_chai, args=("Masala", "Hitesh"))
# thread2 = threading.Thread(target=serve_chai, args=("Mint", "Shivay"))

# print('Active threads',threading.active_count())

# # start the threads
# thread1.start()
# thread2.start()

# Unprotected shared counter
# import threading

# wallet_balance = 1600

# def deposit(amount):
#    global wallet_balance
#    wallet_balance += amount
#    print(f"Deposited {amount} into wallet")
#    print(f"Wallet balance is {wallet_balance}")

# def withdraw(amount):
#    global wallet_balance
#    wallet_balance -= amount
#    print(f"Withdrawn {amount} from wallet")
#    print(f"Wallet balance is {wallet_balance}")

# thread1 = threading.Thread(target=deposit, args=(100,))
# thread2 = threading.Thread(target=withdraw, args=(500,))

# thread1.start()
# thread2.start()

# print(f"Wallet balance is {wallet_balance}")

# This code behavior is not deterministic, and it is not thread safe, solution written below

# Solution Code (Thread Safe)
# import threading

# wallet_balance = 1600
# lock = threading.Lock()

# def deposit(amount):
#    with lock:
#       global wallet_balance
#       wallet_balance += amount
#       print(f"Deposited {amount} into wallet")
#       print(f"Wallet balance is {wallet_balance}")

# def withdraw(amount):
#    with lock:
#       global wallet_balance
#       wallet_balance -= amount
#       print(f"Withdrawn {amount} from wallet")
#       print(f"Wallet balance is {wallet_balance}")

# thread1 = threading.Thread(target=deposit, args=(100,))
# thread2 = threading.Thread(target=withdraw, args=(500,))

# thread1.start()
# thread2.start()

# thread1.join()
# thread2.join()

# print(f"Wallet balance is {wallet_balance}")

# Multiprocessing (Writing an basic example of Multiprocessing)
import multiprocessing
import time

def do_work(process_name, delay):
   time.sleep(delay)
   print(f"Process {process_name} is finished!")

if __name__ == '__main__':
   process1 = multiprocessing.Process(target=do_work, args=('Process 1', 2))
   process2 = multiprocessing.Process(target=do_work, args=('Process 2', 3))

   process1.start()
   process2.start()

   process1.join()
   process2.join()

   print("All processes finished!")