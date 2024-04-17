import { Card } from "./Card";

export interface StichStackProps {
    cards: Card[];
    size: number;
    text: string | null;
}

export function StichStack({ cards, size, text }: StichStackProps) {
    return (
        <div>
            {/* TODO */}
            <div className="TODO: ONCLICK SHOW CARDS" style={{ padding: `0 ${size * 0.3}px ${size * 0.3}px ${size * 0.4}px` }}>
                <div className="relative">
                    {cards.length > 0 && <Card card={cards[0]} size={size} rotate={90}></Card>}
                    <div className="absolute top-[24%] -left-[10%]">
                        {cards.length > 1 && <Card card={cards[1]} size={size} rotate={125}></Card>}
                    </div>
                    <div className="absolute top-[10%] -left-[50%]">
                        {cards.length > 2 && <Card card="backside" size={size} rotate={0}></Card>}
                    </div>
                </div>
            </div>

            {text && (
                <div className="relative leading-normal text-center select-none">
                    <p className="inline-block px-2 bg-white rounded border" style={{ boxShadow: `0 0 3px black` }}>
                        {text}
                    </p>
                </div>
            )}
        </div>
    );
}
