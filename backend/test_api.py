import requests
import json

data = {
    "Age": 30,
    "AnnualIncome": 50000,
    "EmploymentStatus": "Employed",
    "EducationLevel": "Bachelor",
    "Experience": 5,
    "LoanAmount": 20000,
    "LoanDuration": 24,
    "MaritalStatus": "Single",
    "NumberOfDependents": 0,
    "HomeOwnershipStatus": "Rented",
    "MonthlyDebtPayments": 500,
    "CreditCardUtilizationRate": 0.3,
    "NumberOfOpenCreditLines": 3,
    "DebtToIncomeRatio": 0.2,
    "LoanPurpose": "Personal",
    "PreviousLoanDefaults": 0,
    "PaymentHistory": "Good",
    "SavingsAccountBalance": 1000,
    "CheckingAccountBalance": 500,
    "UtilityBillsPaymentHistory": "OnTime"
}

response = requests.post('http://127.0.0.1:5000/submit_data', json=data)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())
