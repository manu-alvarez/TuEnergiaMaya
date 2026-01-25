from PIL import Image, ImageDraw

# Load Dog seal
img_path = "frontend/public/assets/art_seals/dog.png"
try:
    img = Image.open(img_path)
    draw = ImageDraw.Draw(img)
    
    # Guess coordinates for Top Text
    # Center X = 512. Region roughly 300px wide, 100px high?
    # Let's try defining a box centered at top
    # x1=362, y1=60, x2=662, y2=160
    
    box = [(400, 80), (624, 180)] # Example guess
    
    # Draw red rectangle
    draw.rectangle(box, outline="red", width=5)
    
    img.save("dog_debug.png")
    print("Debug image saved to dog_debug.png")
    
except Exception as e:
    print(f"Error: {e}")
