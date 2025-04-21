import joblib
import pandas as pd
import re

#loading the trained model and feature list
MODEL_PATH="random_forest_model.pkl"
FEATURE_PATH="feature_names.pkl"


def load_model_and_features():
    model=joblib.load(MODEL_PATH)
    features=joblib.load(FEATURE_PATH)
    return model,features

def extract_symptoms_from_text(user_input, feature_list):
    user_input = user_input.lower()
    matched_symptoms = []

    for symptom in feature_list:
        symptom_text = symptom.replace("_", " ").lower()
        if symptom_text in user_input:
            matched_symptoms.append(symptom)

    return matched_symptoms

def create_input_vector(symptoms, feature_list):
    return pd.DataFrame([{feature: 1 if feature in symptoms else 0 for feature in feature_list}])

def predict_disease_from_text(user_input):
    model, feature_list = load_model_and_features()
    matched_symptoms = extract_symptoms_from_text(user_input, feature_list)
    input_df = create_input_vector(matched_symptoms, feature_list)

    prediction = model.predict(input_df)[0]
    print("\n🩺 User input:", user_input)
    print("🧾 Extracted symptoms:", matched_symptoms)
    print("✅ Predicted disease:", prediction)
    return prediction

if __name__ == "__main__":
    print("💬 Please describe your symptoms:")
    user_input = input("👉 ")
    predict_disease_from_text(user_input)
    