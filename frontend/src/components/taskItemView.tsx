import {useState} from 'react'
import {Task, TaskStatus} from '@types'
import {DeleteConfirmationModal} from './DeleteConfirmationModal'

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
      <div className='task-card'>
        <div className='task-card-header'>
          <h4 className='task-card-title'>
            {task.title}
          </h4>
          <div className='task-card-actions'>
            <button
              onClick={onEdit}
              disabled={isUpdating}
              className='small-button text-gray-400 hover:text-blue-500 hover:bg-blue-50 disabled:text-gray-300'
              title='Редактировать задачу'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDeleteClick}
              disabled={isUpdating}
              className='small-button text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:text-gray-300'
              title='Удалить задачу'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
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

          <div className='flex flex-wrap gap-2'>
            {Object.entries(statusConfigs).map(([status, config]) =>
                task.status !== status && (
                  <button
                    key={status}
                    onClick={() => onStatusChange(status as TaskStatus)}
                    disabled={isUpdating}
                    className={`button text-sm ${config.buttonClass} text-white`}
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
