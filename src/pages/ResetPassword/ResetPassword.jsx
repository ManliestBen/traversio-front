// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './ResetPassword.module.css'

const ResetPassword = ({ handleAuthEvt }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    newPasswordConf: '',
  })

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await authService.resetPassword(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      setMessage(err.message)
    }
  }

  const { email, password, newPassword, newPasswordConf } = formData

  const isFormInvalid = () => {
    return !(email && password && newPassword && newPassword === newPasswordConf)
  }

  return (
    <main className={styles.container}>
      <h1>Change Password</h1>
      <p className={styles.message}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email Address
          <input
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Temporary Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          New Password
          <input
            type="password"
            value={newPassword}
            name="newPassword"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Confirm New Password
          <input
            type="password"
            value={newPasswordConf}
            name="newPasswordConf"
            onChange={handleChange}
          />
        </label>
        <div>
          <Link to="/">Cancel</Link>
          <button className={styles.button} disabled={isFormInvalid()}>
            Change Password
          </button>
        </div>
      </form>
    </main>
  )
}

export default ResetPassword
