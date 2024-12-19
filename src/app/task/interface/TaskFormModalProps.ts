import { Task } from "./Task";

export interface TaskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Omit<Task, 'id'>) => void;
    isEditMode: boolean;
    initialTask?: Omit<Task, 'id'>;
}