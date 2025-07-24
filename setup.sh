#!/bin/bash

# Portfolio Site Setup Script
echo "🚀 ポートフォリオサイトのセットアップを開始します..."

# 必要なパッケージをインストール
echo "📦 パッケージをインストール中..."
npm install firebase aws-sdk lucide-react framer-motion sharp react-hook-form zod date-fns clsx class-variance-authority
npm install -D @types/aws-sdk

# 環境変数ファイルの作成
echo "🔧 環境変数ファイルを作成中..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ .env.local が作成されました。必要な値を設定してください。"
else
    echo "⚠️  .env.local は既に存在します。"
fi

# Firebaseの設定確認
echo "🔥 Firebase設定の確認..."
echo "以下の手順でFirebaseプロジェクトを設定してください："
echo "1. https://console.firebase.google.com/ でプロジェクトを作成"
echo "2. Authentication を有効化"
echo "3. Firestore Database を作成"
echo "4. Storage を有効化"
echo "5. Web アプリを追加して設定情報を .env.local に記載"

# AWS設定の確認
echo "☁️  AWS設定の確認..."
echo "以下の手順でAWS S3を設定してください："
echo "1. AWS アカウントにログイン"
echo "2. S3 バケットを作成"
echo "3. IAM ユーザーを作成してS3の権限を付与"
echo "4. アクセスキーとシークレットキーを .env.local に記載"

# ディレクトリ構造の確認
echo "📁 ディレクトリ構造を確認中..."
mkdir -p public/games
mkdir -p public/images
mkdir -p public/videos

echo "✅ セットアップが完了しました！"
echo ""
echo "次のステップ："
echo "1. .env.local ファイルに必要な環境変数を設定"
echo "2. npm run dev でサーバーを起動"
echo "3. /admin/portfolio でポートフォリオアイテムを追加"
echo "4. /portfolio でポートフォリオを確認"
echo ""
echo "Happy coding! 🎉"
