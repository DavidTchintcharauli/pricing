import { Task } from "./Task";

export interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
  onContextMenu?: (event: React.MouseEvent) => void;
  isDragging?: boolean;
}