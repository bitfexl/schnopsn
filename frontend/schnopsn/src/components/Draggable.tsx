import { MouseEvent, ReactNode, useEffect, useState } from "react";

export interface DraggableProps {
    children: ReactNode;
    mousePointer: boolean;
}

export function Draggable({ children, mousePointer }: DraggableProps) {
    const [startParams, setStartParams] = useState({ xOffset: 0, yOffset: 0, clientX: 0, clientY: 0 });
    const [dragging, setDragging] = useState(false);

    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleDrag: any = (e: MouseEvent) => {
            if (dragging) {
                setOffset({
                    x: e.clientX - startParams.clientX + startParams.xOffset,
                    y: e.clientY - startParams.clientY + startParams.yOffset,
                });
            }
        };

        document.addEventListener("mousemove", handleDrag);
        return () => document.removeEventListener("mousemove", handleDrag);
    }, [dragging, startParams]);

    useEffect(() => {
        const endDrag = () => setDragging(false);
        document.addEventListener("mouseup", endDrag);
        return () => document.removeEventListener("mouseup", endDrag);
    }, []);

    function startDrag(e: MouseEvent) {
        if (e.button == 0) {
            setStartParams({ xOffset: offset.x, yOffset: offset.y, clientX: e.clientX, clientY: e.clientY });
            setDragging(true);
        }
    }

    return (
        <div
            className="relative test-br"
            onMouseDown={startDrag}
            style={{ top: `${offset.y}px`, left: `${offset.x}px`, cursor: mousePointer ? "pointer" : "initial" }}
        >
            {children}
        </div>
    );
}
