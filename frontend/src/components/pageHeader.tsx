import {useAuth} from '@hooks'

interface PageHeaderProps {
  onLogout: () => void
}

export const PageHeader = ({onLogout}: PageHeaderProps) => {
  const {user} = useAuth()

  return (
    <header className='page-header'>
      <div className='page-header-main'>
        <div></div>
        <h1 className='page-header-title'>
          📝 Менеджер задач
        </h1>
        <div className='page-header-user'>
          <span className='page-header-greeting'>Привет, {user?.username}!</span>
          <button
            onClick={onLogout}
            className='button button-danger text-sm'
          >
            Выйти
          </button>
        </div>
      </div>
      <p className='page-header-subtitle'>
        Организуйте свои задачи эффективно
      </p>
    </header>
  )
}
