import {useState} from 'react'
import {Task, TaskStatus} from '@types'
import {DeleteConfirmationModal} from '../deleteConfirmationModal'
import {Icon} from '../icon'

interface TaskItemViewProps {
  task: Task
  isUpdating: boolean
  onEdit: () => void
  onStatusChange: (status: TaskStatus) => void
  onDelete: () => void
}

export const TaskItemView = ({task, isUpdating, onEdit, onStatusChange, onDelete}: TaskItemViewProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    onDelete()
    setShowDeleteModal(false)
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
  }

  const statusConfigs = {
    pending: {
      label: 'Ожидает',
      badgeClass: 'status-badge status-pending',
      buttonClass: 'status-button-pending',
      buttonText: 'В ожидание'
    },
    in_progress: {
      label: 'В работе',
      badgeClass: 'status-badge status-in-progress',
      buttonClass: 'status-button-in-progress',
      buttonText: 'В работу'
    },
    done: {
      label: 'Выполнена',
      badgeClass: 'status-badge status-done',
      buttonClass: 'status-button-done',
      buttonText: 'Выполнено'
    }
  }

  const currentStatusConfig = statusConfigs[task.status]

  return (
    <>
      <div className='card card-hover task-card'>
        <div className='task-card-header'>
          <h4 className='task-card-title'>
            {task.title}
          </h4>
          <div className='task-card-actions'>
            <button
              onClick={onEdit}
              disabled={isUpdating}
              className='small-button task-card-action-button task-card-action-edit'
              title='Редактировать задачу'
            >
              <Icon name='edit' />
            </button>
            <button
              onClick={handleDeleteClick}
              disabled={isUpdating}
              className='small-button task-card-action-button task-card-action-delete'
              title='Удалить задачу'
            >
              <Icon name='delete' />
            </button>
          </div>
        </div>

        {task.description && (
          <p className='task-card-description'>
            {task.description}
          </p>
        )}

        <div className='task-card-meta'>
          Создано: {new Date(task.created_at).toLocaleDateString('ru-RU')}
        </div>

        <div className='task-card-footer'>
          <div className={currentStatusConfig.badgeClass}>
            {currentStatusConfig.label}
          </div>

          <div className='task-card-status-buttons'>
            {Object.entries(statusConfigs).map(([status, config]) =>
                task.status !== status && (
                  <button
                    key={status}
                    onClick={() => onStatusChange(status as TaskStatus)}
                    disabled={isUpdating}
                    className={`status-change-button ${config.buttonClass}`}
                  >
                    {config.buttonText}
                  </button>
                )
            )}
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        task={task}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
