"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import DBTable from "@/components/DBTable";
import { getEquipment } from "@/firebase/firestore";

export default function EquipmentPage()
{
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const columns = [
        { header: "ID", accessor: "id" },
        { header: "備品名", accessor: "name" },
        { header: "型番", accessor: "model" },
        { header: "メーカー", accessor: "manufacturer" },
        { header: "購入日", accessor: "purchaseDate" },
        { header: "価格", accessor: "price" },
        { header: "数量", accessor: "quantity" }
    ]

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async (term = "") => {
        try {
            setLoading(true);
            const data = await getEquipment(term);
            setEquipment(data);
            setError(null);
        } catch (err) {
            setError("データの取得に失敗しました");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        fetchEquipment(term);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">検索</h1>
            <SearchBar placeholder="検索中..." onSearch={handleSearch} />

            {loading ? (
                <div className="text-center py-4">読み込み中...</div>
            ) : error ? (
                <div className="text-red-700 border border-red-400 bg-red-100 px-4 py-3 rounded mb-4 text-center">{error}</div>
            ) : (
                <DBTable columns={columns} data={equipment.length > 0 ? equipment : []} emptyMessage="データがありません" />
            )}
        </div>
    )
}
