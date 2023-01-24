const Notification = ({ message }) => {
  if (message.text === undefined) {
    return null
  }
  return (
    <div className={message.error ? 'error' : 'notification'}>
      {message.text}
    </div>
  )
}
export default Notification