import cardImgSrc from "../assets/cards/card.png";

export interface CardProps {
    rotate: number;
    size: number;
}

export function Card({ rotate, size }: CardProps) {
    return (
        <div className="inline-block select-none" style={{ transform: `rotate(${rotate}deg)` }}>
            <img src={cardImgSrc} draggable={false} style={{ height: `${size}px`, width: "auto" }} />
        </div>
    );
}
