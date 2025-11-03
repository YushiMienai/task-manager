import {ChangeEvent, FormEvent, useState} from 'react'
import {TaskCreate} from '@types'

interface TaskFormProps {
  onTaskCreated: (task: TaskCreate) => Promise<void>
}

export const TaskForm = ({onTaskCreated}: TaskFormProps) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    const newTask: TaskCreate = {
      title: title.trim(),
      description: description.trim() || undefined,
      status: 'pending'
    }

    try {
      setIsSubmitting(true)
      await onTaskCreated(newTask)
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='task-form'
    >
      <h3 className='task-form-title'>
        Добавить новую задачу
      </h3>

      <div className='task-form-fields'>
        <div>
          <input
            type='text'
            placeholder='Название задачи*'
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className='form-input'
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <textarea
            placeholder='Описание задачи'
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            rows={3}
            className='form-textarea'
            disabled={isSubmitting}
          />
        </div>

        <button
          type='submit'
          disabled={isSubmitting || !title.trim()}
          className='button button-primary w-full font-medium'
        >
          {isSubmitting ? 'Добавление...' : 'Добавить задачу'}
        </button>
      </div>
    </form>
  )
}
