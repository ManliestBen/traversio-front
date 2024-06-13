import styles from './Message.module.css'

const Message = ({message, user, profile}) => {
  return (
    <>
      <div className={styles.message}>
        <h5 className={styles.toFrom}>
          {message.sender._id === user.profile ? 'To' : 'From' }:
        </h5>
        <h5 className={styles.senderRecipient}>Recipient</h5>
        <h5 className={styles.subject}>Subject</h5>
      </div>
    </>
  )
}

export default Message