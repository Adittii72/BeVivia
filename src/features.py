"""
Advanced Feature Engineering Pipeline
Production-grade feature transformations
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import logging

logger = logging.getLogger(__name__)


class FeatureEngineer:
    """Advanced feature engineering for churn prediction"""
    
    def __init__(self):
        self.tenure_bins = [0, 6, 12, 24, 72]
        self.tenure_labels = ['New (0-6m)', 'Early (6-12m)', 'Established (12-24m)', 'Loyal (24m+)']
        
    def create_derived_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create advanced derived features"""
        df_copy = df.copy()
        
        # Clean numeric columns first
        df_copy['TotalCharges'] = pd.to_numeric(df_copy['TotalCharges'], errors='coerce').fillna(0)
        df_copy['MonthlyCharges'] = pd.to_numeric(df_copy['MonthlyCharges'], errors='coerce').fillna(0)
        df_copy['tenure'] = pd.to_numeric(df_copy['tenure'], errors='coerce').fillna(0)
        
        # 1. Tenure buckets (customer lifecycle)
        df_copy['tenure_bucket'] = pd.cut(
            df_copy['tenure'],
            bins=self.tenure_bins,
            labels=self.tenure_labels,
            include_lowest=True
        )
        
        # 2. Service engagement score (1-7 services)
        service_cols = [
            'PhoneService', 'MultipleLines', 'OnlineSecurity', 'OnlineBackup',
            'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies'
        ]
        df_copy['service_count'] = (df_copy[service_cols] == 'Yes').sum(axis=1)
        
        # 3. Engagement score (combines tenure + services)
        df_copy['engagement_score'] = (
            (df_copy['tenure'] / (df_copy['tenure'].max() + 1) * 0.5) +
            (df_copy['service_count'] / 8.0 * 0.5)
        )
        
        # 4. Charge analysis
        df_copy['charge_ratio'] = (
            df_copy['MonthlyCharges'] / (df_copy['TotalCharges'] + 1)
        ).fillna(0)
        
        # Average monthly from total
        df_copy['monthly_to_avg_ratio'] = (
            df_copy['MonthlyCharges'] / (df_copy['TotalCharges'] / (df_copy['tenure'] + 1) + 1)
        ).fillna(0)
        
        # 5. Contract stability score
        contract_map = {'Month-to-month': 0.3, 'One year': 0.6, 'Two year': 1.0}
        df_copy['contract_stability'] = df_copy['Contract'].map(contract_map)
        
        # 6. Internet service risk
        internet_risk = {'Fiber optic': 0.8, 'DSL': 0.5, 'No': 0.2}
        df_copy['internet_risk'] = df_copy['InternetService'].map(internet_risk)
        
        # 7. Payment method risk
        auto_payment = ['Bank transfer (automatic)', 'Credit card (automatic)']
        df_copy['is_auto_payment'] = df_copy['PaymentMethod'].isin(auto_payment).astype(int)
        
        logger.info("✅ Created 7 advanced derived features")
        return df_copy
    
    def create_preprocessing_pipeline(self, X_train: pd.DataFrame) -> ColumnTransformer:
        """Create sklearn preprocessing pipeline"""
        
        # Categorical features
        categorical_features = [
            'gender', 'SeniorCitizen', 'Partner', 'Dependents',
            'PhoneService', 'MultipleLines', 'InternetService',
            'OnlineSecurity', 'OnlineBackup', 'DeviceProtection',
            'TechSupport', 'StreamingTV', 'StreamingMovies',
            'Contract', 'PaperlessBilling', 'PaymentMethod', 'tenure_bucket'
        ]
        
        # Numerical features (including derived)
        numerical_features = [
            'MonthlyCharges', 'TotalCharges', 'tenure',
            'service_count', 'engagement_score', 'charge_ratio',
            'monthly_to_avg_ratio', 'contract_stability',
            'internet_risk', 'is_auto_payment'
        ]
        
        # Preprocessing pipeline
        preprocessor = ColumnTransformer(
            transformers=[
                ('cat', OneHotEncoder(sparse_output=False, handle_unknown='ignore'), categorical_features),
                ('num', StandardScaler(), numerical_features)
            ],
            remainder='drop'
        )
        
        # Fit on training data
        preprocessor.fit(X_train)
        logger.info("✅ Preprocessing pipeline created and fitted")
        
        return preprocessor, categorical_features, numerical_features
    
    def transform_features(self, df: pd.DataFrame, preprocessor: ColumnTransformer, 
                          categorical_features: list, numerical_features: list) -> np.ndarray:
        """Transform features using pipeline"""
        return preprocessor.transform(df)


class FeatureImportanceAnalyzer:
    """Analyze and interpret feature importance"""
    
    @staticmethod
    def get_feature_names(preprocessor: ColumnTransformer, 
                         categorical_features: list, 
                         numerical_features: list) -> list:
        """Extract feature names from preprocessor"""
        feature_names = []
        
        # Get categorical feature names
        cat_encoder = preprocessor.named_transformers_['cat']
        cat_names = cat_encoder.get_feature_names_out(categorical_features)
        feature_names.extend(cat_names)
        
        # Add numerical feature names
        feature_names.extend(numerical_features)
        
        return feature_names
    
    @staticmethod
    def get_top_features(feature_importance: np.ndarray, 
                        feature_names: list, 
                        top_n: int = 10) -> pd.DataFrame:
        """Get top N important features"""
        importance_df = pd.DataFrame({
            'feature': feature_names,
            'importance': feature_importance
        }).sort_values('importance', ascending=False)
        
        return importance_df.head(top_n)
