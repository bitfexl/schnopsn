import { useState } from "react";
import { Table } from "./components/Table";
import bgImgUrl1 from "./assets/wood/wood1.jpg";
import bgImgUrl2 from "./assets/wood/wood2.jpg";
import bgImgUrl3 from "./assets/wood/wood3.jpg";
import { Button } from "./components/Button";

const bgImgUrls = [bgImgUrl1, bgImgUrl2, bgImgUrl3];

export default function App() {
    const [showDropArea, setShowDropArea] = useState(false);
    const [size, setSize] = useState(600);
    const [bgImgIndex, setBgImgIndex] = useState(0);

    return (
        <div className="flex flex-col gap-6 m-10 mx-60">
            <h1 className="text-3xl border-b-2">Schnopsn</h1>
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl underline">Hints</h2>
                    <Button onClick={() => setShowDropArea(!showDropArea)}>{showDropArea ? "Hide" : "Show"} drop area</Button>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-xl underline">Size</h2>
                    <Button onClick={() => setSize(size + 50)}>Increase</Button>
                    <Button onClick={() => setSize(size - 50)}>Decrease</Button>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-xl underline">Background</h2>
                    <p className="py-1 border-2 border-white">
                        Background {bgImgIndex + 1}/{bgImgUrls.length}
                    </p>
                    <Button onClick={() => setBgImgIndex(bgImgIndex + 1 < bgImgUrls.length ? bgImgIndex + 1 : 0)}> Next</Button>
                </div>
            </div>
            <br />
            <Table size={size} showDropArea={showDropArea} bgImgUrl={bgImgUrls[bgImgIndex]}></Table>
        </div>
    );
}
