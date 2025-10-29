import {useState} from 'react'
import {Task, TaskStatus} from '@types'
import {TaskItemView} from './TaskItemView'
import {TaskItemEdit} from './TaskItemEdit'

interface TaskItemProps {
  task: Task
  onUpdateTask: (taskId: number, updateData: { title?: string; description?: string; status?: TaskStatus }) => Promise<void>
  onDeleteTask: (taskId: number) => Promise<void>
}

export const TaskItem = ({task, onUpdateTask, onDeleteTask}: TaskItemProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status
  })

  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      setIsUpdating(true)
      await onUpdateTask(task.id, {status: newStatus})
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleEditClick = () => {
    setEditForm({
      title: task.title,
      description: task.description || '',
      status: task.status
    })
    setIsEditing(true)
  }

  const handleEditSave = async () => {
    try {
      setIsUpdating(true)
      await onUpdateTask(task.id, {
        title: editForm.title,
        description: editForm.description,
        status: editForm.status
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setEditForm({
      title: task.title,
      description: task.description || '',
      status: task.status
    })
  }

  const handleFormChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isEditing) {
    return (
      <TaskItemEdit
        isUpdating={isUpdating}
        editForm={editForm}
        onFormChange={handleFormChange}
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    )
  }

  return (
    <TaskItemView
      task={task}
      isUpdating={isUpdating}
      onEdit={handleEditClick}
      onStatusChange={handleStatusChange}
      onDelete={() => onDeleteTask(task.id)}
    />
  )
}