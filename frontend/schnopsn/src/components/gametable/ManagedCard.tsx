import { ReactNode, useRef } from "react";
import { Draggable, DraggableCallbacks } from "../Draggable";

export interface ManagedCardProps {
    children: ReactNode;
    active: boolean;
    dropZoneChecker: (endCords: { clientX: number; clientY: number }) => boolean;
}

export function ManagedCard({ children, dropZoneChecker, active }: ManagedCardProps) {
    const cardRef = useRef<DraggableCallbacks>();

    function handleDragend(endCords: { clientX: number; clientY: number }) {
        if (!dropZoneChecker(endCords)) {
            cardRef.current?.setOffset({ x: 0, y: 0 });
        }
    }

    return (
        <Draggable onDragend={handleDragend} cbRef={cardRef} active={active} mousePointer={active}>
            {children}
        </Draggable>
    );
}
