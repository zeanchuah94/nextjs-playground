// interactjsを使用してテスト用のページ
'use client'
import DraggableSquare from '@/components/draggablesquare';

export default function InteractJS() {
   const randomColor = () => {
        return "#" + ((1<<24)*Math.random() | 0).toString(16);
   }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="w-150 h-150 bg-gray-300">
                    <DraggableSquare id="1" color={randomColor()} />
                    <DraggableSquare id="2" color={randomColor()} />
                    <DraggableSquare id="3" color={randomColor()} />
                </div>
            </main>
        </div>
    );
}
