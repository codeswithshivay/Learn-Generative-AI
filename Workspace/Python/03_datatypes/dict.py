# a = ["Shivay", "Kapoor"]
# print(a[1])

user = {
  "first_name": "Shivay",
  "last_name": "Kapoor",
  "bio_data":{
    "age": 21,
    "education": "High School"
  }
}

print("First Name: ", user.get("first_nam", 0))
print("  " in user)