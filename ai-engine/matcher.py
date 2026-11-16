from rapidfuzz import fuzz
from scoring import calculate_score


def compare_persons(missing, found):

    # 1. Compare names
    name_score = fuzz.token_set_ratio(
        missing["name"],
        found["name"]
    )

    # 2. Compare ages
    if missing.get("age") is not None and found.get("age") is not None:
        difference = abs(missing["age"] - found["age"])

        if difference <= 1:
            age_score = 100
        elif difference <= 3:
            age_score = 70
        elif difference <= 5:
            age_score = 40
        else:
            age_score = 0
    else:
        age_score = None

    # 3. Compare gender
    if missing.get("gender") and found.get("gender"):
        gender_score = (
            100 if missing["gender"].lower() == found["gender"].lower()
            else 0
        )
    else:
        gender_score = None

    # 4. Compare locations
    if missing.get("location") and found.get("location"):
        location_score = fuzz.token_set_ratio(
            missing["location"],
            found["location"]
        )
    else:
        location_score = None

    # 5. Compare descriptions
    if missing.get("description") and found.get("description"):
        description_score = fuzz.token_set_ratio(
            missing["description"],
            found["description"]
        )
    else:
        description_score = None

    # 6. Calculate overall score
    final_score = calculate_score(
        name_score,
        age_score,
        gender_score,
        location_score,
        description_score
    )

    if final_score >= 70:
        status = "Potential Match"
    elif final_score >= 50:
        status = "Needs Review"
    else:
        status = "Low Similarity"

    return {
        "confidence_score": final_score,
        "status": status,
        "requires_human_verification": True
    }