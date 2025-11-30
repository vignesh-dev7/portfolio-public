#!/bin/bash

echo "🚀 Building Portfolio UI..."
yarn workspace portfolio-ui build || { echo "❌ Build Failed"; exit 1; }

echo "📦 Uploading to S3..."
aws s3 sync ./frontend/apps/portfolio-ui/dist s3://vigneshp-portfolio/ --delete || { echo "❌ S3 Sync Failed"; exit 1; }

CLOUDFRONT_ID="**********"

echo "🧹 Creating CloudFront cache invalidation..."
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_ID \
  --paths "/*" || { echo " CloudFront Invalidation Failed"; exit 1; }

echo "✨ Deployment Completed Successfully!"
