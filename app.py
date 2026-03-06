from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS

import torch
from PIL import Image
from torchvision import transforms
import timm
import torch.nn.functional as F

# -----------------------------
# 🌴 Disease Classes
# -----------------------------
classes_en = [
    'Bud Root Dropping',
    'Bud Rot',
    'Gray Leaf Spot',
    'Leaf Rot',
    'Stem Bleeding'
]

classes_ta = [
    'மொட்டின் வேர் விழுதல்',
    'மொட்டுச் சிதைவு',
    'சாம்பல் இலைப் புள்ளி',
    'இலைச் சிதைவு',
    'தண்டு இரத்தக்கசிவு'
]

# -----------------------------
# 💊 Remedies
# -----------------------------
remedies = {
    'Bud Root Dropping': {
        'English': "Use balanced fertilizer and ensure proper soil drainage.",
        'Tamil': "சமநிலை உரம் பயன்படுத்தி மண்ணின் வடிகட்டலை சரியாக வைத்திருக்கவும்."
    },
    'Bud Rot': {
        'English': "Apply Bordeaux mixture (1%) to infected areas and improve drainage.",
        'Tamil': "பாதிக்கப்பட்ட பகுதிகளில் 1% போர்டோ கலவைப் பூசவும்."
    },
    'Gray Leaf Spot': {
        'English': "Spray copper oxychloride (0.3%) or mancozeb (0.25%).",
        'Tamil': "0.3% காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்."
    },
    'Leaf Rot': {
        'English': "Remove affected leaves and spray Tridemorph (0.1%).",
        'Tamil': "பாதிக்கப்பட்ட இலைகளை அகற்றி பூஞ்சை மருந்து தெளிக்கவும்."
    },
    'Stem Bleeding': {
        'English': "Scrape infected bark and apply Bordeaux paste.",
        'Tamil': "பாதிக்கப்பட்ட பட்டையை உரசி போர்டோ பேஸ்ட் பூசவும்."
    }
}

# -----------------------------
# ⚙️ Device
# -----------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# -----------------------------
# 🧠 Load Model
# -----------------------------
MODEL_PATH = "coconut_disease_best_model_disease.pth"
THRESHOLD = 0.65

model = timm.create_model("mobilevit_s", pretrained=False, num_classes=len(classes_en))
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.to(device)
model.eval()

# -----------------------------
# 🖼️ Transform
# -----------------------------
transform = transforms.Compose([
    transforms.Resize((256,256)),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.5,0.5,0.5],[0.5,0.5,0.5])
])

# -----------------------------
# 🌐 Flask
# -----------------------------
app = Flask(__name__)
CORS(app)

# Home page
@app.route("/")
def home():
    return send_file("index.html")

# CSS
@app.route("/style.css")
def css():
    return send_from_directory(".", "style.css")

# JS
@app.route("/script.js")
def js():
    return send_from_directory(".", "script.js")

# -----------------------------
# 🔍 Prediction
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    try:
        image = Image.open(file.stream).convert("RGB")
    except:
        return jsonify({"error": "Invalid image"}), 400

    image_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        logits = model(image_tensor)
        probs = F.softmax(logits, dim=1)
        confidence, predicted = torch.max(probs, dim=1)

    confidence_val = confidence.item()
    confidence_pct = round(confidence_val * 100, 2)

    if confidence_val < THRESHOLD:
        return jsonify({
            "disease_en": "Invalid / Not Coconut Leaf",
            "disease_ta": "தவறான படம் / தேங்காய் இலை இல்லை",
            "remedy_en": "Please upload a clear coconut leaf image.",
            "remedy_ta": "தயவுசெய்து தெளிவான தேங்காய் இலை படத்தை பதிவேற்றவும்.",
            "confidence": f"{confidence_pct}%"
        })

    idx = predicted.item()

    disease_en = classes_en[idx]
    disease_ta = classes_ta[idx]

    return jsonify({
        "disease_en": disease_en,
        "disease_ta": disease_ta,
        "remedy_en": remedies[disease_en]["English"],
        "remedy_ta": remedies[disease_en]["Tamil"],
        "confidence": f"{confidence_pct}%"
    })

if __name__ == "__main__":
    app.run()
