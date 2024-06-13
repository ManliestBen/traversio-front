import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from './ProfileDetails.module.css'

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
    setMessageSent(true)
    setTimeout(() => {
      setMessageSent(false)
    }, 2000)
    setDisplayForm(!displayForm)
  }

  return (
    <>
      <div className={styles.container}>
        {props.user.profile === profile._id &&
          <h1>This is my profile</h1>
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
                value={formData.subject}
                name="subject"
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Message
              <textarea
                value={formData.content}
                name="content"
                cols={50}
                rows={10}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSendMessage} className={styles.messageButton}>Send 📨</button>
            <button onClick={() => setDisplayForm(!displayForm)}>Cancel</button>
          </form>}
        </>
        }
      </div>
    </>
  )
}

export default ProfileDetails