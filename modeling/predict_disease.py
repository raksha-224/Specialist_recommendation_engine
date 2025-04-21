import joblib
import pandas as pd

def predict_disease(user_symptoms, model_path="random_forest_model.pkl", feature_path="feature_names.pkl"):
    # Load model and feature names
    model = joblib.load(model_path)
    features = joblib.load(feature_path)

    # Create input vector with proper feature names
    input_dict = {feature: 1 if feature in user_symptoms else 0 for feature in features}
    input_df = pd.DataFrame([input_dict])

    # Predict
    prediction = model.predict(input_df)[0]
    print("🧾 Predicted Disease:", prediction)
    return prediction

if __name__ == "__main__":
    # Example usage
    symptoms = ["itching", "skin_rash"]
    predict_disease(symptoms)
