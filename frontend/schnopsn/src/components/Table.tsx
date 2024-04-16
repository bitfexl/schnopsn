import { useRef, useState } from "react";
import { Card } from "./Card";
import { Draggable, DraggableCallbacks } from "./Draggable";
import { ManagedCard } from "./ManagedCard";

export interface TableProps {
    bgImgUrl: string;
}

export function Table({ bgImgUrl }: TableProps) {
    const [size, setSize] = useState(600);
    const dropZone = useRef<HTMLDivElement>();

    const [cardsActive, setCardsActive] = useState(true);

    function handleCardDragend({ clientX, clientY }: { clientX: number; clientY: number }, id: number) {
        if (isInside(dropZone.current!, clientX, clientY)) {
            setCardsActive(false);
            // TODO: play card
            alert("Played card " + id + ".");
            return true;
        }
        return false;
    }

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

                <div
                    ref={dropZone as any}
                    className="absolute left-[90px] top-[260px] w-[420px] h-[220px] rounded-2xl"
                    style={{ boxShadow: "0 0 0px black" }}
                ></div>

                <div className="absolute" style={{ top: "50px", left: "50px" }}>
                    <ManagedCard active={cardsActive} dropZoneChecker={(c) => handleCardDragend(c, 1)}>
                        <Card rotate={-10} size={120} card={{ color: "BLATT", value: "KOENIG" }}></Card>
                    </ManagedCard>
                </div>
                <div className="absolute" style={{ top: "35px", left: "150px" }}>
                    <ManagedCard active={cardsActive} dropZoneChecker={(c) => handleCardDragend(c, 2)}>
                        <Card rotate={-5} size={120} card={{ color: "BLATT", value: "KOENIG" }}></Card>
                    </ManagedCard>
                </div>
                <div className="absolute" style={{ top: "29px", left: "250px" }}>
                    <ManagedCard active={cardsActive} dropZoneChecker={(c) => handleCardDragend(c, 3)}>
                        <Card rotate={0} size={120} card={{ color: "BLATT", value: "KOENIG" }}></Card>
                    </ManagedCard>
                </div>
                <div className="absolute" style={{ top: "35px", left: "350px" }}>
                    <ManagedCard active={cardsActive} dropZoneChecker={(c) => handleCardDragend(c, 4)}>
                        <Card rotate={5} size={120} card={{ color: "BLATT", value: "KOENIG" }}></Card>
                    </ManagedCard>
                </div>
                <div className="absolute" style={{ top: "50px", left: "450px" }}>
                    <ManagedCard active={cardsActive} dropZoneChecker={(c) => handleCardDragend(c, 5)}>
                        <Card rotate={10} size={120} card={{ color: "BLATT", value: "KOENIG" }}></Card>
                    </ManagedCard>
                </div>
            </div>
        </div>
    );
}

function isInside(element: Element, x: number, y: number) {
    const b = element.getBoundingClientRect();
    return x >= b.x && x <= b.right && y >= b.y && y <= b.bottom;
}
