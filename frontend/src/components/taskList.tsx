import {TaskItem} from './taskItem'
import {Task, TaskStatus} from '@types'

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (taskId: number, updateData: {status: TaskStatus}) => Promise<void>
  onDeleteTask: (taskId: number) => Promise<void>
  filter: TaskStatus | null
  onFilterChange: (filter: TaskStatus | null) => void
}

export const TaskList = ({tasks, onUpdateTask, onDeleteTask, filter, onFilterChange}: TaskListProps) => {
  const filteredTasks = filter
    ? tasks.filter(task => task.status === filter)
    : tasks

  const filters: Array<{key: TaskStatus | null; label: string; count: number}> = [
    {key: null, label: 'Все', count: tasks.length},
    {key: 'pending', label: 'Ожидают', count: tasks.filter(t => t.status === 'pending').length},
    {key: 'in_progress', label: 'В работе', count: tasks.filter(t => t.status === 'in_progress').length},
    {key: 'done', label: 'Выполнены', count: tasks.filter(t => t.status === 'done').length}
  ]

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
        <h3 className='text-xl font-semibold text-gray-800'>
          Список задач ({filteredTasks.length})
        </h3>

        <div className='flex flex-wrap gap-2'>
          {filters.map(({key, label, count}) => (
            <button
              key={key || 'all'}
              onClick={() => onFilterChange(key)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${
                filter === key
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-gray-400 text-6xl mb-4'>📝</div>
          <p className='text-gray-500 text-lg'>
            {filter ? 'Нет задач с выбранным статусом' : 'Нет задач. Добавьте первую!'}
          </p>
        </div>
      ) : (
        <div className='grid gap-4'>
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}
