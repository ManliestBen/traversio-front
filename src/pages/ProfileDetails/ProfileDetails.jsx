import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from './ProfileDetails.module.css'

import Message from '../../components/Message/Message'

import { show } from '../../services/profileService'
import { create } from '../../services/messageService'

const ProfileDetails = (props) => {
  const [profile, setProfile] = useState({})
  const [displayForm, setDisplayForm] = useState(false)
  const {profileId} = useParams()
  const [messageSent, setMessageSent] = useState(false)
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    sender: props.user.profile,
    recipient: profileId,
    read: false
  })

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileData = await show(profileId)
      setProfile(profileData)
    }
    fetchProfileData()
  }, [profileId])

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSendMessage = async evt => {
    evt.preventDefault()
    await create(formData)
    setMessageSent(true)
    setTimeout(() => {
      setMessageSent(false)
    }, 2000)
    clearForm()
  }

  const clearForm = () => {
    const clearedForm = {...formData}
    clearedForm.content = ''
    clearedForm.subject = ''
    setFormData(clearedForm)
    setDisplayForm(!displayForm)
  }

  const isFormInvalid = () => {
    return !(formData.subject && formData.content)
  }

  return (
    <>
      <div className={styles.container}>
        {props.user.profile === profile._id &&
          <>
            <div className={styles.container}>
              <h1>This is my profile</h1>
              {profile.messages.map(message =>
                <Message key={message._id} message={message} user={props.user} profile={profile} />
              )}
            </div>
          </>
          
        }
        {props.user.profile !== profile._id &&
        <>
          <h1>This is NOT my profile</h1>
          {messageSent && <h3>Message sent!</h3>}
          {!displayForm && <button onClick={() => setDisplayForm(!displayForm)} className={styles.messageButton}>Send Message</button>}
          {displayForm && <form className={styles.container}>
            <label className={styles.label}>
              Subject
              <input
                autoComplete='off'
                value={formData.subject}
                name="subject"
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Message
              <textarea
                autoComplete='off'
                value={formData.content}
                name="content"
                cols={50}
                rows={10}
                onChange={handleChange}
              />
            </label>
            <button disabled={isFormInvalid()} onClick={handleSendMessage} className={styles.messageButton}>Send 📨</button>
            <button onClick={clearForm}>Cancel</button>
          </form>}
        </>
        }
      </div>
    </>
  )
}

export default ProfileDetails