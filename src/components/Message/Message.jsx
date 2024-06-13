import styles from './Message.module.css'

const Message = ({message, user, profile}) => {
  return (
    <>
      <div className={`${styles.message} ${message.read ? '' : styles.unRead}`}>
        <h5 className={styles.toFrom}>
          {message.sender._id === user.profile ? 'To' : 'From' }:
        </h5>
        <h5 className={styles.senderRecipient}>
        {message.sender._id === user.profile ? message.recipient.name : message.sender.name }
        </h5>
        <h5 className={styles.subject}>
          {message.subject}
        </h5>
      </div>
    </>
  )
}

export default Message