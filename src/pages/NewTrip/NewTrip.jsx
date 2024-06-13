import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Calendar from "react-calendar"

import styles from './NewTrip.module.css'

import * as propertyService from '../../services/propertyService'
import * as profileService from '../../services/profileService'

const NewTrip = (props) => {
  const navigate = useNavigate()
  const {propertyId} = useParams()
  const [property, setProperty] = useState({})
  const [blackoutDates, setBlackoutDates] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    plannedBy: props.user.profile,
    property: propertyId
  })
  const [dates, setDates] = useState(new Date())
  
  useEffect(() => {
    const fetchPropertyData = async () => {
      const propertyData = await propertyService.show(propertyId)
      setProperty(propertyData)
      const datesToAdd = []
      console.log(propertyData.datesBooked[0])
      propertyData.datesBooked.forEach(date => {
        datesToAdd.push(new Date(date.substring(0, 10)).getUTCDate())
      })
      setBlackoutDates(datesToAdd)
    }
    fetchPropertyData()
  }, [propertyId])

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    const formDataCopy = {...formData}
    formDataCopy.arrivalDate = dates[0].toLocaleString().replace(/T.*/,'').split('-').reverse().join('-').split(',')[0]
    formDataCopy.departureDate = dates[1].toLocaleString().replace(/T.*/,'').split('-').reverse().join('-').split(',')[0]
    formDataCopy.newDatesBooked = getDatesInRange()
    await profileService.addTrip(formDataCopy)
    navigate(`/profiles/${props.user.profile}`)
    console.log(formDataCopy)
  }

  function getDatesInRange() {
    const startDate = new Date(dates[0])
    const endDate = new Date(dates[1])
    const dateArray = []
    let currentDate = startDate
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dateArray
  }
  
  return (
    <>
      <div className={styles.container}>
        <h2>Plan a trip to {property.name}</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Name your trip
            <input
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </label>
          <Calendar
            selectRange={true}
            onChange={setDates}
            value={dates}
          />
          <button className={styles.submitTripBtn} type="submit">Create Trip</button>
        </form>
      </div>
    </>
  )
}

export default NewTrip