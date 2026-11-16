import cv2


def compare_photos(image1_path, image2_path):

    # Load both images
    image1 = cv2.imread(image1_path)
    image2 = cv2.imread(image2_path)

    if image1 is None or image2 is None:
        raise ValueError("Could not load one or both images.")

    # Convert images to HSV colour format
    hsv1 = cv2.cvtColor(image1, cv2.COLOR_BGR2HSV)
    hsv2 = cv2.cvtColor(image2, cv2.COLOR_BGR2HSV)

    # Generate colour histograms
    hist1 = cv2.calcHist(
        [hsv1], [0, 1], None, [50, 60], [0, 180, 0, 256]
    )

    hist2 = cv2.calcHist(
        [hsv2], [0, 1], None, [50, 60], [0, 180, 0, 256]
    )

    # Normalize histograms
    cv2.normalize(hist1, hist1)
    cv2.normalize(hist2, hist2)

    # Compare colour distributions
    distance = cv2.compareHist(
        hist1, hist2, cv2.HISTCMP_BHATTACHARYYA
    )

    # Convert distance into a similarity score
    similarity_score = max(0, (1 - distance) * 100)

    return {
        "photo_similarity_score": round(similarity_score, 2),
        "requires_human_verification": True
    }