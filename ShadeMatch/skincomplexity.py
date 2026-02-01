# Define function to classify skin tone based on RGB values
def classify_skin_tone(rgb):
    r, g, b = rgb

    if 240 <= r <= 255 and 200 <= g <= 230 and 185 <= b <= 210:
        return "Fair Skin"
    elif 220 <= r <= 240 and 180 <= g <= 210 and 160 <= b <= 190:
        return "Light Skin"
    elif 180 <= r <= 210 and 140 <= g <= 180 and 120 <= b <= 150:
        return "Medium Skin"
    elif 170 <= r <= 195 and 130 <= g <= 160 and 110 <= b <= 135:
        return "Olive Skin"
    elif 110 <= r <= 160 and 80 <= g <= 130 and 60 <= b <= 110:
        return "Dark Skin"
    elif 60 <= r <= 120 and 40 <= g <= 100 and 30 <= b <= 80:
        return "Deep Dark Skin"
    else:
        return "Unknown Skin Tone"

# Map skin tones to foundation shades and brand names
def suggest_foundation(skin_tone):
    foundation_suggestions = {
        "Fair Skin": [
            {"shade": "Ivory", "brand": "Maybelline","image": "/images/ivory.jpg"},
            {"shade": "Porcelain", "brand": "L'Oreal","image": "/images/porcelain.jpg"},
            {"shade": "Alabaster", "brand": "NARS","image": "/images/alabaster.jpg"}
        ],
        "Light Skin": [
            {"shade": "Beige", "brand": "MAC","image":"/images/beige.jpg"},
            {"shade": "Warm Sand", "brand": "Bobbi Brown","image": "/images/warmsand.jpg"},
            {"shade": "Light Honey", "brand": "Estée Lauder","image": "/images/lighthoney.jpg"}
        ],
        "Medium Skin": [
            {"shade": "Natural Beige", "brand": "Fenty Beauty","image": "/images/naturalbeige.jpg"},
            {"shade": "Golden Medium", "brand": "BareMinerals","image": "/images/mediumgolden.jpg"},
            {"shade": "Medium Tan", "brand": "Too Faced","image": "/images/mediumtan.jpg"}
        ],
        "Olive Skin": [
            {"shade": "Olive Medium", "brand": "Huda Beauty","image": "/images/oliviemedium.jpg"},
            {"shade": "Golden Olive", "brand": "NARS","image": "/images/goldenolive.jpg"},
            {"shade": "Tan", "brand": "MAC","image": "/images/tan.jpg"}
        ],
        "Dark Skin": [
            {"shade": "Deep Bronze", "brand": "Fenty Beauty","image": "/images/deepbronze.jpg"},
            {"shade": "Cocoa", "brand": "Lancôme","image": "/images/cocoa.jpg"},
            {"shade": "Mocha", "brand": "Revlon","image": "/images/mocha.jpg"}
        ],
        "Deep Dark Skin": [
            {"shade": "Espresso", "brand": "Black Opal","image": "/images/espresso.jpg"},
            {"shade": "Ebony", "brand": "Estée Lauder","image": "/images/ebony.jpg"},
            {"shade": "Rich Mahogany", "brand": "Iman","image": "/images/richmaho.jpg"}
        ]
    }
    
    return foundation_suggestions.get(skin_tone, [{"shade": "No suggestions available", "brand": "N/A", "image": "/images/no_suggestions.jpg"}])

