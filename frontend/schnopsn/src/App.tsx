import { useState } from "react";
import { Table } from "./components/Table";
import bgImgUrl from "./assets/wood/wood1.jpg";

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col gap-6 m-10 mx-60">
            <h1 className="text-3xl border-b-2">Schnopsn</h1>
            <div>
                <button onClick={() => setCount((count) => count + 1)} className="border-2 border-gray-600 px-2">
                    count is {count}
                </button>
            </div>

            <Table bgImgUrl={bgImgUrl}></Table>
        </div>
    );
}
