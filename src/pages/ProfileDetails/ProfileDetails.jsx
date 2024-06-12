import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from './ProfileDetails.module.css'

import { show } from '../../services/profileService'

const ProfileDetails = (props) => {
  const [profile, setProfile] = useState({})
  const {profileId} = useParams()

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileData = await show(profileId)
      setProfile(profileData)
    }
    fetchProfileData()
  }, [profileId])

  return (
    <>
      <div className={styles.container}>
        {props.user.profile === profile._id &&
          <h1>This is my profile</h1>
        }
        {props.user.profile !== profile._id &&
          <h1>This is NOT my profile</h1>
        }
      </div>
    </>
  )
}

export default ProfileDetails