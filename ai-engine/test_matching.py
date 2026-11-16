from matcher import compare_persons

missing_person = {
    "name": "Rahul Sharma",
    "age": 24,
    "gender": "Male",
    "location": "Delhi",
    "description": "Blue shirt and black trousers"
}

found_person = {
    "name": "Rahul Kumar Sharma",
    "age": 25,
    "gender": "Male",
    "location": "Delhi",
    "description": "Wearing blue shirt and black pants"
}

result = compare_persons(missing_person, found_person)

print("\n--- NEMO AI MATCHING RESULTS ---")

for key, value in result.items():
    print(f"{key}: {value}")