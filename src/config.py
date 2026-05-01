import os
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
DATA_PATH = PROJECT_ROOT / "data"
MODEL_PATH = PROJECT_ROOT / "models"
CONFIG_PATH = PROJECT_ROOT / "config"

DATA_FILE = PROJECT_ROOT / "WA_Fn-UseC_-Telco-Customer-Churn.csv"
RANDOM_STATE = 42
TEST_SIZE = 0.2
VALIDATION_SIZE = 0.1

CATEGORICAL_FEATURES = [
    'gender', 'SeniorCitizen', 'Partner', 'Dependents',
    'PhoneService', 'MultipleLines', 'InternetService',
    'OnlineSecurity', 'OnlineBackup', 'DeviceProtection',
    'TechSupport', 'StreamingTV', 'StreamingMovies',
    'Contract', 'PaperlessBilling', 'PaymentMethod'
]

NUMERICAL_FEATURES = [
    'tenure', 'MonthlyCharges', 'TotalCharges'
]

DERIVED_FEATURES = [
    'tenure_bucket',
    'engagement_score',
    'service_count',
    'charge_ratio',
    'monthly_to_avg_ratio'
]

MODEL_NAMES = ['Logistic Regression', 'Random Forest', 'XGBoost']
MODEL_PARAMS = {
    'logistic_regression': {
        'C': 1.0,
        'max_iter': 1000,
        'random_state': RANDOM_STATE,
        'solver': 'lbfgs'
    },
    'random_forest': {
        'n_estimators': 200,
        'max_depth': 15,
        'min_samples_split': 10,
        'min_samples_leaf': 4,
        'random_state': RANDOM_STATE,
        'n_jobs': -1,
        'class_weight': 'balanced'
    },
    'xgboost': {
        'n_estimators': 200,
        'max_depth': 6,
        'learning_rate': 0.1,
        'random_state': RANDOM_STATE,
        'subsample': 0.8,
        'colsample_bytree': 0.8,
        'scale_pos_weight': 1.5,
        'n_jobs': -1,
        'eval_metric': 'logloss'
    }
}

CHURN_RISK_LEVELS = {
    'Low': (0, 0.30),
    'Medium': (0.30, 0.70),
    'High': (0.70, 1.0)
}

API_HOST = "0.0.0.0"
API_PORT = 8000
API_DEBUG = False

LOG_LEVEL = "INFO"
