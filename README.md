# BeVivia - Customer Churn Intelligence Platform

[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://bevivia.streamlit.app)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.28%2B-FF4B4B.svg)](https://streamlit.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

🌐 **Live Application:** [https://bevivia.streamlit.app](https://bevivia.streamlit.app)

---

## 🎯 Overview

**BeVivia** is an end-to-end customer churn intelligence platform engineered to predict, analyze, and prevent customer attrition using machine learning and business intelligence.

- **Predicts** customer churn probability with 85%+ accuracy and real-time risk scoring
- **Identifies** key churn drivers with 7+ domain-engineered features
- **Provides** actionable, risk-tiered customer retention strategies
- **Visualizes** exploratory data patterns and model benchmarks through interactive analytics

---

## 🚀 Live Demo & Web Applications

You can explore BeVivia in two interactive formats:
1. **Streamlit Intelligence Dashboard**: Complete standalone interactive web app with real-time predictions, EDA visualizations, model evaluation metrics, and business strategies.
   - **Live URL**: [https://bevivia.streamlit.app](https://bevivia.streamlit.app)
2. **React + FastAPI Full-Stack Platform**: Modern React 18 frontend paired with a high-performance asynchronous FastAPI prediction backend.

---

## 💻 Tech Stack

- **ML & Data Science**: Scikit-Learn, XGBoost, Pandas, NumPy, Joblib
- **Interactive UI & Visualizations**: Streamlit, Plotly, React 18, Recharts, Tailwind CSS
- **Backend API**: FastAPI, Uvicorn, Pydantic
- **Data Source**: Telco Customer Churn Dataset (7,043 customer records)

---

## 📁 Project Structure

```
BeVivia/
├── app/
│   └── streamlit_app.py      # Streamlit interactive application
│
├── frontend/                 # React 18 + Tailwind dashboard
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # 5 dashboard pages
│   │   └── services/         # API client
│   ├── package.json
│   └── vite.config.js
│
├── api/
│   └── main.py               # FastAPI REST API endpoints
│
├── src/                      # ML core modules
│   ├── config.py             # Feature definitions & hyperparameters
│   ├── features.py           # Feature engineering pipeline
│   ├── pipeline.py           # Preprocessing & encoding pipelines
│   ├── model.py              # Model trainers & inference engine
│   ├── train.py              # End-to-end training script
│   └── utils.py              # Metrics & logging helpers
│
├── models/                   # Serialized models & artifacts
│   ├── random_forest.pkl
│   ├── logistic_regression.pkl
│   ├── xgboost.pkl
│   ├── preprocessor.pkl
│   └── model_results.json
│
├── WA_Fn-UseC_-Telco-Customer-Churn.csv  # Dataset
├── requirements.txt          # Python dependencies
└── README.md
```

---

## 🤖 Machine Learning Pipeline

### 1. Engineered Features
The system computes 7+ advanced domain features to capture lifecycle dynamics:
- **Tenure Buckets**: Lifecycle stages (`0-6m`, `6-12m`, `1-2y`, `2-4y`, `4y+`)
- **Service Count**: Total number of adopted value-added services
- **Contract Stability Score**: Risk-weighted contract index
- **Engagement Score**: Compound index of tenure and service depth
- **Charge Ratio**: Ratio of monthly charges to total lifetime spend
- **Internet Service Risk**: Risk weighting based on connection infrastructure
- **Payment Method Risk**: Electronic check vs. automated payment risk profiling

### 2. Model Benchmarks

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC | Status |
|---|---|---|---|---|---|---|
| **Random Forest** | **0.82** | **0.81** | **0.75** | **0.78** | **0.86** | 🏆 **Production Model** |
| XGBoost | 0.81 | 0.80 | 0.73 | 0.76 | 0.85 | Candidate |
| Logistic Regression | 0.80 | 0.78 | 0.72 | 0.75 | 0.84 | Baseline |

*Balanced class weights are applied to address the ~26.5% positive class imbalance.*

---

## 🎨 Interactive Dashboard Pages

1. **🔮 Churn Prediction Engine**
   - Interactive customer parameter inputs (demographics, services, contracts, charges)
   - Real-time churn probability scoring with risk-level classification (🟢 Low, 🟠 Medium, 🔴 High)
   - Personalized retention action recommendations

2. **📊 Data Analysis & EDA**
   - Churn distribution analysis across customer demographics and contracts
   - Tenure cohort survival visualizations
   - Monthly charge distribution and payment method correlation

3. **🏆 Model Comparison**
   - Side-by-side performance benchmarks (Accuracy, Precision, Recall, F1, ROC-AUC)
   - Feature importance rankings across models

4. **💡 Business Insights & Retention Playbook**
   - High-impact churn drivers analysis
   - Risk-tiered 90-day retention roadmap
   - Financial impact estimates

5. **ℹ️ System Info & Architecture**
   - Technical specifications, data pipeline details, and API documentation

---

## 🔌 FastAPI Endpoints

When running the FastAPI backend:
- `GET /health` - Health status and loaded model verification
- `POST /predict` - Single customer churn prediction
- `POST /batch-predict` - Bulk prediction for multiple customer records
- `GET /model-info` - Performance metrics and feature list
- `GET /docs` - Interactive Swagger UI API documentation

---

## 🛠️ Local Development

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ *(optional, only for React frontend)*

### 2. Setup Environment
```bash
# Clone the repository
git clone https://github.com/Adittii72/BeVivia.git
cd BeVivia

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Train Models (Optional if artifacts exist)
```bash
python src/train.py
```

### 4. Run Streamlit Application
```bash
streamlit run app/streamlit_app.py
```
> The dashboard will open in your browser at `http://localhost:8501`.

### 5. Run React + FastAPI (Optional Full-Stack Mode)
**Terminal 1 (Backend API):**
```bash
python -m uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```
*API Docs available at `http://localhost:8000/docs`*

**Terminal 2 (React Frontend):**
```bash
cd frontend
npm install
npm run dev
```
*React app available at `http://localhost:3000`*

---

## 📈 Key Insights & Retention Strategies

- **Early Tenure Sensitivity**: First 6 months represent highest churn vulnerability (3x baseline rate) &rarr; *Mitigation: Automated onboarding check-ins and dedicated setup support.*
- **Contract Type**: Month-to-month contracts exhibit >42% churn &rarr; *Mitigation: Targeted annual contract discounts and milestone loyalty perks.*
- **Support Gaps**: Absence of Tech Support correlates with 2.5x higher churn &rarr; *Mitigation: Free 90-day tech support bundles for at-risk accounts.*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
