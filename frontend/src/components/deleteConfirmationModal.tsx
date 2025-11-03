import {Task} from '@types'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  task: Task
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteConfirmationModal = ({isOpen, task, onConfirm, onCancel}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null

  return (
    <div className='delete-confirmation-modal'>
      <div className='delete-confirmation-content'>
        <h3 className='delete-confirmation-title'>
          Удаление задачи
        </h3>
        <p className='delete-confirmation-message'>
          Вы уверены, что хотите удалить задачу <span className='font-semibold'>'{task.title}'</span>? Это действие нельзя отменить.
        </p>
        <div className='delete-confirmation-actions'>
          <button
            onClick={onCancel}
            className='button button-secondary text-sm font-medium'
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className='button button-danger text-sm font-medium'
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}