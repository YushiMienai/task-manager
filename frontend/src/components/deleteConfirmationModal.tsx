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
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h3 className='modal-title'>
          Удаление задачи
        </h3>
        <p className='modal-message'>
          Вы уверены, что хотите удалить задачу <span className='font-semibold'>'{task.title}'</span>? Это действие нельзя отменить.
        </p>
        <div className='modal-actions'>
          <button
            onClick={onCancel}
            className='modal-button button-secondary'
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className='modal-button button-danger'
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
