from combined_matcher import get_combined_match

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

result = get_combined_match(
    missing_person,
    found_person,
    "sample1.jpg",
    "sample2.jpg"
)

print("\n--- NEMO COMBINED AI RESULTS ---")

for key, value in result.items():
    print(f"{key}: {value}")