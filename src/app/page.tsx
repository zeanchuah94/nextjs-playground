import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-5">ダッシュボード</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-gray-600 text-xl font-semibold mb-2">情報①</h2>
                <p className="text-gray-600 mb-4">情報②</p>
                <Link href="/employees" className="text-blue-600 hover:text-blue-800 font-medium">Employees検索</Link>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-gray-600 text-xl font-semibold mb-2">情報③</h2>
                <p className="text-gray-600 mb-4">情報④</p>
                <Link href="/clients" className="text-blue-600 hover:text-blue-800 font-medium">Clients検索</Link>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-gray-600 text-xl font-semibold mb-2">情報⑤</h2>
                <p className="text-gray-600 mb-4">情報⑥</p>
                <Link href="/equipment" className="text-blue-600 hover:text-blue-800 font-medium">InteractJSテスト</Link>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-gray-600 text-xl font-semibold mb-4">情報⑦</h2>
                <ul className="space-y-3">
                    <li className="pb-3 border-b">
                        ここでなんかを表示する
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
}
