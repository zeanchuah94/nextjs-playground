'use client';
import React from "react";
import Carousel from "@/components/Carousel";

export default function MaterialTailwindSamples() {
  // カルーセル画像データ
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
      alt: "Beautiful landscape 1",
      title: "美しい風景 1",
      description: "自然の美しさを捉えた素晴らしい風景写真です。"
    },
    {
      src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      alt: "Beautiful landscape 2",
      title: "美しい風景 2",
      description: "息を呑むような山々の景色です。"
    },
    {
      src: "https://images.unsplash.com/photo-1497436072909-f5e4be8b0031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
      alt: "Beautiful landscape 3",
      title: "美しい風景 3",
      description: "穏やかな湖の風景が心を癒してくれます。"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
      alt: "Beautiful landscape 4",
      title: "美しい風景 4",
      description: "雄大な山脈の絶景をお楽しみください。"
    },
    {
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
      alt: "Beautiful landscape 5",
      title: "美しい風景 5",
      description: "透明度抜群の湖面が鏡のように空を映します。"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">React カルーセル サンプル</h1>
          <p className="text-xl">Reactのみで実装したカルーセルコンポーネントのデモンストレーション</p>
        </div>
      </header>

      {/* カルーセルセクション */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">イメージカルーセル</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              画像リストを渡すだけで自動的に表示される、再利用可能なカルーセルコンポーネントです。
              自動再生、ナビゲーション、ドットインジケーターなどの機能が含まれています。
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* メインカルーセル（自動再生あり） */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">自動再生カルーセル</h3>
              <Carousel
                images={carouselImages}
                autoPlay={true}
                autoPlayInterval={4000}
                height="h-96"
                className="shadow-lg"
              />
            </div>

            {/* 手動操作カルーセル */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">手動操作カルーセル</h3>
              <Carousel
                images={carouselImages.slice(0, 3)}
                autoPlay={false}
                height="h-80"
                className="shadow-lg"
              />
            </div>

            {/* コンパクトカルーセル */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">コンパクトカルーセル</h3>
              <Carousel
                images={carouselImages.slice(1, 4)}
                autoPlay={true}
                autoPlayInterval={2500}
                height="h-64"
                showDots={false}
                className="shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 特徴説明セクション */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">カルーセルの特徴</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">自動再生機能</h3>
              <p className="text-gray-600">設定した間隔で自動的に次の画像に切り替わります。</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v12a1 1 0 001 1h8a1 1 0 001-1V8M9 8h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">レスポンシブ対応</h3>
              <p className="text-gray-600">どのデバイスサイズでも美しく表示されます。</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-purple-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">カスタマイズ可能</h3>
              <p className="text-gray-600">高さ、自動再生、ナビゲーション表示などを自由に設定できます。</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-red-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">アクセシビリティ</h3>
              <p className="text-gray-600">キーボード操作やスクリーンリーダーに対応しています。</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-yellow-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">高性能</h3>
              <p className="text-gray-600">CSSアニメーションとNext.js Imageを使用した最適化済み。</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">簡単実装</h3>
              <p className="text-gray-600">画像の配列を渡すだけで、すぐに使用できます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-2">React カルーセル サンプルページ</h3>
          <p className="text-gray-400">© 2025 All rights reserved. Powered by React & Next.js</p>
        </div>
      </footer>
    </div>
  );
}
