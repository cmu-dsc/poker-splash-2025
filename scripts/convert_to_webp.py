from PIL import Image
import os
from pathlib import Path

def convert_to_webp(source_path, output_path=None, quality=80):
    """
    Convert an image to WebP format.
    
    Args:
        source_path (str): Path to source image
        output_path (str, optional): Path to output image. If None, uses source path with .webp extension
        quality (int): Quality of WebP image (0-100)
    """
    try:
        # Open the image
        img = Image.open(source_path)
        
        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'LA'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1])
            img = background
        
        # Create output path if not provided
        if output_path is None:
            output_path = str(Path(source_path).with_suffix('.webp'))
        
        # Save as WebP
        img.save(output_path, 'webp', quality=quality)
        print(f"Converted: {source_path} -> {output_path}")
        
    except Exception as e:
        print(f"Error converting {source_path}: {str(e)}")

def bulk_convert_to_webp(input_dir, output_dir=None, quality=80):
    """
    Convert all images in a directory to WebP format.
    
    Args:
        input_dir (str): Input directory containing images
        output_dir (str, optional): Output directory for WebP images
        quality (int): Quality of WebP images (0-100)
    """
    # Create output directory if it doesn't exist
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    
    # Supported image formats
    supported_formats = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff'}
    
    # Process each file in the input directory
    for filename in os.listdir(input_dir):
        file_path = os.path.join(input_dir, filename)
        if os.path.isfile(file_path):
            file_ext = Path(filename).suffix.lower()
            if file_ext in supported_formats:
                if output_dir:
                    output_path = os.path.join(output_dir, 
                                             Path(filename).stem + '.webp')
                else:
                    output_path = None
                convert_to_webp(file_path, output_path, quality)

if __name__ == "__main__":
    # Example usage for single file conversion
    # convert_to_webp('path/to/image.jpg')
    
    # Example usage for bulk conversion
    bulk_convert_to_webp('../public/images/team', '../public/images/team')