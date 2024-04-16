import { MutableRefObject, MouseEvent as ReactMouseEvent, ReactNode, useEffect, useState } from "react";

export interface DraggableCallbacks {
    setOffset: (offset: { x: number; y: number }) => unknown;
    get offset(): { x: number; y: number };
}

export interface DraggableProps {
    children: ReactNode;
    mousePointer: boolean;
    onDragend: (endCords: { clientX: number; clientY: number }) => unknown;
    cbRef: MutableRefObject<DraggableCallbacks | undefined>;
    active: boolean;
}

export function Draggable({ children, mousePointer, onDragend, cbRef, active }: DraggableProps) {
    const [startParams, setStartParams] = useState({ xOffset: 0, yOffset: 0, clientX: 0, clientY: 0 });
    const [dragging, setDragging] = useState(false);

    const [offset, setOffset] = useState({ x: 0, y: 0 });

    cbRef.current = {
        setOffset,
        offset,
    };

    useEffect(() => {
        const handleDrag = (e: MouseEvent) => {
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
        const endDrag = (e: MouseEvent) => {
            if (dragging) {
                setDragging(false);
                onDragend({ clientX: e.clientX, clientY: e.clientY });
            }
        };

        document.addEventListener("mouseup", endDrag);
        return () => document.removeEventListener("mouseup", endDrag);
    }, [dragging, onDragend]);

    function startDrag(e: ReactMouseEvent) {
        if (active && e.button == 0) {
            setStartParams({ xOffset: offset.x, yOffset: offset.y, clientX: e.clientX, clientY: e.clientY });
            setDragging(true);
        }
    }

    return (
        <div
            className="relative"
            onMouseDown={startDrag}
            style={{ top: `${offset.y}px`, left: `${offset.x}px`, cursor: mousePointer ? "pointer" : "initial" }}
        >
            {children}
        </div>
    );
}
