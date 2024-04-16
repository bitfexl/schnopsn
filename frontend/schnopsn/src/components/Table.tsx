import { useRef, useState } from "react";
import { Card } from "./Card";
import { ManagedCard } from "./ManagedCard";

const layoutProps = [
    {
        topOffset: 0,
        rotate: -10,
    },
    {
        topOffset: 0.125,
        rotate: -5,
    },
    {
        topOffset: 0.175,
        rotate: 0,
    },
    {
        topOffset: 0.125,
        rotate: 5,
    },
    {
        topOffset: 0,
        rotate: 10,
    },
];

export interface TableProps {
    bgImgUrl: string;
    showDropArea: boolean;
    size: number;
}

export function Table({ bgImgUrl, showDropArea, size }: TableProps) {
    const dropZone = useRef<HTMLDivElement>();

    const [cardsActive, setCardsActive] = useState(true);

    function handleCardDragend({ clientX, clientY }: { clientX: number; clientY: number }, card: Card) {
        if (isInside(dropZone.current!, clientX, clientY)) {
            setCardsActive(false);
            // TODO: play card
            alert("Played card " + JSON.stringify(card) + ".");
            return true;
        }
        return false;
    }

    const cards: Card[] = [
        { color: "BLATT", value: "KOENIG" },
        { color: "BLATT", value: "KOENIG" },
        { color: "BLATT", value: "KOENIG" },
        { color: "BLATT", value: "KOENIG" },
        { color: "BLATT", value: "KOENIG" },
    ];

    const cardSize = size * 0.15;
    const cardTop = size * 0.7;
    const cardLeft = (size - cardSize * 0.8 * 5 + cardSize * 0.18) / 2;

    return (
        <div>
            <div className="inline-block leading-[0] relative">
                <div
                    className="inline-block rounded-full bg-yellow-800 shadow-lg"
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
                    className="absolute rounded-2xl"
                    style={{
                        left: `${size * 0.1}px`,
                        top: `${size * 0.2}px`,
                        height: `${size * 0.4}px`,
                        width: `${size * 0.8}px`,
                        boxShadow: `0 0 ${showDropArea ? 6 : 0}px black`,
                    }}
                ></div>

                {cards.map((card, i) => (
                    <div
                        className="absolute"
                        style={{ top: `${cardTop - cardSize * layoutProps[i].topOffset}px`, left: `${cardLeft + cardSize * 0.8 * i}px` }}
                    >
                        <ManagedCard active={cardsActive} dropZoneChecker={(c) => handleCardDragend(c, card)}>
                            <Card rotate={layoutProps[i].rotate} size={cardSize} card={card}></Card>
                        </ManagedCard>
                    </div>
                ))}
            </div>
        </div>
    );
}

function isInside(element: Element, x: number, y: number) {
    const b = element.getBoundingClientRect();
    return x >= b.x && x <= b.right && y >= b.y && y <= b.bottom;
}
