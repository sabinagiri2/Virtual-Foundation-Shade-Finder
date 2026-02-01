from flask import Flask, request, jsonify, send_from_directory, render_template, redirect, url_for, session
from flask_cors import CORS  # Import CORS
from skincomplexity import classify_skin_tone, suggest_foundation  # Import the necessary functions

app = Flask(__name__, static_folder='frontend', template_folder='frontend') 
app.secret_key = 'your_secret_key'  # Required for session management
# Enable CORS for all routes
CORS(app)

@app.route('/')
def index():
    return render_template('Frontpage.html')

@app.route('/UserInteraction')
def user_interaction():
    return render_template('UserInteraction.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/images/<path:filename>')
def images(filename):
    return send_from_directory('images', filename)

def calculate_average_rgb(rgb_list, total_count):
    total_r = total_g = total_b = 0
    for rgb in rgb_list:
        total_r += rgb[0]
        total_g += rgb[1]
        total_b += rgb[2]
    avg_r = round(total_r / total_count) if total_count > 0 else 0
    avg_g = round(total_g / total_count) if total_count > 0 else 0
    avg_b = round(total_b / total_count) if total_count > 0 else 0
    return avg_r, avg_g, avg_b

@app.route('/upload-rgb', methods=['POST'])
def upload_rgb():
    data = request.get_json()
    rgb_data = data.get('rgbList', [])
    total_count = data.get('totalCount', len(rgb_data))

    print("Received RGB data:", rgb_data)
    print("Total pixel count:", total_count)
    
    avg_r, avg_g, avg_b = calculate_average_rgb(rgb_data, total_count)
    print(f"Calculated Rounded Average RGB: R={avg_r}, G={avg_g}, B={avg_b}")
    
    skin_tone = classify_skin_tone((avg_r, avg_g, avg_b))
    foundation_suggestions = suggest_foundation(skin_tone)
    
    print(f"Skintone of the selected part", skin_tone)
    print("Suggested Foundation", foundation_suggestions)
    
    session['skin_tone'] = skin_tone
    session['foundation_suggestions'] = foundation_suggestions

    return jsonify({
        "status": "success",
        "message": "RGB data received and processed.",
        "average_rgb": {
            "average_red": avg_r,
            "average_green": avg_g,
            "average_blue": avg_b
        },
        "skin_tone": skin_tone,
        "foundation_suggestions": foundation_suggestions
    })

@app.route('/result')
def result():


    # Get session data, default to 'Unknown' or empty list if not found
    skin_tone = session.get('skin_tone', 'Unknown')
    foundation_suggestions = session.get('foundation_suggestions', [])

    # Only clear session data after rendering the result page successfully
    rendered_page = render_template('result.html', skin_tone=skin_tone, foundation_suggestions=foundation_suggestions)
    
    # Now we can clear the session data after rendering
    session.pop('skin_tone', None)
    session.pop('foundation_suggestions', None)
    
    return rendered_page


if __name__ == '__main__':
    app.run(debug=True)
