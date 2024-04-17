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
    const cardSrc = "/cards/" + (card == "backside" ? "BACKSIDE" : card.color + "_" + card.value) + ".webp";

    return (
        <div className="inline-block select-none" style={{ transform: `rotate(${rotate}deg)` }}>
            <img
                className="rounded-[6%] border border-gray-400"
                src={cardSrc}
                draggable={false}
                style={{ height: `${size}px`, width: "auto" }}
            />
        </div>
    );
}
