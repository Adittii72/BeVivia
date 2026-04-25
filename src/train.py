"""
Main Training Script
End-to-end model training and evaluation
"""

import sys
import logging
from pathlib import Path
import joblib
import json
import pandas as pd
import numpy as np

# Setup paths
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / 'src'))

from config import *
from utils import load_data, setup_logging, get_churn_distribution
from pipeline import DataPipeline
from features import FeatureEngineer, FeatureImportanceAnalyzer
from model import ModelTrainer, PredictionEngine

# Setup logging
setup_logging("INFO")
logger = logging.getLogger(__name__)


def main():
    """Main training pipeline"""
    
    # ============================================================================
    # STEP 1: LOAD DATA
    # ============================================================================
    logger.info("\n" + "="*80)
    logger.info("BEVIVA - CUSTOMER CHURN INTELLIGENCE PLATFORM")
    logger.info("="*80)
    
    logger.info("\n📂 STEP 1: LOADING DATA")
    df = load_data(str(DATA_FILE))
    
    # Data overview
    logger.info(f"\n📊 Dataset Overview:")
    logger.info(f"   Shape: {df.shape}")
    logger.info(f"   Columns: {df.columns.tolist()}")
    
    # Churn distribution
    churn_dist = get_churn_distribution(df)
    logger.info(f"\n📈 Churn Distribution:")
    logger.info(f"   No Churn: {churn_dist['counts'].get('No', 0)} ({churn_dist['percentages'].get('No', 0):.2f}%)")
    logger.info(f"   Churn: {churn_dist['counts'].get('Yes', 0)} ({churn_dist['percentages'].get('Yes', 0):.2f}%)")
    logger.info(f"   Imbalance Ratio: {churn_dist['imbalance_ratio']:.2f}:1")
    
    # ============================================================================
    # STEP 2: FEATURE ENGINEERING
    # ============================================================================
    logger.info("\n\n🔧 STEP 2: FEATURE ENGINEERING")
    
    feature_engineer = FeatureEngineer()
    df = feature_engineer.create_derived_features(df)
    
    logger.info(f"\n✨ Enhanced Features:")
    logger.info(f"   Total features: {len(df.columns)}")
    logger.info(f"   Derived features: {len(DERIVED_FEATURES)}")
    
    # ============================================================================
    # STEP 3: DATA PROCESSING
    # ============================================================================
    logger.info("\n\n📊 STEP 3: DATA PROCESSING PIPELINE")
    
    data_pipeline = DataPipeline(
        random_state=RANDOM_STATE,
        test_size=TEST_SIZE
    )
    
    X_train, X_test, y_train, y_test = data_pipeline.run_full_pipeline(df)
    
    logger.info(f"\n📋 Training Set Features:")
    logger.info(f"   Shape: {X_train.shape}")
    logger.info(f"   Columns: {X_train.columns.tolist()}")
    
    # ============================================================================
    # STEP 4: PREPROCESSING PIPELINE (Encoding + Scaling)
    # ============================================================================
    logger.info("\n\n⚙️  STEP 4: PREPROCESSING PIPELINE (Encoding + Scaling)")
    
    preprocessor, cat_features, num_features = feature_engineer.create_preprocessing_pipeline(X_train)
    
    logger.info(f"\n✅ Preprocessing Details:")
    logger.info(f"   Categorical features: {len(cat_features)}")
    logger.info(f"   Numerical features: {len(num_features)}")
    
    # Transform features
    X_train_transformed = feature_engineer.transform_features(X_train, preprocessor, cat_features, num_features)
    X_test_transformed = feature_engineer.transform_features(X_test, preprocessor, cat_features, num_features)
    
    logger.info(f"   Transformed train shape: {X_train_transformed.shape}")
    logger.info(f"   Transformed test shape: {X_test_transformed.shape}")
    
    # ============================================================================
    # STEP 5: MODEL TRAINING
    # ============================================================================
    logger.info("\n\n🤖 STEP 5: MODEL TRAINING & EVALUATION")
    
    model_trainer = ModelTrainer(random_state=RANDOM_STATE)
    results = model_trainer.train_all_models(X_train_transformed, X_test_transformed, y_train, y_test)
    
    # ============================================================================
    # STEP 6: MODEL COMPARISON
    # ============================================================================
    logger.info("\n\n📊 STEP 6: MODEL COMPARISON")
    
    comparison_df = pd.DataFrame({
        model_name: {
            'Accuracy': metrics['Accuracy'],
            'Precision': metrics['Precision'],
            'Recall': metrics['Recall'],
            'F1-Score': metrics['F1-Score'],
            'ROC-AUC': metrics['ROC-AUC']
        }
        for model_name, metrics in results.items()
    }).T
    
    logger.info("\n" + comparison_df.to_string())
    
    # ============================================================================
    # STEP 7: SELECT BEST MODEL
    # ============================================================================
    logger.info("\n\n🏆 STEP 7: BEST MODEL SELECTION")
    
    best_model_name, best_model, best_score = model_trainer.get_best_model(results)
    logger.info(f"\n   Selected: {best_model_name} (ROC-AUC: {best_score:.4f})")
    
    # ============================================================================
    # STEP 8: FEATURE IMPORTANCE
    # ============================================================================
    logger.info("\n\n⭐ STEP 8: FEATURE IMPORTANCE ANALYSIS")
    
    if hasattr(best_model, 'feature_importances_'):
        feature_names = FeatureImportanceAnalyzer.get_feature_names(preprocessor, cat_features, num_features)
        top_features = FeatureImportanceAnalyzer.get_top_features(
            best_model.feature_importances_,
            feature_names,
            top_n=10
        )
        
        logger.info("\n🎯 Top 10 Important Features:")
        for idx, (feature, importance) in enumerate(zip(top_features['feature'], top_features['importance']), 1):
            logger.info(f"   {idx}. {feature}: {importance:.4f}")
    
    # ============================================================================
    # STEP 9: SAVE MODELS & ARTIFACTS
    # ============================================================================
    logger.info("\n\n💾 STEP 9: SAVING MODELS & ARTIFACTS")
    
    MODEL_PATH.mkdir(exist_ok=True)
    
    # Save models
    for model_name, model in model_trainer.models.items():
        model_file = MODEL_PATH / f"{model_name.lower().replace(' ', '_')}.pkl"
        model_trainer.save_model(model, str(model_file))
    
    # Save preprocessor
    preprocessor_file = MODEL_PATH / "preprocessor.pkl"
    joblib.dump(preprocessor, str(preprocessor_file))
    logger.info(f"💾 Preprocessor saved to {preprocessor_file}")
    
    # Save results
    results_file = MODEL_PATH / "model_results.json"
    results_clean = {}
    for model_name, metrics in results.items():
        # Remove non-serializable items
        clean_metrics = {k: v for k, v in metrics.items() 
                        if k not in ['FPR', 'TPR', 'Classification_Report']}
        # Convert numpy types
        clean_metrics = {k: float(v) if isinstance(v, (np.number, np.ndarray)) else v 
                        for k, v in clean_metrics.items()}
        results_clean[model_name] = clean_metrics
    
    with open(results_file, 'w') as f:
        json.dump(results_clean, f, indent=4)
    logger.info(f"💾 Results saved to {results_file}")
    
    # Save comparison
    comparison_file = MODEL_PATH / "model_comparison.csv"
    comparison_df.to_csv(comparison_file)
    logger.info(f"💾 Comparison saved to {comparison_file}")
    
    # ============================================================================
    # STEP 10: SUMMARY
    # ============================================================================
    logger.info("\n\n" + "="*80)
    logger.info("✅ TRAINING PIPELINE COMPLETED SUCCESSFULLY!")
    logger.info("="*80)
    
    logger.info(f"\n📦 Generated Artifacts:")
    logger.info(f"   ✓ {len(model_trainer.models)} trained models")
    logger.info(f"   ✓ Preprocessing pipeline")
    logger.info(f"   ✓ Model results & comparison")
    logger.info(f"   ✓ Feature importance analysis")
    
    logger.info(f"\n🚀 Ready for deployment!")
    logger.info(f"   Best Model: {best_model_name}")
    logger.info(f"   ROC-AUC Score: {best_score:.4f}")
    
    return model_trainer, preprocessor, results


if __name__ == "__main__":
    main()
