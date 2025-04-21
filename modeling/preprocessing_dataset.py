import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

def load_clean_data(file_path):
    
    #Loading the dataset
    df=pd.read_csv('symbipredict_2022.csv');
    
    #Standardize the column names
    df.columns=df.columns.str.strip().str.lower().str.replace(" ","_").str.replace("__","_")
    
    #Remove duplicates
    #df.drop_duplicates(inplace=True)
    
    #Check and report missing values
    missing=df.isnull().sum().sum()
    if missing>0:
        print(f"Warning : Dataset contains {missing} missing values!!")
    
    return df

def preprocess_features_labels(df):
    # Seperate features and target
    X=df.drop('prognosis',axis=1)
    y=df['prognosis']
    
    #Encoding target labels
    le=LabelEncoder()
    y_encoded=le.fit_transform(y)
    
    # Store the label mapping (optional)
    label_mapping = dict(zip(le.classes_, le.transform(le.classes_)))
    print("Label Mapping:", label_mapping)

    return X, y_encoded, label_mapping

def split_data(X, y, test_size=0.2):
    return train_test_split(X, y, test_size=test_size, random_state=42)

if __name__=="__main__":
    # Adjust this path to your dataset location
    print("Hello")
    file_path="//symbipredict_2022.csv"
    
    # Load and preprocess
    df = load_clean_data(file_path)
    print("DataFrame shape after load:", df.shape)
    X, y, label_mapping = preprocess_features_labels(df)
    print("X shape:", X.shape)
    print("y shape:", len(y))
    X_train, X_test, y_train, y_test = split_data(X, y)
    

    # Optional: save processed data or use it in a model pipeline
    print("Preprocessing complete.")
    print("Training set size:", X_train.shape)
    print("Test set size:", X_test.shape)
