import { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Schnopsn</h1>
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        </div>
    );
}
