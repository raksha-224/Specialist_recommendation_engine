import pandas as pd

def duplicate_check(file_path):
    df = pd.read_csv(file_path)

    # Preserve row numbers by resetting the index (adds old index as a column)
    df_with_index = df.reset_index()

    # Get duplicates based on symptoms only (exclude 'prognosis')
    duplicates_symptoms_only = df_with_index[df_with_index.drop(['index', 'prognosis'], axis=1).duplicated(keep=False)]

    # Print row numbers and data
    print(f"Duplicate rows (with original row numbers):\n")
    print(duplicates_symptoms_only[['index'] + df.columns.tolist()])  # original index + full row

    return df

if __name__ == "__main__":
    print("Hello")
    file_path = "symbipredict_2022.csv"
    duplicate_check(file_path)
