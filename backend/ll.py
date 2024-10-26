import joblib

# Load the trained model
model = joblib.load("credit_risk_regression_model.pkl")

print(type(model))

