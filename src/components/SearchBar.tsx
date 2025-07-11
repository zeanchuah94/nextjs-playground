import { useState } from "react";

export default function SearchBar({placeholder = "検索...", onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        if (onSearch) {
            e.preventDefault();
            onSearch(searchTerm);
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={placeholder} className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    検索
                </button>
            </div>
        </form>
    );
}
