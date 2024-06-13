import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/messages`

// send message
// send reply
// mark as read

async function create(formData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

async function markRead(messageId) {
  try {
    const res = await fetch(`${BASE_URL}/${messageId}/markRead`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      }
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  create,
  markRead
}