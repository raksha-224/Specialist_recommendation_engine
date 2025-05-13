# Disease categories and associated specialists

disease_categories = {
    "Neurological Disorders": {
        "specialist": ["Neurologist", "Neurosurgeon", "Psychiatrist"],
        "examples": [
            "Parkinson disease", "Alzheimer disease", "Epilepsy", "ALS",
            "Multiple sclerosis", "Migraine", "Stroke", "Bell palsy",
            "Guillain-Barré syndrome", "Tourette syndrome", "Cerebral palsy"
        ]
    },
    "Cardiovascular Diseases": {
        "specialist": ["Cardiologist", "Cardiothoracic Surgeon"],
        "examples": [
            "Hypertension", "Coronary atherosclerosis", "Atrial fibrillation",
            "Congestive heart failure", "Valvular heart disease",
            "Myocardial infarction", "Cardiomyopathy", "Arrhythmias", "Peripheral artery disease"
        ]
    },
    "Respiratory Conditions": {
        "specialist": ["Pulmonologist"],
        "examples": [
            "Asthma", "COPD", "Pneumonia", "Pulmonary embolism",
            "Pulmonary hypertension", "Emphysema", "Interstitial lung disease", "ARDS"
        ]
    },
    "Endocrine & Metabolic Disorders": {
        "specialist": ["Endocrinologist"],
        "examples": [
            "Diabetes", "Hypothyroidism", "Hyperthyroidism", "Cushing syndrome",
            "Addison disease", "PCOS", "Metabolic syndrome", "Hypercalcemia",
            "Hypocalcemia", "Goiter", "Hyperlipidemia", "Obesity"
        ]
    },
    "Gastrointestinal & Liver Disorders": {
        "specialist": ["Gastroenterologist", "Hepatologist", "General Surgeon"],
        "examples": [
            "GERD", "Hepatitis", "Cirrhosis", "Ulcerative colitis", "Crohn disease",
            "Gallstones", "Appendicitis", "Liver cancer", "Pancreatitis", "IBS", "Constipation","infectious gastroenteritis"
        ]
    },
    "Pediatric Disorders": {
        "specialist": ["Pediatrician"],
        "examples": [
            "Neonatal jaundice", "Cryptorchidism", "Teething syndrome",
            "Juvenile rheumatoid arthritis", "Congenital heart defect",
            "Down syndrome", "ADHD", "Autism", "Fetal alcohol syndrome"
        ]
    },
    "Genetic & Rare Disorders": {
        "specialist": ["Geneticist", "Neurologist", "Pediatrician"],
        "examples": [
            "Turner syndrome", "Friedrich ataxia", "Tuberous sclerosis", "Wilson disease",
            "Neurofibromatosis", "Edward syndrome", "Hemophilia", "Cystic fibrosis"
        ]
    },
    "Musculoskeletal Disorders": {
        "specialist": ["Orthopedic Surgeon", "Rheumatologist", "Physiatrist"],
        "examples": [
            "Osteoarthritis", "Rheumatoid arthritis", "Gout", "Fibromyalgia",
            "Spondylitis", "Osteoporosis", "Herniated disc", "Degenerative disc disease", "Muscle spasm"
        ]
    },
    "Hematologic & Oncologic Disorders": {
        "specialist": ["Hematologist", "Oncologist"],
        "examples": [
            "Leukemia", "Lymphoma", "Anemia", "Multiple myeloma", "Thrombocytopenia",
            "Hemophilia", "Sickle cell anemia", "Bone cancer", "Breast cancer", "Colorectal cancer"
        ]
    },
    "Psychiatric & Behavioral Conditions": {
        "specialist": ["Psychiatrist", "Psychologist"],
        "examples": [
            "Depression", "Bipolar disorder", "Anxiety", "Schizophrenia",
            "PTSD", "ADHD", "OCD", "Panic disorder", "Eating disorder"
        ]
    },
    "Reproductive & Sexual Health": {
        "specialist": ["Gynecologist", "Urologist", "Reproductive Endocrinologist"],
        "examples": [
            "Endometriosis", "Infertility", "Menopause", "Erectile dysfunction",
            "Vaginitis", "Prostatitis", "Testicular torsion", "PCOS", "Pregnancy-related complications"
        ]
    },
    "Dermatologic Conditions": {
        "specialist": ["Dermatologist"],
        "examples": [
            "Acne", "Psoriasis", "Eczema", "Vitiligo", "Fungal infections",
            "Skin cancer", "Lichen planus", "Alopecia"
        ]
    },
    "Ophthalmologic Conditions": {
        "specialist": ["Ophthalmologist"],
        "examples": [
            "Glaucoma", "Cataract", "Macular degeneration", "Retinal detachment",
            "Conjunctivitis", "Uveitis", "Vitreous hemorrhage"
        ]
    },
    "ENT Conditions": {
        "specialist": ["Otolaryngologist"],
        "examples": [
            "Otitis media", "Sinusitis", "Tinnitus", "Hearing loss",
            "Laryngitis", "Nasal polyps", "Tonsillitis"
        ]
    },
    "Infectious Diseases": {
        "specialist": ["Infectious Disease Specialist"],
        "examples": [
            "HIV/AIDS", "Tuberculosis", "Malaria", "Syphilis",
            "Gonorrhea", "Hepatitis B", "Hepatitis C", "Mononucleosis"
        ]
    },
    "Dental & Oral Conditions": {
        "specialist": ["Dentist", "Oral Surgeon"],
        "examples": [
            "Tooth abscess", "Dental caries", "Gingivitis", "Oral thrush", "TMJ disorders"
        ]
    }
}

# Example: Displaying all categories with their specialists
for category, details in disease_categories.items():
    print(f"\n{category}:\n  Specialists: {', '.join(details['specialist'])}")
    print("  Conditions:")
    for condition in details["examples"]:
        print(f"    - {condition}")

DISEASE_TO_SPECIALTY = {}

for category, data in disease_categories.items():
    for disease in data['examples']:
        DISEASE_TO_SPECIALTY[disease.lower()] = data['specialist']