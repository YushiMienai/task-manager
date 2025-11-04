interface ErrorAlertProps {
  message: string
  onDismiss: () => void
}

export const ErrorAlert = ({message, onDismiss}: ErrorAlertProps) => {
  return (
    <div className='error-alert'>
      <span className='error-alert-message'>{message}</span>
      <button
        onClick={onDismiss}
        className='error-alert-dismiss'
        aria-label='Закрыть уведомление'
      >
        ×
      </button>
    </div>
  )
}
