import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import Navbar from "./Navbar";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formSection, setFormSection] = useState("");
  const [formData, setFormData] = useState({
    age: "",  // Age
    annualIncome: "",  // AnnualIncome
    employmentStatus: "",  // EmploymentStatus
    educationLevel: "",  // EducationLevel
    maritalStatus: "",  // MaritalStatus
    homeOwnershipStatus: "",  // HomeOwnershipStatus
    loanPurpose: "",  // LoanPurpose
    savingsAccountBalance: "",  // SavingsAccountBalance
    checkingAccountBalance: "",  // CheckingAccountBalance
    utilityBillsPaymentHistory: "",  // UtilityBillsPaymentHistory
    experience: "",  // Experience
    loanAmount: "",  // LoanAmount
    loanDuration: "",  // LoanDuration
    numberOfDependents: "",  // NumberOfDependents
    monthlyDebtPayments: "",  // MonthlyDebtPayments
    creditCardUtilizationRate: "",  // CreditCardUtilizationRate
    numberOfOpenCreditLines: "",  // NumberOfOpenCreditLines
    debtToIncomeRatio: "",  // DebtToIncomeRatio
    previousLoanDefaults: "",  // PreviousLoanDefaults
    paymentHistory: "",  // PaymentHistory
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);

  // New state variables to hold results
  const [riskScore, setRiskScore] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Event handlers
  const startAssessment = () => setIsDropdownOpen(!isDropdownOpen);

  const openModal = (section) => {
    setFormSection(section);
    setIsModalOpen(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  

  const handleCancel = () => {
    // Reset form data if needed
    setFormData({
      // Reset to initial state or empty
    });
    // Close the modal
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    // Format formData to match backend model's expected input keys
    const data = {
      Age: Number(formData.age),  // Convert to number
      AnnualIncome: Number(formData.annualIncome),  // Convert to number
      EmploymentStatus: formData.employmentStatus,
      EducationLevel: formData.educationLevel,
      MaritalStatus: formData.maritalStatus,
      HomeOwnershipStatus: formData.homeOwnershipStatus,
      LoanPurpose: formData.loanPurpose,
      SavingsAccountBalance: Number(formData.savingsAccountBalance),  // Convert to number
      CheckingAccountBalance: Number(formData.checkingAccountBalance),  // Convert to number
      UtilityBillsPaymentHistory: Number(formData.utilityBillsPaymentHistory),  // Convert to number
      Experience: Number(formData.experience),  // Convert to number
      LoanAmount: Number(formData.loanAmount),  // Convert to number
      LoanDuration: Number(formData.loanDuration),  // Convert to number
      NumberOfDependents: Number(formData.numberOfDependents),  // Convert to number
      MonthlyDebtPayments: Number(formData.monthlyDebtPayments),  // Convert to number
      CreditCardUtilizationRate: Number(formData.creditCardUtilizationRate),  // Convert to number
      NumberOfOpenCreditLines: Number(formData.numberOfOpenCreditLines),  // Convert to number
      DebtToIncomeRatio: Number(formData.debtToIncomeRatio),  // Convert to number
      PreviousLoanDefaults: formData.previousLoanDefaults === "true",  // Convert to boolean
      PaymentHistory: Number(formData.paymentHistory),  // Convert to number
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/submit_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.error || "Unexpected error occurred."}`);
        return;
      }

      const result = await response.json();
      console.log("Risk Score:", result.prediction.risk_score);
      console.log("Risk Level:", result.prediction.risk_level);
      console.log("Explanation:", result.prediction.explanation);

      // Update state variables with results
      setRiskScore(result.prediction.risk_score);
      setRiskLevel(result.prediction.risk_level);
      setExplanation(result.prediction.explanation);
      setErrorMessage(""); // Clear any previous error messages

    } catch (error) {
      console.error("Request failed:", error);
      setErrorMessage("Request failed. Please try again.");
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center z-2 space-y-8 p-14 rounded-3xl backdrop-blur-lg bg-white/5 shadow-md transition-all duration-500">
          <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg">
            Kredit-Wert
          </h1>
          <p className="text-4xl text-blue-200">
          Welcome to the Future of Credit
          </p>
          <button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-xl font-bold transform hover:scale-105 transition-all"
            onClick={startAssessment}
          >
            Start Your Assessment
            <ChevronRight className="inline ml-2" />
          </button>
          
          {isDropdownOpen && (
            <div className="mt-4 relative inline-block">
              <button className="text-white bg-gray-700 px-4 py-2 rounded-lg flex items-center">
                Choose Section 
                <ChevronDown className="ml-2" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button 
                  onClick={() => openModal("Demographic Data")} 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Demographic Data
                </button>
                <button 
                  onClick={() => openModal("Financial Data")} 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Financial Data
                </button>
                <button 
                  onClick={() => openModal("Loan Related Data")} 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Loan Related Data
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

{/* Modal for Forms */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{formSection}</h2>

      <div className="space-y-4">
        {/* Home Form */}
        {formSection === "Demographic Data" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Employment Status</label>
                <input
                  type="text"
                  value={formData.employmentStatus}
                  onChange={(e) => handleInputChange("employmentStatus", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Education Level</label>
                <input
                  type="text"
                  value={formData.educationLevel}
                  onChange={(e) => handleInputChange("educationLevel", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Experience (Years)</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Marital Status</label>
                <input
                  type="text"
                  value={formData.maritalStatus}
                  onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Number of Dependents</label>
                <input
                  type="number"
                  value={formData.numberOfDependents}
                  onChange={(e) => handleInputChange("numberOfDependents", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Home Ownership Status</label>
                <input
                  type="text"
                  value={formData.homeOwnershipStatus}
                  onChange={(e) => handleInputChange("homeOwnershipStatus", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={() => setFormSection("Financial Data")}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* My FinHealth Form */}
        {formSection === "Financial Data" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Annual Income</label>
                <input
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Monthly Debt Payments</label>
                <input
                  type="number"
                  value={formData.monthlyDebtPayments}
                  onChange={(e) => handleInputChange("monthlyDebtPayments", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">CC Utilization (%)</label>
                <input
                  type="number"
                  value={formData.ccUtilization}
                  onChange={(e) => handleInputChange("ccUtilization", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Debt to Income Ratio (%)</label>
                <input
                  type="number"
                  value={formData.debtToIncomeRatio}
                  onChange={(e) => handleInputChange("debtToIncomeRatio", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Savings Account Balance</label>
                <input
                  type="number"
                  value={formData.savingsAccountBalance}
                  onChange={(e) => handleInputChange("savingsAccountBalance", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Checking Account Balance</label>
                <input
                  type="number"
                  value={formData.checkingAccountBalance}
                  onChange={(e) => handleInputChange("checkingAccountBalance", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Utility Bills Payment History</label>
                <input
                  type="text"
                  value={formData.utilityBillsPaymentHistory}
                  onChange={(e) => handleInputChange("utilityBillsPaymentHistory", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
                onClick={() => setFormSection("Demographic Data")}
              >
                Previous
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={() => setFormSection("Loan Related Data")}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* About Form */}
        {formSection === "Loan Related Data" && (
  <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-600">Loan Amount</label>
        <input
          type="number"
          value={formData.loanAmount}
          onChange={(e) => handleInputChange("loanAmount", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600">Loan Purpose</label>
        <input
          type="text"
          value={formData.loanPurpose}
          onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600">Desired Term (Months)</label>
        <input
          type="number"
          value={formData.desiredTerm}
          onChange={(e) => handleInputChange("desiredTerm", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600">Interest Rate</label>
        <input
          type="number"
          value={formData.interestRate}
          onChange={(e) => handleInputChange("interestRate", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div className="flex justify-between mt-6">
      <button
        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
        onClick={() => setFormSection("Financial Data")}
      >
        Cancel
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-lg"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  </div>
        )}
      </div>
    </div>
  </div>
)}

<div className="w-1/2 relative z-20 p-12 rounded-lg bg-purple-700 bg-opacity-70 backdrop-blur-md shadow-lg mx-auto">
  {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}
  {riskScore !== null && (
    <div>
      <h2 className="text-gradient text-2xl font-semibold text-shadow">Prediction Result:</h2>
      <p className="text-yellow-300 text-lg text-shadow"><strong>Risk Score:</strong> {riskScore}</p>
      <p className="text-green-400 text-lg text-shadow"><strong>Risk Level:</strong> {riskLevel}</p>
      <p className="text-white text-lg text-shadow"><strong>Explanation:</strong> {explanation}</p>
    </div>
  )}
</div>



      {/* Features Section */}
      <section className="py-20 px-8 text-center bg-gradient-to-b from-gray-900 to-blue-800 text-center" id="features">
        <h2 className="text-4xl font-bold text-blue-300 mb-8">
          Our Features
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white/10 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-200">
              AI-Powered Analysis
            </h3>
            <p className="text-blue-100 mt-4">
            Our platform goes beyond traditional credit checks by incorporating utility bills, rent payments, social media presence, and telecom data. These alternative data sources offer a more comprehensive view of financial behaviors and reliability, ensuring that credit assessments are well-rounded and inclusive.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-200">
              Secure Data Processing
            </h3>
            <p className="text-blue-100 mt-4">
            We prioritize the security of your financial data by employing state-of-the-art encryption technologies. Our advanced encryption protocols ensure that all sensitive information is safeguarded against unauthorized access, providing peace of mind as you navigate your financial journey.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-200">
            Transparent Explanations   
            </h3>
            <p className="text-blue-100 mt-4">
            Our platform offers clear and comprehensive insights into risk assessments for every borrower, powered by advanced GPT-generated analytics. We believe in transparency, providing users with easy-to-understand explanations of how their creditworthiness is evaluated.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-8 text-center bg-gradient-to-b from-blue-800 to-gray-900" id="how it works">
        <h2 className="text-4xl font-bold text-blue-300 mb-8">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3 text-center">
          <div className="bg-white/10 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-200">
              Step 1: Assessment
            </h3>
            <p className="text-blue-100 mt-4">
            To begin your journey toward a clearer understanding of your financial health, fill out your details for an initial assessment of your credit profile. This simple and secure form will collect essential information, including your income, existing debts, and other financial obligations. Our user-friendly interface ensures a smooth experience, guiding you through each step.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-200">
              Step 2: AI Analysis
            </h3>
            <p className="text-blue-100 mt-4">
            Our advanced AI technology meticulously evaluates your financial data to generate personalized insights tailored to your unique situation. By analyzing various factors—such as your spending habits, income patterns, and credit history—our AI uncovers meaningful trends and provides actionable recommendations.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-200">
              Step 3: Results
            </h3>
            <p className="text-blue-100 mt-4">
            Upon completing your assessment, you will receive tailored, actionable recommendations designed to enhance your credit profile. Our AI-driven insights highlight specific steps you can take to improve your credit score and overall financial health. These recommendations may include strategies such as managing existing debts, optimizing your credit utilization, and making timely payments.
            </p>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 px-8 text-center bg-gradient-to-b from-blue-800 to-gray-900" id="faqs">
        <h2 className="text-4xl font-bold text-blue-300 mb-8">
          FAQs
        </h2>
        <div className="space-y-6 text-left">
          <div className="bg-white/10 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-200">
              What data do you need for credit assessment?
            </h3>
            <p className="text-blue-100">
              We only ask for necessary information like your income, debt, and financial status to ensure a fair assessment.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-200">
              How secure is my data?
            </h3>
            <p className="text-blue-100">
              We prioritize data security with end-to-end encryption and secure servers.
            </p>
          </div>
        </div>
      </section>
      <footer className="py-8 text-center text-gray-400">
          <p>&copy; 2024 Kredit-Wert. All rights reserved.</p>
        </footer>
    </div>
          
  );
};

export default Home;