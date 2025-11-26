import React, { useRef, useEffect, useState } from 'react';
import './WorkspaceOptionsMenu.css';

const WorkspaceOptionsMenu = ({ isOpen, onClose, position, workspace, onEdit, onDelete }) => {
    const menuRef = useRef(null)
    const [adjustedPosition, setAdjustedPosition] = useState(position)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            adjustPosition()
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    const adjustPosition = () => {
        if (!menuRef.current) return

        const menuRect = menuRef.current.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        
        let newX = position.x
        let newY = position.y

        if (position.x + menuRect.width > viewportWidth - 10) {
            newX = viewportWidth - menuRect.width - 10
        }

        if (position.x < 10) {
            newX = 10
        }

        if (position.y + menuRect.height > viewportHeight - 10) {
            newY = viewportHeight - menuRect.height - 10
        }

        if (position.y < 10) {
            newY = 10
        }

        setAdjustedPosition({ x: newX, y: newY })
    }

    const handleEdit = () => {
        onEdit(workspace)
        onClose()
    }

    const handleDelete = () => {
        onDelete(workspace)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div 
            ref={menuRef}
            className="workspace-options-menu"
            style={{
                top: adjustedPosition.y,
                left: adjustedPosition.x
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