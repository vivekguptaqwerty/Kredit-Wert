import pandas as pd
import joblib
import shap

# Load the trained model and dataset
model = joblib.load("credit_risk_model.pkl")
data = pd.read_csv("final_data.csv")

# Select the same features as used in model training
features = [
    'Age', 'AnnualIncome', 'EmploymentStatus', 'EducationLevel', 'Experience', 
    'LoanAmount', 'LoanDuration', 'MaritalStatus', 'NumberOfDependents', 
    'HomeOwnershipStatus', 'MonthlyDebtPayments', 'CreditCardUtilizationRate', 
    'NumberOfOpenCreditLines', 'DebtToIncomeRatio', 'LoanPurpose', 
    'PreviousLoanDefaults', 'PaymentHistory', 'SavingsAccountBalance', 
    'CheckingAccountBalance', 'UtilityBillsPaymentHistory'
]

X = data[features]

# Initialize SHAP explainer for pipeline models
explainer = shap.Explainer(model.predict, X)

# Generate SHAP values for the entire dataset
shap_values = explainer(X)

# Visualize explanation for a single prediction (first data point)
print("Generating force plot for the first prediction...")
shap.initjs()
shap.force_plot(explainer.expected_value, shap_values[0], X.iloc[0])

# Generate summary plot to show global feature importance
print("Generating summary plot for feature importance...")
shap.summary_plot(shap_values, X)

# Generate bar plot to highlight feature importance
print("Generating bar plot for feature importance...")
shap.summary_plot(shap_values, X, plot_type="bar")