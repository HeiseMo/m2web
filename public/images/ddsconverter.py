import imageio
from PIL import Image
import os

def convert_dds_to_png(dds_file_path, png_file_path):
    # Read the DDS file
    dds_image = imageio.imread(dds_file_path)

    # Convert to PIL Image
    img = Image.fromarray(dds_image)

    # Save as PNG
    img.save(png_file_path, 'PNG')

def convert_all_dds_in_directory(directory):
    for filename in os.listdir(directory):
        if filename.lower().endswith('.dds'):
            dds_file_path = os.path.join(directory, filename)
            png_file_path = os.path.join(directory, os.path.splitext(filename)[0] + '.png')
            convert_dds_to_png(dds_file_path, png_file_path)
            print(f"Converted {filename} to PNG.")

# Example usage
directory = '.'  # Replace with the path to your directory containing DDS files
convert_all_dds_in_directory(directory)