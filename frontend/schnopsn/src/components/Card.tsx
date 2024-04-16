import cardImgSrc from "../assets/cards/card.png";

export type Color = "HERZ" | "SCHELLE" | "BLATT" | "EICHEL";

export type Value = "UNTER" | "OBER" | "KOENIG" | "ZEHNER" | "SAU";

export interface Card {
    color: Color;
    value: Value;
}

export interface CardProps {
    rotate: number;
    size: number;
    card: Card | "backside";
}

export function Card({ rotate, size, card }: CardProps) {
    return (
        <div className="inline-block select-none" style={{ transform: `rotate(${rotate}deg)` }}>
            <img src={cardImgSrc} draggable={false} style={{ height: `${size}px`, width: "auto" }} />
            <pre className="leading-[1em] text-[10px]">{getText(card)}</pre>
        </div>
    );
}

function getText(card: Card | "backside") {
    if (typeof card === "string") {
        return card;
    }

    return card.color + " " + card.value;
}
