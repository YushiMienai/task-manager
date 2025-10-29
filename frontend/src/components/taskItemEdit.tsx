import {TaskStatus} from '@types'

interface TaskItemEditProps {
  isUpdating: boolean
  editForm: {
    title: string
    description: string
    status: TaskStatus
  }
  onFormChange: (field: string, value: string) => void
  onSave: () => void
  onCancel: () => void
}

export const TaskItemEdit = ({isUpdating, editForm, onFormChange, onSave, onCancel}: TaskItemEditProps) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 border-2 border-blue-200'>
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Название задачи
          </label>
          <input
            type='text'
            value={editForm.title}
            onChange={(e) => onFormChange('title', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Введите название задачи'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Описание
          </label>
          <textarea
            value={editForm.description}
            onChange={(e) => onFormChange('description', e.target.value)}
            rows={3}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Введите описание задачи'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Статус
          </label>
          <select
            value={editForm.status}
            onChange={(e) => onFormChange('status', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='pending'>Ожидает</option>
            <option value='in_progress'>В работе</option>
            <option value='done'>Выполнена</option>
          </select>
        </div>

        <div className='flex justify-end gap-2'>
          <button
            onClick={onCancel}
            disabled={isUpdating}
            className='button text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300'
          >
            Отмена
          </button>
          <button
            onClick={onSave}
            disabled={isUpdating || !editForm.title.trim()}
            className='button text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'
          >
            {isUpdating ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  )
}
