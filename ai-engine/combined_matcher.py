from matcher import compare_persons
from photo_matching import compare_photos


def get_combined_match(missing, found, missing_photo=None, found_photo=None):

    # Get attribute matching score
    attribute_result = compare_persons(missing, found)
    attribute_score = attribute_result["confidence_score"]

    # If both photos are available
    if missing_photo and found_photo:

        photo_result = compare_photos(missing_photo, found_photo)
        photo_score = photo_result["photo_similarity_score"]

        # Combine both scores
        final_score = (attribute_score * 0.80) + (photo_score * 0.20)

    else:
        # Use attribute score if photos are unavailable
        photo_score = None
        final_score = attribute_score

    final_score = round(final_score, 2)

    # Determine match status
    if final_score >= 70:
        status = "Potential Match"
    elif final_score >= 50:
        status = "Needs Review"
    else:
        status = "Low Similarity"

    return {
        "attribute_score": attribute_score,
        "photo_score": photo_score,
        "overall_similarity_score": final_score,
        "status": status,
        "requires_human_verification": True
    }