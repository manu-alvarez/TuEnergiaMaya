#!/usr/bin/env python3
"""
IMPROVED TZOLKIN AUDIT - V2.0
Detects only REAL errors by using word boundaries and exact case matching
Ignores contextual usage like "amor cósmico" or "fuego solar"
"""

import json
import os
import re

# Tzolkin reference data
SEALS = ["Dragón", "Viento", "Noche", "Semilla", "Serpiente",
         "Enlazador", "Mano", "Estrella", "Luna", "Perro",
         "Mono", "Humano", "Caminante", "Mago", "Águila",
         "Guerrero", "Tierra", "Espejo", "Tormenta", "Sol"]

TONES = ["Magnético", "Lunar", "Eléctrico", "Autoexistente", "Entonado",
         "Rítmico", "Resonante", "Galáctico", "Solar", "Planetario",
         "Espectral", "Cristal", "Cósmico"]

COLORS = ["Rojo", "Blanco", "Azul", "Amarillo"]

def get_kin_components(kin_num):
    """Get the seal, tone, and color for a given Kin number"""
    seal_idx = (kin_num - 1) % 20
    tone_idx = (kin_num - 1) % 13
    color_idx = seal_idx % 4
    
    return {
        'seal': SEALS[seal_idx],
        'tone': TONES[tone_idx],
        'color': COLORS[color_idx],
        'full_name': f"{TONES[tone_idx]} {SEALS[seal_idx]} {COLORS[color_idx]}"
    }

def check_kin_text_smart(kin_num, text, seal, tone):
    """
    Smart text checking that avoids false positives
    
    Strategy:
    1. Check if the FULL NAME appears (e.g., "Dragón Resonante Rojo")
    2. Or check if seal AND tone appear as capitalized standalone words
    3. Ignore lowercase contextual usage
    """
    errors = []
    
    # Build regex patterns for exact matching
    # Seal pattern: must be capitalized and followed by word boundary
    seal_pattern = r'\b' + re.escape(seal) + r'\b'
    tone_pattern = r'\b' + re.escape(tone) + r'\b'
    
    # Search in the text (case-sensitive)
    seal_matches = re.findall(seal_pattern, text)
    tone_matches = re.findall(tone_pattern, text)
    
    # Check if correct seal appears
    if not seal_matches:
        errors.append(f"Missing seal '{seal}'")
    
    # Check if correct tone appears
    if not tone_matches:
        errors.append(f"Missing tone '{tone}'")
    
    # Check for WRONG seals (capitalized)
    for wrong_seal in SEALS:
        if wrong_seal != seal:
            wrong_pattern = r'\b' + re.escape(wrong_seal) + r'\b'
            wrong_matches = re.findall(wrong_pattern, text)
            if wrong_matches:
                errors.append(f"WRONG seal '{wrong_seal}' found")
    
    # Check for WRONG tones (capitalized)
    for wrong_tone in TONES:
        if wrong_tone != tone:
            wrong_pattern = r'\b' + re.escape(wrong_tone) + r'\b'
            wrong_matches = re.findall(wrong_pattern, text)
            if wrong_matches:
                errors.append(f"WRONG tone '{wrong_tone}' found")
    
    return errors

def audit_all_kines():
    """Audit all 260 Kines with improved error detection"""
    
    DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'frontend/src/data/dailyData.json')
    
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Error loading data: {e}")
        return
    
    total_kines = 0
    kines_with_errors = 0
    total_errors = 0
    error_details = {}
    
    print("🔍 Starting improved audit...")
    print("=" * 80)
    
    for kin in range(1, 261):
        kin_str = str(kin)
        
        if kin_str not in data:
            print(f"⚠️  Kin {kin} not found in data")
            continue
        
        total_kines += 1
        components = get_kin_components(kin)
        
        # Combine short and long descriptions
        short_desc = data[kin_str].get('short_description', '')
        long_desc = data[kin_str].get('long_description', '')
        full_text = short_desc + ' ' + long_desc
        
        # Check for errors
        errors = check_kin_text_smart(kin, full_text, components['seal'], components['tone'])
        
        if errors:
            kines_with_errors += 1
            total_errors += len(errors)
            error_details[kin] = {
                'expected': components['full_name'],
                'errors': errors
            }
            print(f"❌ Kin {kin} ({components['full_name']}): {', '.join(errors)}")
    
    print("=" * 80)
    print(f"\n📊 IMPROVED AUDIT SUMMARY:")
    print(f"Total Kines Audited: {total_kines}")
    print(f"Kines with Errors: {kines_with_errors}")
    print(f"Total Errors Found: {total_errors}")
    
    if kines_with_errors == 0:
        print(f"\n✅ PERFECTO! All 260 Kines are correct!")
    else:
        print(f"\n❌ ERRORS DETECTED - Review needed")
        print(f"\nKines with errors: {', '.join(map(str, error_details.keys()))}")
    
    # Save detailed report
    with open('audit_report_v2.json', 'w', encoding='utf-8') as f:
        json.dump(error_details, f, ensure_ascii=False, indent=2)
    
    print(f"\n📄 Detailed report saved to: audit_report_v2.json")

if __name__ == '__main__':
    audit_all_kines()
