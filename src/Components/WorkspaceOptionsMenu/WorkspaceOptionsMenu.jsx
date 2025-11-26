import React, { useRef, useEffect } from 'react';
import './WorkspaceOptionsMenu.css';

const WorkspaceOptionsMenu = ({ isOpen, onClose, position, workspace, onEdit, onDelete }) => {
    const menuRef = useRef(null)

    useEffect(
        () => {
            const handleClickOutside = (event) => {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    onClose()
                }
            };

            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside)
            }

            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        },
        [isOpen, onClose]
    )

    if (!isOpen) return null

    const handleEdit = () => {
        onEdit(workspace)
        onClose()
    }

    const handleDelete = () => {
        onDelete(workspace)
        onClose()
    }

    return (
        <div 
            ref={menuRef}
            className="workspace-options-menu"
            style={{
                top: position.y,
                left: position.x
            }}
        >
            <button onClick={handleEdit} className="menu-item edit-item">
                Editar Workspace
            </button>
            <button onClick={handleDelete} className="menu-item delete-item">
                Eliminar Workspace
            </button>
        </div>
    )
}

export default WorkspaceOptionsMenu