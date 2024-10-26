# synthetic_data.py
import pandas as pd
import numpy as np

def generate_synthetic_data(num_samples=100):
    data = {
        'monthly_utilities': np.random.randint(50, 200, num_samples),
        'ecommerce_transactions': np.random.randint(1, 20, num_samples),
        'mobile_activity': np.random.randint(1, 100, num_samples),
    }
    df = pd.DataFrame(data)
    df['credit_risk'] = np.where(df['monthly_utilities'] > 100, 'High', 'Low')
    return df

df = generate_synthetic_data()
df.to_csv("synthetic_data.csv", index=False)



# synthetic_data.py
# import pandas as pd
# import numpy as np

# def generate_synthetic_data(num_samples=100):
#     # Generate synthetic data for each feature
#     data = {
#         'ApplicationDate': pd.date_range(start='2018-01-01', periods=num_samples).strftime('%Y-%m-%d'),
#         'Age': np.random.randint(18, 65, num_samples),
#         'AnnualIncome': np.random.randint(30000, 150000, num_samples),
#         'EmploymentStatus': np.random.choice(['Employed', 'Self-Employed', 'Unemployed'], num_samples),
#         'EducationLevel': np.random.choice(['High School', 'Bachelor', 'Master', 'PhD'], num_samples),
#         'Experience': np.random.randint(0, 40, num_samples),
#         'LoanAmount': np.random.randint(1000, 50000, num_samples),
#         'LoanDuration': np.random.randint(6, 60, num_samples),  # in months
#         'MaritalStatus': np.random.choice(['Single', 'Married', 'Divorced'], num_samples),
#         'NumberOfDependents': np.random.randint(0, 5, num_samples),
#         'HomeOwnershipStatus': np.random.choice(['Own', 'Rent'], num_samples),
#         'MonthlyDebtPayments': np.random.randint(50, 2000, num_samples),
#         'CreditCardUtilizationRate': np.random.uniform(0, 1, num_samples).round(2),
#         'NumberOfOpenCreditLines': np.random.randint(1, 10, num_samples),
#         'DebtToIncomeRatio': np.random.uniform(0, 1, num_samples).round(2),
#         'LoanPurpose': np.random.choice(['Home', 'Auto', 'Education', 'Personal'], num_samples),
#         'PreviousLoanDefaults': np.random.choice([0, 1], num_samples),  # 0: No, 1: Yes
#         'PaymentHistory': np.random.randint(1, 36, num_samples),  # On-time payments
#         'SavingsAccountBalance': np.random.randint(1000, 100000, num_samples),
#         'CheckingAccountBalance': np.random.randint(500, 50000, num_samples),
#         'UtilityBillsPaymentHistory': np.random.randint(1, 24, num_samples),  # Months of on-time bill payment
#     }

#     # Create a DataFrame
#     df = pd.DataFrame(data)

#     # Generate a synthetic credit risk label based on financial metrics
#     df['RiskScore'] = np.where(
#         (df['AnnualIncome'] < 50000) & (df['MonthlyDebtPayments'] > 1000) | 
#         (df['PreviousLoanDefaults'] == 1) | 
#         (df['CreditCardUtilizationRate'] > 0.8), 
#         'High', 'Low'
#     )

#     return df

# # Generate the synthetic dataset and save it to a CSV file
# df = generate_synthetic_data()
# df.to_csv("synthetic_data.csv", index=False)