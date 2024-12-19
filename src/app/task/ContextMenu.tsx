import {ContextMenuProps } from './interface/ContextMenuProps'

const ContextMenu: React.FC<ContextMenuProps> = ({ position, onEdit, onDelete, onClose }) => (
    <div
      className="absolute bg-white border p-4 rounded shadow-lg z-50"
      style={{ top: position.y, left: position.x }}
    >
      <h2 className="text-xl font-bold mb-4">Task Actions</h2>
      <button
        onClick={onEdit}
        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mb-2 w-full"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 w-full"
      >
        Delete
      </button>
    </div>
  );
  
  export default ContextMenu;