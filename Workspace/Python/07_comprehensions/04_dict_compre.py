# Video 51

tea_prices_inr = {
    'Masala Chai': 40,
    'Green Tea': 200
}

tea_prices_usd = {key: val / 80 for key, val in tea_prices_inr.items()}
print(tea_prices_usd)