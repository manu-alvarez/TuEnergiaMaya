from PIL import Image, ImageDraw, ImageFont

tasks = [
    {"file": "dog.png", "text": "OC"},
    {"file": "monkey.png", "text": "CHUEN"},
    {"file": "eagle.png", "text": "MEN"},
    {"file": "mirror.png", "text": "ETZNAB"},
    {"file": "storm.png", "text": "CAUAC"}
]

font_path = "cinzel_bold.ttf"
# Adjusted size slightly smaller to fit longer names like "ETZNAB"
font_size = 70 
try:
    font = ImageFont.truetype(font_path, font_size)
except:
    print("Font not found, using default")
    font = ImageFont.load_default()

text_color = "#E5C578" # Goldish

base_path = "frontend/public/assets/art_seals/"

# Using the box from debug
# box = (400, 80, 624, 180)
# Center X = 512. Center Y approx 130.

for task in tasks:
    img_path = base_path + task["file"]
    try:
        img = Image.open(img_path).convert("RGBA")
        
        # 1. Erase: Copy patch from left
        # We take a patch from x=150 to x=374 (width 224), same y=80-180
        # This is closer to the center than 100, less risk of edge artifacts
        patch_width = 624 - 400
        patch_height = 180 - 80
        patch = img.crop((150, 80, 150 + patch_width, 180))
        
        # Paste patch over the text box
        img.paste(patch, (400, 80))
        
        # 2. Draw text
        draw = ImageDraw.Draw(img)
        
        bbox = font.getbbox(task["text"])
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Center of box is (512, 130)
        x = 512 - text_width / 2
        y = 130 - text_height / 1.5 - 10 # -10 nudging up slightly
        
        # Shadow
        shadow_color = (0, 0, 0, 180)
        draw.text((x+2, y+2), task["text"], font=font, fill=shadow_color)
        
        # Main text
        draw.text((x, y), task["text"], font=font, fill=text_color)
        
        img.save(img_path)
        print(f"Fixed {task['file']}")
    except Exception as e:
        print(f"Failed to fix {task['file']}: {e}")
