from PIL import Image
import sys
import os

def crop_transparent_borders(image_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        
        # Get the bounding box of the non-zero regions
        bbox = img.getbbox()
        
        if bbox:
            # Crop the image to the bounding box
            cropped_img = img.crop(bbox)
            # Save it back, overwriting the original or creating a new one
            cropped_img.save(image_path)
            print(f"Successfully cropped {image_path}. New size: {cropped_img.size}")
        else:
            print("Image is completely transparent or empty.")
            
    except Exception as e:
        print(f"Error cropping image: {e}")

if __name__ == "__main__":
    target_file = './public/assets/images/favicon-pro.png'
    if os.path.exists(target_file):
        crop_transparent_borders(target_file)
    else:
        print(f"File not found: {target_file}")
