"""
Data Processing Pipeline
Production-grade data handling with validation
"""

import pandas as pd
import numpy as np
import logging
from typing import Tuple
from sklearn.model_selection import train_test_split

logger = logging.getLogger(__name__)


class DataPipeline:
    """Production-ready data processing pipeline"""
    
    def __init__(self, random_state: int = 42, test_size: float = 0.2):
        self.random_state = random_state
        self.test_size = test_size
        self.schema = None
        self.original_shape = None
        
    def validate_schema(self, df: pd.DataFrame) -> bool:
        """Validate data schema"""
        required_columns = {
            'customerID', 'tenure', 'MonthlyCharges', 'TotalCharges', 'Churn'
        }
        
        missing_cols = required_columns - set(df.columns)
        if missing_cols:
            logger.error(f"❌ Missing columns: {missing_cols}")
            return False
        
        logger.info("✅ Schema validation passed")
        return True
    
    def handle_missing_values(self, df: pd.DataFrame) -> pd.DataFrame:
        """Handle missing values with strategy"""
        df_copy = df.copy()
        
        # Log missing values
        missing_pct = (df_copy.isnull().sum() / len(df_copy)) * 100
        if missing_pct.sum() > 0:
            logger.info(f"Missing values detected:\n{missing_pct[missing_pct > 0]}")
        
        # Handle numeric columns - fill with median
        numeric_cols = df_copy.select_dtypes(include=[np.number]).columns
        for col in numeric_cols:
            if df_copy[col].isnull().any():
                df_copy[col].fillna(df_copy[col].median(), inplace=True)
        
        # Handle categorical columns - fill with mode
        categorical_cols = df_copy.select_dtypes(include='object').columns
        for col in categorical_cols:
            if df_copy[col].isnull().any():
                df_copy[col].fillna(df_copy[col].mode()[0], inplace=True)
        
        logger.info("✅ Missing values handled")
        return df_copy
    
    def handle_outliers(self, df: pd.DataFrame, method: str = 'iqr') -> pd.DataFrame:
        """Detect and handle outliers"""
        df_copy = df.copy()
        
        numeric_cols = df_copy.select_dtypes(include=[np.number]).columns
        outlier_count = 0
        
        for col in numeric_cols:
            if method == 'iqr':
                Q1 = df_copy[col].quantile(0.25)
                Q3 = df_copy[col].quantile(0.75)
                IQR = Q3 - Q1
                lower = Q1 - 1.5 * IQR
                upper = Q3 + 1.5 * IQR
                
                outliers = ((df_copy[col] < lower) | (df_copy[col] > upper)).sum()
                if outliers > 0:
                    logger.info(f"  {col}: {outliers} outliers detected (capped)")
                    df_copy[col] = df_copy[col].clip(lower, upper)
                    outlier_count += outliers
        
        if outlier_count > 0:
            logger.info(f"✅ Handled {outlier_count} outliers using {method} method")
        
        return df_copy
    
    def encode_target(self, df: pd.DataFrame) -> pd.DataFrame:
        """Encode target variable"""
        df_copy = df.copy()
        
        if 'Churn' in df_copy.columns:
            # Binary encoding: Yes/No -> 1/0
            df_copy['Churn'] = (df_copy['Churn'] == 'Yes').astype(int)
            
            churn_dist = df_copy['Churn'].value_counts()
            churn_pct = df_copy['Churn'].value_counts(normalize=True) * 100
            
            logger.info(f"✅ Target encoding completed:")
            logger.info(f"   No Churn (0): {churn_dist.get(0, 0)} ({churn_pct.get(0, 0):.2f}%)")
            logger.info(f"   Churn (1): {churn_dist.get(1, 0)} ({churn_pct.get(1, 0):.2f}%)")
        
        return df_copy
    
    def clean_numeric_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        """Clean numeric columns (fix type issues)"""
        df_copy = df.copy()
        
        # TotalCharges often contains spaces
        if 'TotalCharges' in df_copy.columns:
            df_copy['TotalCharges'] = pd.to_numeric(
                df_copy['TotalCharges'], 
                errors='coerce'
            ).fillna(0)
        
        # Ensure numeric columns are float
        numeric_cols = ['MonthlyCharges', 'TotalCharges', 'tenure']
        for col in numeric_cols:
            if col in df_copy.columns:
                df_copy[col] = pd.to_numeric(df_copy[col], errors='coerce').fillna(0)
        
        logger.info("✅ Numeric columns cleaned")
        return df_copy
    
    def split_data(self, df: pd.DataFrame, 
                   target_col: str = 'Churn') -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
        """Split into train/test with stratification"""
        
        X = df.drop(['customerID', target_col], axis=1, errors='ignore')
        y = df[target_col]
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y,
            test_size=self.test_size,
            random_state=self.random_state,
            stratify=y
        )
        
        logger.info(f"✅ Data split completed:")
        logger.info(f"   Train set: {X_train.shape[0]} samples ({X_train.shape[0]/len(df)*100:.1f}%)")
        logger.info(f"   Test set: {X_test.shape[0]} samples ({X_test.shape[0]/len(df)*100:.1f}%)")
        logger.info(f"   Train churn rate: {y_train.mean()*100:.2f}%")
        logger.info(f"   Test churn rate: {y_test.mean()*100:.2f}%")
        
        return X_train, X_test, y_train, y_test
    
    def run_full_pipeline(self, df: pd.DataFrame) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
        """Execute complete data processing pipeline"""
        logger.info("=" * 60)
        logger.info("🔄 STARTING DATA PIPELINE")
        logger.info("=" * 60)
        
        # 1. Validation
        if not self.validate_schema(df):
            raise ValueError("Schema validation failed")
        
        self.original_shape = df.shape
        
        # 2. Clean numeric columns
        df = self.clean_numeric_columns(df)
        
        # 3. Handle missing values
        df = self.handle_missing_values(df)
        
        # 4. Handle outliers
        df = self.handle_outliers(df)
        
        # 5. Encode target
        df = self.encode_target(df)
        
        # 6. Split data
        X_train, X_test, y_train, y_test = self.split_data(df)
        
        logger.info("=" * 60)
        logger.info("✅ DATA PIPELINE COMPLETED SUCCESSFULLY")
        logger.info("=" * 60)
        
        return X_train, X_test, y_train, y_test
