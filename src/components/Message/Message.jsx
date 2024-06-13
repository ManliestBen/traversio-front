import { useState } from 'react'

import styles from './Message.module.css'

const Message = ({message, user, profile, handleMarkRead}) => {
  const [displayMessage, setDisplayMessage] = useState(false)


  const handleOpenMessage = async () => {
    if (message.read || message.sender._id === user.profile) {
      console.log('do nothing')
    } else {
      await handleMarkRead(message._id)
      console.log('mark as read')
    }
    setDisplayMessage(!displayMessage)
  }

  return (
    <>
      <div onClick={handleOpenMessage} className={`${styles.message} ${message.read || message.sender._id === user.profile ? '' : styles.unRead}`}>
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
      
      {displayMessage && <div className={styles.messageContent}>
        <h5>{message.sender.name}: {message.content}</h5>
      </div>}
    </>
  )
}

export default Message