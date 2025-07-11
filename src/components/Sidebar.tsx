import Link from "next/link";

export default function Sidebar()
{
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <div className="text-xl font-bold mb-6">サイドバー</div>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700">ホーム</Link>
                    </li>
                    <li>
                        <Link href="/employees" className="block py-2 px-4 rounded hover:bg-gray-700">A</Link>
                    </li>
                    <li>
                        <Link href="/clients" className="block py-2 px-4 rounded hover:bg-gray-700">B</Link>
                    </li>
                    <li>
                        <Link href="/equipment" className="block py-2 px-4 rounded hover:bg-gray-700">C</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
