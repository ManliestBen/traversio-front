import { useState } from 'react'

import styles from './Message.module.css'

const Message = ({message, user, profile, handleMarkRead}) => {
  const [displayMessage, setDisplayMessage] = useState(false)


  const handleOpenMessage = async () => {
    // step 1 if the message is already read, skip step 2
    if (!message.read || message.sender._id !== user.profile) {
      // step 2 send request to back end marking as read
        // make sure to update message in ProfileDetails
      await handleMarkRead(message._id)
      console.log('mark as read')
    } else {
      console.log('do nothing')
    }
    // display a div to show the message and replies
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