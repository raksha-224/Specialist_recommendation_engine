import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

def train_and_save_model(csv_path, model_path="random_forest_model.pkl"):
    df = pd.read_csv(csv_path)

    # Separate features and labels
    X = df.drop("prognosis", axis=1)
    y = df["prognosis"]

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Save model and feature names
    joblib.dump(model, model_path)
    joblib.dump(list(X.columns), "feature_names.pkl")
    print("✅ Model and feature names saved.")

if __name__ == "__main__":
    train_and_save_model("symbipredict_2022.csv")
