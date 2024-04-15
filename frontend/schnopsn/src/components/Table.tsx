import { useState } from "react";
import { Card } from "./Card";
import { Draggable } from "./Draggable";

export interface TableProps {
    bgImgUrl: string;
}

export function Table({ bgImgUrl }: TableProps) {
    const [size, setSize] = useState(600);

    return (
        <div>
            <div className="test-br inline-block leading-[0] relative">
                <div
                    className="test-br inline-block rounded-full bg-yellow-800"
                    style={{
                        backgroundImage: `url(${bgImgUrl})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: `${size}px`,
                        height: `${size}px`,
                    }}
                ></div>

                <div className="absolute" style={{ top: "50px", left: "50px" }}>
                    <Card rotate={-10} size={120}></Card>
                </div>
                <div className="absolute" style={{ top: "35px", left: "150px" }}>
                    <Card rotate={-5} size={120}></Card>
                </div>
                <div className="absolute" style={{ top: "29px", left: "250px" }}>
                    <Card rotate={0} size={120}></Card>
                </div>
                <div className="absolute" style={{ top: "35px", left: "350px" }}>
                    <Card rotate={5} size={120}></Card>
                </div>
                <div className="absolute" style={{ top: "50px", left: "450px" }}>
                    <Draggable mousePointer={true}>
                        <Card rotate={10} size={120}></Card>
                    </Draggable>
                </div>
            </div>
        </div>
    );
}
