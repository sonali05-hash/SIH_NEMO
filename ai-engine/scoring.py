def calculate_score(name_score, age_score, gender_score,
                    location_score, description_score):

    weights = {
        "name": 30,
        "age": 15,
        "gender": 10,
        "location": 25,
        "description": 20
    }

    scores = {
        "name": name_score,
        "age": age_score,
        "gender": gender_score,
        "location": location_score,
        "description": description_score
    }

    total_weight = 0
    weighted_score = 0

    for field, score in scores.items():
        if score is not None:
            weighted_score += score * weights[field]
            total_weight += weights[field]

    if total_weight == 0:
        return 0

    return round(weighted_score / total_weight, 2)