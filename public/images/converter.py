from PIL import Image
import os

def convert_tga_to_png(input_directory, output_directory):
    # Ensure output directory exists
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Loop through all files in the input directory
    for filename in os.listdir(input_directory):
        if filename.lower().endswith('.tga'):
            tga_file_path = os.path.join(input_directory, filename)
            png_file_path = os.path.join(output_directory, os.path.splitext(filename)[0] + '.png')

            # Load the TGA file and convert it to PNG
            with Image.open(tga_file_path) as img:
                img.save(png_file_path, 'PNG')
            print(f"Converted {filename} to PNG.")

# Example usage
input_dir = '.'  # Current directory for TGA files
output_dir = '.'  # Current directory for output PNG files

convert_tga_to_png(input_dir, output_dir)