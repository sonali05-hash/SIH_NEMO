import cv2
import numpy as np
from photo_matching import compare_photos

# Create two sample test images
image1 = np.zeros((300, 300, 3), dtype=np.uint8)
image2 = np.zeros((300, 300, 3), dtype=np.uint8)

# Add similar colours to both images
image1[:] = (255, 0, 0)
image2[:] = (255, 0, 0)

# Save sample images
cv2.imwrite("sample1.jpg", image1)
cv2.imwrite("sample2.jpg", image2)

# Compare the images
result = compare_photos("sample1.jpg", "sample2.jpg")

print("\n--- NEMO PHOTO MATCHING RESULTS ---")

for key, value in result.items():
    print(f"{key}: {value}")