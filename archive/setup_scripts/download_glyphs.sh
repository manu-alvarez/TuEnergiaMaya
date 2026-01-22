#!/bin/bash

# Directory for glyphs
OUT_DIR="/Users/manu/Desktop/TuEnergiaMaya/frontend/public/assets/glyphs"
mkdir -p "$OUT_DIR"

# Mapping of image numbers to English names
declare -A mapping=(
    ["082"]="dragon"
    ["084"]="wind"
    ["086"]="night"
    ["088"]="seed"
    ["090"]="serpent"
    ["092"]="worldbridger"
    ["094"]="hand"
    ["096"]="star"
    ["098"]="moon"
    ["100"]="dog"
    ["102"]="monkey"
    ["104"]="human"
    ["106"]="skywalker"
    ["108"]="wizard"
    ["110"]="eagle"
    ["112"]="warrior"
    ["114"]="earth"
    ["116"]="mirror"
    ["118"]="storm"
    ["120"]="sun"
)

USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
REFERER="https://13lunas.net/tutorial/tutorial.html"

for code in "${!mapping[@]}"; do
    filename="${mapping[$code]}.png"
    url="https://13lunas.net/tutorial/tutorial13lunas_/image${code}.png"
    
    echo "Downloading $filename from $url..."
    curl -A "$USER_AGENT" -e "$REFERER" -o "$OUT_DIR/$filename" "$url"
    
    # Wait 2 seconds to avoid being blocked
    sleep 2
done

echo "Download complete."
ls -lh "$OUT_DIR"
