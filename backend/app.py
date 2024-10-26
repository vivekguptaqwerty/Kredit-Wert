import pandas as pd
import numpy as np
import joblib
from transformers import pipeline, GPT2Tokenizer
from sklearn.preprocessing import LabelEncoder
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model and explanation model
print("Loading models...")
model = joblib.load("credit_risk_regression_model.pkl")
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
explanation_model = pipeline("text-generation", model="gpt2", tokenizer=tokenizer)
print("Models loaded successfully!")

# Initialize label encoders
label_encoders = {}

def determine_risk_level(risk_score):
    """Determine risk level based on risk score."""
    if risk_score < 30:
        return "Low Risk"
    elif risk_score < 60:
        return "Medium Risk"
    else:
        return "High Risk"

def generate_explanation(input_data, risk_score):
    """Generate explanation for the risk score."""
    input_text = (
        f"Risk score {risk_score:.1f} analysis: "
        f"With annual income of ${input_data.get('AnnualIncome', 'N/A'):,}, "
        f"loan amount of ${input_data.get('LoanAmount', 'N/A'):,}, "
        f"credit utilization of {input_data.get('CreditCardUtilizationRate', 'N/A')}%, "
        f"and debt-to-income ratio of {input_data.get('DebtToIncomeRatio', 'N/A')}. "
        f"Explain the risk assessment."
    )

    try:
        response = explanation_model(
            input_text,
            max_length=100,
            min_length=30,
            num_return_sequences=1,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )

        explanation = response[0]['generated_text'].strip()
        if explanation.startswith(input_text):
            explanation = explanation[len(input_text):].strip()
            
        return explanation

    except Exception as e:
        return (f"Based on the analysis, this application shows a {determine_risk_level(risk_score)} "
                f"profile with a risk score of {risk_score:.1f}. Key factors include income, "
                f"loan amount, credit utilization, and debt-to-income ratio.")

def encode_dataset(data):
    """Encode categorical features in the dataset."""
    categorical_columns = [
        'EmploymentStatus',
        'EducationLevel',
        'MaritalStatus',
        'HomeOwnershipStatus',
        'LoanPurpose'
    ]

    global label_encoders
    for col in categorical_columns:
        le = LabelEncoder()
        data[col] = le.fit_transform(data[col])
        label_encoders[col] = le

def encode_input_data(input_data):
    """Encode input data using the previously fitted label encoders."""
    for col, le in label_encoders.items():
        input_data[col] = le.transform([input_data[col]])[0]
    return input_data

def predict_credit_risk(input_data):
    """Predict credit risk for a single input."""
    try:
        input_data = encode_input_data(input_data)
        input_df = pd.DataFrame([input_data])
        
        required_features = [
            'Age', 'AnnualIncome', 'EmploymentStatus', 'EducationLevel',
            'MaritalStatus', 'HomeOwnershipStatus', 'LoanPurpose', 
            'SavingsAccountBalance', 'CheckingAccountBalance', 
            'UtilityBillsPaymentHistory', 'Experience', 'LoanAmount', 
            'LoanDuration', 'NumberOfDependents', 'MonthlyDebtPayments',
            'CreditCardUtilizationRate', 'NumberOfOpenCreditLines',
            'DebtToIncomeRatio', 'PreviousLoanDefaults', 'PaymentHistory'
        ]
        
        missing_features = set(required_features) - set(input_df.columns)
        if missing_features:
            return {
                "error": f"Missing required features: {', '.join(missing_features)}"
            }
        
        risk_score = model.predict(input_df)[0]
        risk_level = determine_risk_level(risk_score)
        explanation = generate_explanation(input_data, risk_score)
        
        return {
            "risk_score": float(risk_score),
            "risk_level": risk_level,
            "explanation": explanation,
            "input_data": input_data
        }
        
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}

@app.route('/')
def home():
    return "Welcome to the Kredit-Wert API!"

@app.route('/submit_data', methods=['POST'])
def submit_data():
    data = request.json  # Receive JSON data
    print("Received data:", data)

    # Process the input data and predict credit risk
    prediction_result = predict_credit_risk(data)
    
    # Check for errors in prediction
    if "error" in prediction_result:
        return jsonify(prediction_result), 400  # Bad request if there's an error
    
    # Include the input data in the response
    response_data = {
        "prediction": prediction_result,
        "input_data": data
    }
    
    # Return the prediction result as JSON response
    return jsonify(response_data), 200


if __name__ == "__main__":
    app.run(debug=True)
