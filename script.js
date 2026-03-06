// -----------------------------
// API URL
// -----------------------------
const API_URL = "/predict";

// DOM Elements
const fileInput = document.getElementById("fileInput");
const dropzone = document.getElementById("dropzone");
const imagePreview = document.getElementById("image-preview");
const imagePreviewContainer = document.getElementById("image-preview-container");
const fileNameDisplay = document.getElementById("fileNameDisplay");
const resultSection = document.getElementById("result-section");
const diseaseCard = document.getElementById("disease-card");
const loadingSpinner = document.getElementById("loading-spinner");
const predictButton = document.getElementById("predict-button");
const resetButton = document.getElementById("reset-button");

const customAlertBackdrop = document.getElementById("custom-alert-backdrop");
const customAlertMessage = document.getElementById("custom-alert-message");
const alertOkButton = document.getElementById("alert-ok-button");

const diseaseNameTa = document.getElementById("disease-name-ta");
const remedyTa = document.getElementById("remedy-ta");

const langButtons = document.querySelectorAll(".lang-button");
const browseBtn = document.getElementById("browse-files-button");

// -----------------------------
// Language Dictionary
// -----------------------------
const dictionary = {
  ta: {
    "nav-home": "முகப்பு",
    "nav-detect": "கண்டறிதல்",
    "nav-history": "வரலாறு",
    "nav-about": "நோய் பற்றி",
    "hero-title": "உங்கள் தென்னை பயிர்களைப் பாதுகாக்கவும்",
    "hero-subtitle":
      "AI மூலம் நொடிகளில் பகுப்பாய்வு. புகைப்படத்தைப் பதிவேற்றி, உடனடியாக முடிவுகளையும் சிகிச்சை பரிந்துரைகளையும் பெறுங்கள்.",
    "hero-cta": "இலவச ஆய்வைத் தொடங்கவும்",
    "feature-1-title": "AI மூலம் கண்டறிதல்",
    "feature-1-desc": "தென்னை நோய்களை உடனடியாகவும் துல்லியமாகவும் கண்டறியும்.",
    "feature-2-title": "உடனடி சிகிச்சை",
    "feature-2-desc": "விரைவான நடவடிக்கைக்கு ஏற்ற சிகிச்சை திட்டங்களைப் பெறுங்கள்.",
    "feature-3-title": "எளிமையானது மற்றும் வேகமானது",
    "feature-3-desc": "ஒரு படத்தைப் பதிவேற்றினால் போதும்—சிக்கலான அமைப்பு தேவையில்லை.",
    "det-heading": "நோய் கண்டறிதல் (Detection)",
    "det-subheading":
      "வேர் அழுகல் நோயைக் கண்டறிய தென்னை வேர்கள் அல்லது மரத்தின் ஒரு படத்தைப் பதிவேற்றவும்.",
    "browse-files-button": "கோப்புகளைத் தேர்க",
    "take-photo-button": "படம் எடுக்கவும்",
    "dropzone-text-1": "தென்னை வேர்/மரம் படத்தை இழுத்து விடவும் அல்லது கிளிக் செய்யவும்",
    "dropzone-text-2": "JPG, PNG • அதிகபட்சம் 10MB",
    "predict-button": "AI மூலம் கண்டறிக",
    "result-heading": "கண்டறிதல் முடிவு",
    "detected-disease-label": "கண்டறியப்பட்ட நோய்:",
    "confidence-label": "துல்லியம் (Confidence Score):",
    "remedy-label": "பரிந்துரைக்கப்பட்ட சிகிச்சை/மேலாண்மை:",
    "reset-button": "மீண்டும் தொடங்கு",
    "loading-text": "AI மூலம் கண்டறியப்படுகிறது... காத்திருக்கவும்...",
    "alert-title": "எச்சரிக்கை",
    "alert-ok-button": "சரி",
    "alert-upload-image": "தயவுசெய்து முதலில் ஒரு படத்தைப் பதிவேற்றவும்.",
    "alert-server-error":
      "சேவையகத்தை அணுக முடியவில்லை. Flask Backend இயங்குகிறதா சரிபார்க்கவும்.",
    "his-heading": "வரலாறு",
    "his-content": "இந்த பிரிவில் உங்கள் கண்டறிதல் முடிவுகளின் வரலாறு சேமிக்கப்படும்.",
    "abt-heading": "தென்னை நோய்கள் பற்றிய தகவல்",
    "rwd-about-heading": "தென்னை வேர் அழுகல் நோய் (Root Wilt Disease - RWD)",
    "rwd-cause-title": "காரணம் மற்றும் பரவுதல்",
    "rwd-cause-content": `<p>Root Wilt Disease is caused by phytoplasmas and spread by insect vectors.</p>`,
    "rwd-symptoms-title": "முக்கிய அறிகுறிகள்",
    "rwd-symptoms-content": [
      "இலைகள் வாடுதல் மற்றும் தொங்குதல்",
      "மஞ்சள் நிறமாக மாறுதல்",
      "விளைச்சல் குறைதல்",
    ],
    "rwd-impact-title": "தாக்கம் மற்றும் மேலாண்மை",
    "rwd-impact-content": `<p>Use resistant varieties and proper nutrition management.</p>`,
  },

  en: {
    "nav-home": "Home",
    "nav-detect": "Detect",
    "nav-history": "History",
    "nav-about": "About Disease",
    "hero-title": "Protect Your Coconut Crops",
    "hero-subtitle":
      "AI-powered analysis in seconds. Upload a photo, get instant results and treatment recommendations.",
    "hero-cta": "Start Free Analysis",
    "feature-1-title": "AI-Powered Detection",
    "feature-1-desc": "Instant and accurate identification of coconut diseases.",
    "feature-2-title": "Instant Remedies",
    "feature-2-desc": "Get tailored, practical treatment plans for quick action.",
    "feature-3-title": "Simple & Fast",
    "feature-3-desc": "Just upload an image—no complicated setup required.",
    "det-heading": "Disease Detection",
    "det-subheading":
      "Upload an image of coconut roots or tree to detect root wilt disease.",
    "browse-files-button": "Browse Files",
    "take-photo-button": "Take Photo",
    "dropzone-text-1": "Drop coconut root/tree image or click to browse",
    "dropzone-text-2": "JPG, PNG • Max 10MB",
    "predict-button": "Detect with AI",
    "result-heading": "Detection Result",
    "detected-disease-label": "Detected Disease:",
    "confidence-label": "Confidence Score:",
    "remedy-label": "Recommended Treatment/Management:",
    "reset-button": "Start Over",
    "loading-text": "Detecting with AI... Please wait...",
    "alert-title": "Attention",
    "alert-ok-button": "OK",
    "alert-upload-image": "Please upload an image first.",
    "alert-server-error":
      "Could not connect to prediction server. Please check if your Flask Backend is running.",
    "his-heading": "History",
    "his-content":
      "This section will store and display the history of your detection results.",
    "abt-heading": "Information About Coconut Diseases",
    "rwd-about-heading": "Coconut Root Wilt Disease (RWD)",
    "rwd-cause-title": "Cause and Transmission",
    "rwd-cause-content": `<p>Root Wilt Disease is caused by phytoplasmas and spread by insect vectors.</p>`,
    "rwd-symptoms-title": "Key Symptoms",
    "rwd-symptoms-content": [
      "Wilting and drooping leaves",
      "Yellowing of foliage",
      "Reduced yield",
    ],
    "rwd-impact-title": "Impact and Management",
    "rwd-impact-content": `<p>Use resistant varieties and proper nutrient management.</p>`,
  },
};

let currentLang = "en";

// -----------------------------
// Language functions
// -----------------------------
function updateText(lang) {
  currentLang = lang;
  const texts = dictionary[lang];
  document.documentElement.lang = lang;

  for (const id in texts) {
    const element = document.getElementById(id);
    if (!element) continue;

    if (id.startsWith("rwd-") && id.endsWith("-content")) {
      if (Array.isArray(texts[id])) {
        element.innerHTML = texts[id].map((item) => `<li>${item}</li>`).join("");
      } else {
        element.innerHTML = texts[id];
      }
    } else {
      element.textContent = texts[id];
    }
  }

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  localStorage.setItem("cocoGuardLang", lang);
  updateResultLanguage();
}

function updateResultLanguage() {
  if (!resultSection.classList.contains("hidden")) {
    if (currentLang === "en") {
      diseaseNameTa.classList.add("hidden");
      remedyTa.classList.add("hidden");
    } else {
      diseaseNameTa.classList.remove("hidden");
      remedyTa.classList.remove("hidden");
    }
  }
}

// -----------------------------
// Custom Alert
// -----------------------------
function showCustomAlert(messageKey) {
  const texts = dictionary[currentLang];
  const enMessage = dictionary["en"][messageKey] || "Error";
  const taMessage = dictionary["ta"][messageKey] || "பிழை";

  const message =
    currentLang === "ta" ? `${taMessage} (${enMessage})` : `${enMessage} (${taMessage})`;

  document.getElementById("alert-title").innerHTML =
    `<i class="fas fa-exclamation-triangle mr-2"></i> ${texts["alert-title"]}`;

  alertOkButton.textContent = texts["alert-ok-button"];
  customAlertMessage.textContent = message;

  customAlertBackdrop.classList.remove("hidden");
  customAlertBackdrop.classList.add("flex");
}

function hideCustomAlert() {
  customAlertBackdrop.classList.add("hidden");
  customAlertBackdrop.classList.remove("flex");
}

// -----------------------------
// Drag & Drop
// -----------------------------
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropzone.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach((eventName) => {
  dropzone.addEventListener(eventName, () => dropzone.classList.add("drag-over"), false);
});

["dragleave", "drop"].forEach((eventName) => {
  dropzone.addEventListener(eventName, () => dropzone.classList.remove("drag-over"), false);
});

dropzone.addEventListener("drop", handleDrop, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDrop(e) {
  const files = e.dataTransfer.files;
  fileInput.files = files;
  previewImage({ target: fileInput });
}

// -----------------------------
// Preview image
// -----------------------------
function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    imagePreview.src = e.target.result;
    imagePreviewContainer.classList.remove("hidden");
    fileNameDisplay.textContent = file.name;
    resultSection.classList.add("hidden");
  };
  reader.readAsDataURL(file);
}

// -----------------------------
// Theme
// -----------------------------
function applyResultTheme(diseaseNameEn) {
  resultSection.classList.remove("theme-healthy", "theme-disease");

  if (diseaseNameEn === "Healthy Images") {
    resultSection.classList.add("theme-healthy");
  } else {
    resultSection.classList.add("theme-disease");
  }
}

// -----------------------------
// Upload & Predict
// -----------------------------
async function uploadImage() {
  const file = fileInput.files[0];
  if (!file) {
    showCustomAlert("alert-upload-image");
    return;
  }

  predictButton.disabled = true;
  loadingSpinner.classList.remove("hidden");
  resultSection.classList.add("hidden");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      showCustomAlert("alert-server-error");
      return;
    }

    const result = await response.json();

    if (result.disease_en === "Invalid / Not Coconut Leaf") {
      customAlertMessage.textContent =
        currentLang === "ta"
          ? "❌ தவறான படம். தயவுசெய்து தெளிவான தேங்காய் இலை படத்தை பதிவேற்றவும்."
          : "❌ Invalid image. Please upload a clear coconut leaf image.";
      customAlertBackdrop.classList.remove("hidden");
      customAlertBackdrop.classList.add("flex");
      return;
    }

    applyResultTheme(result.disease_en);

    document.getElementById("disease-name-ta").textContent = result.disease_ta;
    document.getElementById("disease-name-en").textContent = result.disease_en;
    document.getElementById("confidence-score").textContent = result.confidence;
    document.getElementById("remedy-ta").textContent = result.remedy_ta;
    document.getElementById("remedy-en").textContent = result.remedy_en;

    resultSection.classList.remove("hidden");
    updateResultLanguage();
  } catch (err) {
    console.error(err);
    showCustomAlert("alert-server-error");
  } finally {
    predictButton.disabled = false;
    loadingSpinner.classList.add("hidden");
  }
}

// -----------------------------
// Reset
// -----------------------------
function resetApp() {
  fileInput.value = "";
  imagePreview.src = "";
  imagePreviewContainer.classList.add("hidden");
  resultSection.classList.add("hidden");
  loadingSpinner.classList.add("hidden");
  fileNameDisplay.textContent = "";
  predictButton.disabled = false;
}

// -----------------------------
// Events
// -----------------------------
browseBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", previewImage);
predictButton.addEventListener("click", uploadImage);
resetButton.addEventListener("click", resetApp);
alertOkButton.addEventListener("click", hideCustomAlert);

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setLanguage(btn.getAttribute("data-lang"));
  });
});

function setLanguage(lang) {
  updateText(lang);
}

// -----------------------------
// Init
// -----------------------------
window.onload = function () {
  const storedLang = localStorage.getItem("cocoGuardLang") || "en";
  updateText(storedLang);
  hideCustomAlert();
};

