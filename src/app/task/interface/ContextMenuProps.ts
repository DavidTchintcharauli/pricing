export interface ContextMenuProps {
    position: { x: number; y: number };
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
}