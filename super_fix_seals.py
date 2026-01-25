import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps, ImageChops

# Configuration
BASE_PATH = "frontend/public/assets/art_seals/"
FONT_PATH = "cinzel_bold.ttf"
FONT_SIZE = 75
DONORS = {
    "LIGHT": "wind.png",   # Source for White/Light backgrounds
    "DARK": "night.png"    # Source for Dark/Blue backgrounds
}
TASKS = [
    {"file": "dog.png", "text": "OC", "type": "LIGHT", "tint": None},
    {"file": "mirror.png", "text": "ETZNAB", "type": "LIGHT", "tint": "#E0FFFF"}, # Cyan tint
    {"file": "storm.png", "text": "CAUAC", "type": "DARK", "tint": "#202060"}, # Blue tint
    {"file": "eagle.png", "text": "MEN", "type": "DARK", "tint": "#4682B4"}, # Steel Blue
    {"file": "monkey.png", "text": "CHUEN", "type": "DARK", "tint": "#191970"} # Midnight Blue
]

def create_gold_text(text, font, base_texture):
    """Creates a text image with gold texture and bevel effect."""
    dummy_draw = ImageDraw.Draw(Image.new("RGBA", (1,1)))
    bbox = dummy_draw.textbbox((0,0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    size = (text_width + 60, text_height + 60)
    text_mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(text_mask)
    d.text((30, 15), text, font=font, fill=255)
    
    # Gold Gradient Fill
    gold_grad = Image.new("RGBA", size, "#FFD700")
    draw_grad = ImageDraw.Draw(gold_grad)
    for i in range(size[1]):
        ratio = i / size[1]
        r = int(218 + (255-218)*ratio)
        g = int(165 + (223-165)*ratio)
        b = int(32 + (0-32)*ratio)
        draw_grad.line((0, i, size[0], i), fill=(r,g,b,255))

    # Pattern from texture (safely cropped)
    tw, th = base_texture.size
    crop_x, crop_y = (tw - size[0]) // 2, th - 300 
    texture_crop = base_texture.crop((crop_x, crop_y, crop_x + size[0], crop_y + size[1]))
    
    fill = Image.blend(gold_grad, texture_crop, 0.40)
    
    final_text = Image.new("RGBA", size, (0,0,0,0))
    final_text.paste(fill, (0,0), mask=text_mask)
    
    # Drop Shadow 
    shadow_layer = Image.new("RGBA", size, (0,0,0,0))
    ds = ImageDraw.Draw(shadow_layer)
    ds.text((34, 19), text, font=font, fill=(0,0,0, 180)) 
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(6))
    
    return final_text, shadow_layer, size

def get_clean_header(donor_name):
    """
    Loads a donor image and cleans its header (top 200px) by patching the center data.
    """
    path = os.path.join(BASE_PATH, donor_name)
    if not os.path.exists(path):
        raise Exception(f"Donor {donor_name} not found")
        
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    
    # Crop Header
    header_h = 220
    header = img.crop((0, 0, width, header_h))
    
    l_clean = header.crop((0, 0, 450, header_h))
    r_clean = header.crop((width-450, 0, width, header_h))
    
    l_stretch = l_clean.resize((512 + 50, header_h), Image.BICUBIC)
    r_stretch = r_clean.resize((512 + 50, header_h), Image.BICUBIC)
    
    # Composite
    master = Image.new("RGBA", (width, header_h))
    master.paste(l_stretch, (0, 0))
    
    # Blend the right side over
    mask_r = Image.new("L", (512 + 50, header_h), 0)
    d_m = ImageDraw.Draw(mask_r)
    # Gradient fade in from 0 to 100
    for i in range(100):
        d_m.line((i, 0, i, header_h), fill=int(i*2.55))
    d_m.rectangle((100, 0, 562, header_h), fill=255)
    
    master.paste(r_stretch, (width - (512 + 50), 0), mask=mask_r)
    
    return master

def apply_tint(image, color):
    """Tints a grayscale/colored image towards a target color."""
    if not color:
        return image
    overlay = Image.new("RGBA", image.size, color)
    return Image.blend(image, overlay, 0.4) 

def fix_seal(task):
    img_path = os.path.join(BASE_PATH, task["file"])
    if not os.path.exists(img_path):
        print(f"Skipping {task['file']}")
        return
        
    try:
        # Load Target
        target = Image.open(img_path).convert("RGBA")
        width, height = target.size
        
        # Load Clean Header
        donor_file = DONORS[task["type"]]
        header = get_clean_header(donor_file)
        
        # Apply Tint if needed
        if task["tint"]:
            header = apply_tint(header, task["tint"])
            
        # Composite Header onto Target
        h_w, h_h = header.size
        mask = Image.new("L", (h_w, h_h), 255)
        d_mask = ImageDraw.Draw(mask)
        # Gradient at bottom 50px
        for i in range(50):
            y = h_h - 50 + i
            val = 255 - int(i * 5.1)
            d_mask.line((0, y, h_w, y), fill=val)
            
        target.paste(header, (0, 0), mask=mask)
        
        # Draw Text
        font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
        text_img, shadow_img, t_size = create_gold_text(task["text"], font, target)
        
        tx = (width - t_size[0]) // 2
        ty = 100 # Standardizing Header Text Pos
        
        target.paste(shadow_img, (tx, ty), mask=shadow_img)
        target.paste(text_img, (tx, ty), mask=text_img)
        
        target.save(img_path)
        print(f"Fixed {task['file']} using {donor_file}")
        
    except Exception as e:
        print(f"Error {task['file']}: {e}")

if __name__ == "__main__":
    print("Starting Texture Transplant...")
    for task in TASKS:
        fix_seal(task)
    print("Done.")
