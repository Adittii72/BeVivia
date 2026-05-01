from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Dict, Any
import numpy as np
import pandas as pd
import joblib
import logging
from pathlib import Path
import json
from datetime import datetime
import sys

sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))
from features import FeatureEngineer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="BeVivia Churn Intelligence API",
    description="Production-grade API for customer churn prediction",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROJECT_ROOT = Path(__file__).parent.parent
MODEL_PATH = PROJECT_ROOT / "models"
STATIC_PATH = PROJECT_ROOT / "static"

models = {}
preprocessor = None
feature_engineer = None


def load_artifacts():
    global models, preprocessor, feature_engineer
    try:
        models['logistic_regression'] = joblib.load(MODEL_PATH / "logistic_regression.pkl")
        models['random_forest'] = joblib.load(MODEL_PATH / "random_forest.pkl")
        
        try:
            models['xgboost'] = joblib.load(MODEL_PATH / "xgboost.pkl")
        except:
            pass
        
        preprocessor = joblib.load(MODEL_PATH / "preprocessor.pkl")
        feature_engineer = FeatureEngineer()
        logger.info("✅ Models and preprocessor loaded successfully")
    except Exception as e:
        logger.error(f"❌ Error loading artifacts: {str(e)}")
        raise


class CustomerInput(BaseModel):
    tenure: int
    MonthlyCharges: float
    TotalCharges: float
    Contract: str
    gender: str
    InternetService: str
    SeniorCitizen: int
    PhoneService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Partner: str
    Dependents: str
    MultipleLines: str
    PaperlessBilling: str
    PaymentMethod: str


class PredictionResponse(BaseModel):
    churn_probability: float
    churn_prediction: int
    risk_level: str
    confidence: float
    timestamp: str


class BatchPredictionResponse(BaseModel):
    predictions: List[Dict[str, Any]]
    total_count: int
    high_risk_count: int
    medium_risk_count: int
    low_risk_count: int


class HealthResponse(BaseModel):
    status: str
    timestamp: str
    models_loaded: int


class ModelMetricsResponse(BaseModel):
    models: Dict[str, Dict[str, float]]
    best_model: str
    best_roc_auc: float


@app.on_event("startup")
async def startup_event():
    load_artifacts()
    logger.info("🚀 BeVivia API started")


@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat(),
        models_loaded=len(models)
    )


@app.post("/predict", response_model=PredictionResponse)
async def predict(customer: CustomerInput):
    try:
        input_df = pd.DataFrame([customer.dict()])
        input_df = feature_engineer.create_derived_features(input_df)
        X_transformed = preprocessor.transform(input_df)
        
        best_model = models['random_forest']
        churn_prob = best_model.predict_proba(X_transformed)[0, 1]
        prediction = best_model.predict(X_transformed)[0]
        
        if churn_prob < 0.30:
            risk_level = "Low"
        elif churn_prob < 0.70:
            risk_level = "Medium"
        else:
            risk_level = "High"
        
        confidence = max(churn_prob, 1 - churn_prob)
        
        return PredictionResponse(
            churn_probability=float(churn_prob),
            churn_prediction=int(prediction),
            risk_level=risk_level,
            confidence=float(confidence),
            timestamp=datetime.now().isoformat()
        )
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")


@app.post("/batch-predict", response_model=BatchPredictionResponse)
async def batch_predict(customers: List[CustomerInput]):
    try:
        input_df = pd.DataFrame([c.dict() for c in customers])
        input_df = feature_engineer.create_derived_features(input_df)
        X_transformed = preprocessor.transform(input_df)
        
        best_model = models['random_forest']
        churn_probs = best_model.predict_proba(X_transformed)[:, 1]
        predictions = best_model.predict(X_transformed)
        
        results = []
        risk_counts = {'High': 0, 'Medium': 0, 'Low': 0}
        
        for i, (prob, pred) in enumerate(zip(churn_probs, predictions)):
            if prob < 0.30:
                risk_level = "Low"
                risk_counts['Low'] += 1
            elif prob < 0.70:
                risk_level = "Medium"
                risk_counts['Medium'] += 1
            else:
                risk_level = "High"
                risk_counts['High'] += 1
            
            results.append({
                'customer_id': i + 1,
                'churn_probability': float(prob),
                'prediction': int(pred),
                'risk_level': risk_level
            })
        
        return BatchPredictionResponse(
            predictions=results,
            total_count=len(customers),
            high_risk_count=risk_counts['High'],
            medium_risk_count=risk_counts['Medium'],
            low_risk_count=risk_counts['Low']
        )
    
    except Exception as e:
        logger.error(f"Batch prediction error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Batch prediction failed: {str(e)}")


@app.get("/model-info", response_model=ModelMetricsResponse)
async def model_info():
    try:
        with open(MODEL_PATH / "model_results.json") as f:
            results = json.load(f)
        
        best_model_name = max(results.keys(), key=lambda x: results[x]['ROC-AUC'])
        best_roc_auc = results[best_model_name]['ROC-AUC']
        
        return ModelMetricsResponse(
            models=results,
            best_model=best_model_name,
            best_roc_auc=best_roc_auc
        )
    
    except Exception as e:
        logger.error(f"Error fetching model info: {str(e)}")
        raise HTTPException(status_code=400, detail="Failed to fetch model information")


@app.get("/")
async def root():
    return {
        "message": "Welcome to BeVivia Churn Intelligence API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "predict": "/predict (POST)",
            "batch_predict": "/batch-predict (POST)",
            "model_info": "/model-info",
            "docs": "/docs"
        }
    }


if STATIC_PATH.exists():
    app.mount("/", StaticFiles(directory=str(STATIC_PATH), html=True), name="static")


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unexpected error: {str(exc)}")
    return {
        "error": "Internal server error",
        "detail": str(exc)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
