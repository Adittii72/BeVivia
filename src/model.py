"""
Model Training and Evaluation
Production-grade ML model management
"""

import numpy as np
import pandas as pd
import logging
from typing import Dict, Tuple, Any
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
try:
    from xgboost import XGBClassifier
    XGBOOST_AVAILABLE = True
except ImportError:
    XGBOOST_AVAILABLE = False

from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, classification_report,
    roc_curve, auc
)
from sklearn.model_selection import cross_val_score
import joblib

logger = logging.getLogger(__name__)


class ModelTrainer:
    """Production-grade model training and evaluation"""
    
    def __init__(self, random_state: int = 42):
        self.random_state = random_state
        self.models = {}
        self.metrics = {}
        self.preprocessor = None
        
    def train_logistic_regression(self, X_train: np.ndarray, y_train: np.ndarray) -> LogisticRegression:
        """Train Logistic Regression model"""
        logger.info("🔄 Training Logistic Regression...")
        
        model = LogisticRegression(
            C=1.0,
            max_iter=1000,
            random_state=self.random_state,
            solver='lbfgs',
            class_weight='balanced'
        )
        
        model.fit(X_train, y_train)
        logger.info("✅ Logistic Regression trained")
        
        return model
    
    def train_random_forest(self, X_train: np.ndarray, y_train: np.ndarray) -> RandomForestClassifier:
        """Train Random Forest model"""
        logger.info("🔄 Training Random Forest...")
        
        model = RandomForestClassifier(
            n_estimators=200,
            max_depth=15,
            min_samples_split=10,
            min_samples_leaf=4,
            random_state=self.random_state,
            n_jobs=-1,
            class_weight='balanced',
            verbose=0
        )
        
        model.fit(X_train, y_train)
        logger.info("✅ Random Forest trained")
        
        return model
    
    def train_xgboost(self, X_train: np.ndarray, y_train: np.ndarray) -> Any:
        """Train XGBoost model"""
        if not XGBOOST_AVAILABLE:
            logger.warning("⚠️  XGBoost not installed, skipping...")
            return None
        
        logger.info("🔄 Training XGBoost...")
        
        model = XGBClassifier(
            n_estimators=200,
            max_depth=6,
            learning_rate=0.1,
            random_state=self.random_state,
            subsample=0.8,
            colsample_bytree=0.8,
            scale_pos_weight=1.5,
            n_jobs=-1,
            eval_metric='logloss',
            verbosity=0
        )
        
        model.fit(X_train, y_train)
        logger.info("✅ XGBoost trained")
        
        return model
    
    def evaluate_model(self, model: Any, X_test: np.ndarray, y_test: np.ndarray, 
                      model_name: str) -> Dict[str, float]:
        """Comprehensive model evaluation"""
        logger.info(f"📊 Evaluating {model_name}...")
        
        # Predictions
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        
        # Metrics
        metrics = {
            'Accuracy': accuracy_score(y_test, y_pred),
            'Precision': precision_score(y_test, y_pred, zero_division=0),
            'Recall': recall_score(y_test, y_pred, zero_division=0),
            'F1-Score': f1_score(y_test, y_pred, zero_division=0),
            'ROC-AUC': roc_auc_score(y_test, y_pred_proba),
            'Specificity': confusion_matrix(y_test, y_pred)[0, 0] / (confusion_matrix(y_test, y_pred)[0, 0] + confusion_matrix(y_test, y_pred)[0, 1])
        }
        
        # Cross-validation score
        cv_scores = cross_val_score(model, X_test, y_test, cv=5, scoring='roc_auc')
        metrics['CV_Mean'] = cv_scores.mean()
        metrics['CV_Std'] = cv_scores.std()
        
        # Confusion matrix
        cm = confusion_matrix(y_test, y_pred)
        metrics['TN'] = cm[0, 0]
        metrics['FP'] = cm[0, 1]
        metrics['FN'] = cm[1, 0]
        metrics['TP'] = cm[1, 1]
        
        # Classification report
        metrics['Classification_Report'] = classification_report(y_test, y_pred)
        
        # ROC curve
        fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
        metrics['FPR'] = fpr.tolist()
        metrics['TPR'] = tpr.tolist()
        metrics['AUC'] = auc(fpr, tpr)
        
        logger.info(f"  ✅ Accuracy: {metrics['Accuracy']:.4f}")
        logger.info(f"  ✅ Recall: {metrics['Recall']:.4f}")
        logger.info(f"  ✅ ROC-AUC: {metrics['ROC-AUC']:.4f}")
        
        return metrics
    
    def train_all_models(self, X_train: np.ndarray, X_test: np.ndarray, 
                        y_train: np.ndarray, y_test: np.ndarray) -> Dict[str, Dict]:
        """Train and evaluate all models"""
        logger.info("=" * 60)
        logger.info("🤖 MODEL TRAINING & EVALUATION")
        logger.info("=" * 60)
        
        results = {}
        
        # 1. Logistic Regression
        lr_model = self.train_logistic_regression(X_train, y_train)
        self.models['Logistic Regression'] = lr_model
        results['Logistic Regression'] = self.evaluate_model(lr_model, X_test, y_test, 'Logistic Regression')
        
        # 2. Random Forest
        rf_model = self.train_random_forest(X_train, y_train)
        self.models['Random Forest'] = rf_model
        results['Random Forest'] = self.evaluate_model(rf_model, X_test, y_test, 'Random Forest')
        
        # 3. XGBoost
        if XGBOOST_AVAILABLE:
            xgb_model = self.train_xgboost(X_train, y_train)
            if xgb_model is not None:
                self.models['XGBoost'] = xgb_model
                results['XGBoost'] = self.evaluate_model(xgb_model, X_test, y_test, 'XGBoost')
        
        logger.info("=" * 60)
        logger.info("✅ MODEL TRAINING COMPLETED")
        logger.info("=" * 60)
        
        return results
    
    def get_best_model(self, results: Dict[str, Dict]) -> Tuple[str, Any, float]:
        """Get best model based on ROC-AUC"""
        best_model_name = max(results.keys(), key=lambda x: results[x]['ROC-AUC'])
        best_model = self.models[best_model_name]
        best_score = results[best_model_name]['ROC-AUC']
        
        logger.info(f"🏆 Best Model: {best_model_name} (ROC-AUC: {best_score:.4f})")
        
        return best_model_name, best_model, best_score
    
    def save_model(self, model: Any, filepath: str):
        """Save model to disk"""
        joblib.dump(model, filepath)
        logger.info(f"💾 Model saved to {filepath}")
    
    def load_model(self, filepath: str) -> Any:
        """Load model from disk"""
        model = joblib.load(filepath)
        logger.info(f"📂 Model loaded from {filepath}")
        return model


class PredictionEngine:
    """Production prediction engine"""
    
    def __init__(self, model: Any, preprocessor: Any):
        self.model = model
        self.preprocessor = preprocessor
    
    def predict(self, X: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """Make predictions with confidence scores"""
        predictions = self.model.predict(X)
        probabilities = self.model.predict_proba(X)[:, 1]
        
        return predictions, probabilities
    
    def batch_predict(self, X: pd.DataFrame) -> pd.DataFrame:
        """Batch predictions with metadata"""
        X_transformed = self.preprocessor.transform(X)
        predictions, probabilities = self.predict(X_transformed)
        
        results = pd.DataFrame({
            'prediction': predictions,
            'churn_probability': probabilities,
            'risk_level': pd.cut(probabilities, bins=[0, 0.3, 0.7, 1.0], labels=['Low', 'Medium', 'High'])
        })
        
        return results
