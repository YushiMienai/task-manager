interface ErrorAlertProps {
  message: string
  onDismiss: () => void
}

export const ErrorAlert = ({message, onDismiss}: ErrorAlertProps) => {
  return (
    <div className='alert alert-error'>
      <span className='alert-message'>{message}</span>
      <button
        onClick={onDismiss}
        className='alert-dismiss'
        aria-label='Закрыть уведомление'
      >
        ×
      </button>
    </div>
  )
}
