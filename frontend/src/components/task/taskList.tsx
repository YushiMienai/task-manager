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
    <div className='task-list-container'>
      <div className='task-list-header'>
        <h3 className='task-list-title'>
          Список задач ({filteredTasks.length})
        </h3>

        <div className='filter-container'>
          {filters.map(({key, label, count}) => (
            <button
              key={key || 'all'}
              onClick={() => onFilterChange(key)}
              className={`filter-button ${
                filter === key ? 'filter-active' : 'filter-inactive'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className='empty-state'>
          <div className='empty-icon'>📝</div>
          <p className='empty-message'>
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
