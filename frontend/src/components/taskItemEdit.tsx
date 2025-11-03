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
    <div className='task-edit-form'>
      <div className='task-edit-fields'>
        <div>
          <label className='form-label'>
            Название задачи
          </label>
          <input
            type='text'
            value={editForm.title}
            onChange={(e) => onFormChange('title', e.target.value)}
            className='form-input'
            placeholder='Введите название задачи'
          />
        </div>

        <div>
          <label className='form-label'>
            Описание
          </label>
          <textarea
            value={editForm.description}
            onChange={(e) => onFormChange('description', e.target.value)}
            rows={3}
            className='form-textarea'
            placeholder='Введите описание задачи'
          />
        </div>

        <div>
          <label className='form-label'>
            Статус
          </label>
          <select
            value={editForm.status}
            onChange={(e) => onFormChange('status', e.target.value)}
            className='form-select'
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
            className='button button-secondary text-sm font-medium'
          >
            Отмена
          </button>
          <button
            onClick={onSave}
            disabled={isUpdating || !editForm.title.trim()}
            className='button button-primary text-sm font-medium'
          >
            {isUpdating ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  )
}
