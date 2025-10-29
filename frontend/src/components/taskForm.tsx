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
      className='bg-white rounded-lg shadow-md p-6 sticky top-6'
    >
      <h3 className='text-xl font-semibold text-gray-800 mb-4'>
        Добавить новую задачу
      </h3>

      <div className='space-y-4'>
        <div>
          <input
            type='text'
            placeholder='Название задачи*'
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
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
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none'
            disabled={isSubmitting}
          />
        </div>

        <button
          type='submit'
          disabled={isSubmitting || !title.trim()}
          className='button w-full bg-blue-500 text-white font-medium hover:bg-blue-600'
        >
          {isSubmitting ? 'Добавление...' : 'Добавить задачу'}
        </button>
      </div>
    </form>
  )
}
