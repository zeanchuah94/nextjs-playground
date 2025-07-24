# 個人プロフィール・ポートフォリオサイト開発計画

## プロジェクト概要
AWSとFirebaseの無料枠を活用した個人プロフィール・ポートフォリオサイト

### 目標
- 個人履歴表示サイト
- ポートフォリオ展示サイト（画像、動画、Unity/UnrealEngineゲーム対応）

## 技術スタック
- **フロントエンド**: Next.js 14 (App Router)
- **認証・データベース**: Firebase (Firestore, Auth, Storage)
- **静的ファイル配信**: AWS S3 + CloudFront
- **ホスティング**: Vercel (無料枠)
- **ゲーム配信**: Unity WebGL + Unreal Engine HTML5

## マイルストーン

### Phase 1: 基盤構築 (週1-2)
- [x] プロジェクト初期設定
- [ ] Firebase プロジェクト設定
- [ ] AWS アカウント・S3バケット作成
- [ ] 基本レイアウト・ナビゲーション
- [ ] レスポンシブデザイン・ダークモード

### Phase 2: プロフィールサイト (週3-4)
- [ ] Firebase Auth 実装
- [ ] Firestore データ構造設計
- [ ] 履歴・スキル・経験の表示
- [ ] CMS機能（管理者用編集画面）

### Phase 3: ポートフォリオサイト (週5-7)
- [ ] 画像ギャラリー
- [ ] 動画プレーヤー
- [ ] ファイルアップロード機能
- [ ] Unity WebGL 対応
- [ ] Unreal Engine HTML5 対応

### Phase 4: 最適化・完成 (週8)
- [ ] パフォーマンス最適化
- [ ] SEO対応
- [ ] 最終テスト・デプロイ

## 無料枠制限
### Firebase
- Firestore: 1GB ストレージ、50,000読み取り/日
- Storage: 5GB ストレージ、1GB転送/日
- Hosting: 10GB ストレージ、360MB転送/日

### AWS
- S3: 5GB ストレージ、20,000 GET リクエスト/月
- CloudFront: 50GB転送/月

## セットアップコマンド
```bash
# パッケージインストール
npm install firebase aws-sdk framer-motion lucide-react
npm install -D @types/node

# 環境変数設定
cp .env.example .env.local
```
