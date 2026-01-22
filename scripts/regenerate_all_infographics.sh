#!/bin/bash
# Regenerate all 260 Tzolkin infographics with the new premium texts
# Run from project root: bash scripts/regenerate_all_infographics.sh

echo "🎨 Starting regeneration of 260 Tzolkin infographics..."
echo "This will take approximately 15-20 minutes."
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Counter for progress
count=0
total=260

# Loop through all 260 Kines
for kin in {1..260}
do
    count=$((count + 1))
    echo "[$count/$total] Generating Kin $kin..."
    node "$SCRIPT_DIR/generate-hybrid.js" $kin
    
    # Add a small delay to avoid overwhelming the system
    sleep 0.5
done

echo ""
echo "✅ All 260 infographics have been regenerated!"
echo "📁 Check: frontend/public/assets/infographies/"
