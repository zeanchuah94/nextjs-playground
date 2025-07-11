export default function DBTable({ columns, data, emptyMessage })
{
    return (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{column.header}</th>
                        ))}
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">アクション</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                            <td
                                key={colIndex}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                                {item[column.accessor]}
                            </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-2">
                                詳細
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                                編集
                            </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td
                            colSpan={columns.length + 1}
                            className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                            {emptyMessage || "データがありません"}
                        </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
