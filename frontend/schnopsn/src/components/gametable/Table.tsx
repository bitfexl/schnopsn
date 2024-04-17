import { useRef, useState } from "react";
import { Card, Color, Value } from "./Card";
import { ManagedCard } from "./ManagedCard";
import { StichStack } from "./StichStack";

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
    const switchZone = useRef<HTMLDivElement>();

    const [cardsActive, setCardsActive] = useState(true);

    function handleCardDragend({ clientX, clientY }: { clientX: number; clientY: number }, card: Card) {
        if (isInside(switchZone.current!, clientX, clientY)) {
            alert("Switched card " + JSON.stringify(card) + ".");
        } else if (isInside(dropZone.current!, clientX, clientY)) {
            setCardsActive(false);
            // TODO: play card
            alert("Played card " + JSON.stringify(card) + ".");
            return true;
        }

        return false;
    }

    const ownCards: Card[] = [randomCard(), randomCard(), randomCard(), randomCard(), randomCard()];
    const ownStiche: Card[] = [randomCard(), randomCard(), randomCard()];
    const ownPoints = 33;

    const opponentCards = 5;
    const opponentStiche: Card[] = [randomCard(), randomCard(), randomCard()];

    const trumpfCard: Card = randomCard();

    const cardSize = size * 0.15;
    const cardTop = size * 0.7;
    const cardLeft = (size - cardSize * 0.8 * 5 + cardSize * 0.18) / 2;

    return (
        <div>
            <div className="inline-block leading-[0] relative">
                {/* background */}
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

                {/* card drop zone */}
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

                {/* cards in talon */}
                <div
                    ref={switchZone as any}
                    className="absolute top-1/2 -translate-y-1/2 right-[7%] p-[4%] pl-[8%] rounded-2xl"
                    style={{ boxShadow: `0 0 ${showDropArea ? 6 : 0}px darkblue` }}
                >
                    {/* TODO: fix bg when show drop zones is on */}
                    <Card rotate={-90} size={cardSize} card={trumpfCard}></Card>

                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <Card rotate={0} size={cardSize} card={"backside"}></Card>
                    </div>
                </div>

                {/* own cards */}
                {ownCards.map((card, i) => (
                    <div
                        className="absolute"
                        style={{ top: `${cardTop - cardSize * layoutProps[i].topOffset}px`, left: `${cardLeft + cardSize * 0.8 * i}px` }}
                    >
                        <ManagedCard active={cardsActive} dropZoneChecker={(c) => handleCardDragend(c, card)}>
                            <Card rotate={layoutProps[i].rotate} size={cardSize} card={card}></Card>
                        </ManagedCard>
                    </div>
                ))}

                {/* own Stiche */}
                <div className="absolute top-[44%] left-[2%]">
                    <StichStack cards={ownStiche} size={cardSize} text={ownPoints.toString()}></StichStack>
                </div>

                {/* opponent cards */}
                {new Array(opponentCards).fill(0).map((_, i) => (
                    <div
                        className="absolute"
                        style={{
                            top: `${cardTop * 0.1 + cardSize * layoutProps[i].topOffset}px`,
                            left: `${cardLeft * 1.2 + cardSize * 0.8 * i * 0.8}px`,
                        }}
                    >
                        <Card rotate={-layoutProps[i].rotate} size={cardSize * 0.8} card="backside"></Card>
                    </div>
                ))}

                {/* opponent Stiche */}
                <div className="absolute top-[22%] left-[8%]">
                    <StichStack cards={opponentStiche} size={cardSize * 0.8} text={null}></StichStack>
                </div>
            </div>
        </div>
    );
}

function isInside(element: Element, x: number, y: number) {
    const b = element.getBoundingClientRect();
    return x >= b.x && x <= b.right && y >= b.y && y <= b.bottom;
}

function randomCard(): Card {
    const colors: Color[] = ["HERZ", "SCHELLE", "BLATT", "EICHEL"];
    const values: Value[] = ["UNTER", "OBER", "KOENIG", "ZEHNER", "SAU"];

    return {
        color: colors[Math.floor(Math.random() * colors.length)],
        value: values[Math.floor(Math.random() * values.length)],
    };
}
