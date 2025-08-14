export default function NameCard()
{
    return (
        <div className="max-w-sm h-max mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="flex flex-row">
                <div className="pl-5 pr-5 flex-none mt-auto mb-auto">
                    <img className="mx-auto rounded-full w-30 h-30 object-cover" src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-xl text-blue-600 font-semibold">Case Study</div>
                    <p className="mt-2 text-gray-500">こんにちは、今日はいい天気ですね。 Here are five ideas you can use to find your first customers.</p>
                    <div className="mt-4">
                        <a href="https://github.com/zeanchuah94" target="_blank" rel="noopener noreferrer">
                            <img className="h-10 w-10" src="/github-mark.png" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
