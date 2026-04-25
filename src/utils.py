"""
Utility functions for BeVivia
"""

import numpy as np
import pandas as pd
from pathlib import Path
import json
import logging
from typing import Dict, List, Tuple, Any

logger = logging.getLogger(__name__)


def setup_logging(log_level: str = "INFO"):
    """Setup logging configuration"""
    logging.basicConfig(
        level=getattr(logging, log_level),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )


def load_data(filepath: str) -> pd.DataFrame:
    """Load dataset with error handling"""
    try:
        df = pd.read_csv(filepath)
        logger.info(f"Loaded dataset: {df.shape[0]} rows, {df.shape[1]} columns")
        return df
    except Exception as e:
        logger.error(f"Error loading data: {str(e)}")
        raise


def get_data_summary(df: pd.DataFrame) -> Dict[str, Any]:
    """Get comprehensive data summary"""
    summary = {
        'total_rows': len(df),
        'total_columns': len(df.columns),
        'memory_usage_mb': df.memory_usage(deep=True).sum() / 1024 ** 2,
        'missing_values': df.isnull().sum().to_dict(),
        'duplicates': df.duplicated().sum(),
        'numeric_stats': df.describe().to_dict(),
        'categorical_info': {}
    }
    
    for col in df.select_dtypes(include='object').columns:
        summary['categorical_info'][col] = {
            'unique_values': df[col].nunique(),
            'value_counts': df[col].value_counts().to_dict()
        }
    
    return summary


def save_json(data: Dict, filepath: str):
    """Save dictionary to JSON"""
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)
    logger.info(f"Saved to {filepath}")


def load_json(filepath: str) -> Dict:
    """Load JSON file"""
    with open(filepath, 'r') as f:
        return json.load(f)


def get_churn_distribution(df: pd.DataFrame) -> Dict:
    """Get churn distribution statistics"""
    churn_counts = df['Churn'].value_counts()
    churn_pct = df['Churn'].value_counts(normalize=True) * 100
    
    return {
        'counts': churn_counts.to_dict(),
        'percentages': churn_pct.to_dict(),
        'imbalance_ratio': churn_counts[0] / churn_counts[1] if 1 in churn_counts.index else 0
    }


def format_percentage(value: float) -> str:
    """Format value as percentage"""
    return f"{value * 100:.2f}%"


def get_risk_category(churn_prob: float) -> Tuple[str, str]:
    """Get risk category and color"""
    if churn_prob < 0.30:
        return "Low Risk", "green"
    elif churn_prob < 0.70:
        return "Medium Risk", "orange"
    else:
        return "High Risk", "red"
