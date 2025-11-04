interface LoginHeaderProps {
  title?: string
}

export const LoginHeader = ({title = "Вход в Task Manager"}: LoginHeaderProps) => {
  return (
    <div className='login-header'>
      <h2 className='login-title'>
        {title}
      </h2>
    </div>
  )
}
