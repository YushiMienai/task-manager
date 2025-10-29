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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          Удаление задачи
        </h3>
        <p className='text-gray-600 mb-6'>
          Вы уверены, что хотите удалить задачу <span className='font-semibold'>'{task.title}'</span>? Это действие нельзя отменить.
        </p>
        <div className='flex justify-end gap-3'>
          <button
            onClick={onCancel}
            className='button text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200'
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className='button text-sm font-medium text-white bg-red-600 hover:bg-red-700'
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}