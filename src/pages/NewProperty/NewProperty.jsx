import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NewProperty.module.css'

// 'Pool', 'Game Room', 'Grill', 'Air Conditioning', 'Wifi', 'Kitchen', 'Hot Tub', 'Washer/Dryer', 'Covered Parking', 'Balcony', 'Beach Access', 'TV', 'Sauna', 'Refrigerator', 'Dishwasher', 'Oven', 'Microwave', 'Gym', 'Hair Dryer'

const NewProperty = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    layout: '',
    dailyRate: '',
    numBathrooms: '',
    numBedrooms: '',
    // amenities: [
    //   'Pool',
      
    // ],
    amenities: {
      'Pool': true,
      'Hot Tub': false
    },
    petFriendly: false,
    datesBooked: []
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    // Submit formData to API here

    navigate('/properties')
  }

  const handleAmenityCheckbox = evt => {
    let formDataCopy = {...formData}
    // determine if checkbox is on or not
    if (evt.target.checked) {
      formDataCopy.amenities[evt.target.name] = true
      setFormData(formDataCopy)
    } else {
      formDataCopy.amenities[evt.target.name] = false
      setFormData(formDataCopy)
    }
  }

  const handlePetCheckbox = evt => {
    let formDataCopy = {...formData}
    if (evt.target.checked) {
      formDataCopy.petFriendly = true
      setFormData(formDataCopy)
    } else {
      formDataCopy.petFriendly = false
      setFormData(formDataCopy)
    }
  }


  return (
    <>
      <div className={styles.container}>
        <h2>Create a Property</h2>
        <form>
          <label className={styles.label}>
            Name
            <input
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Description
            <input
              value={formData.description}
              name="description"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Street Address
            <input
              value={formData.streetAddress}
              name="streetAddress"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            City
            <input
              value={formData.city}
              name="city"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            State
            <input
              value={formData.state}
              name="state"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Zip Code
            <input
              value={formData.zipCode}
              name="zipCode"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Layout
            <select
              value={formData.layout}
              name="layout"
              onChange={handleChange}
            >
              <option value="">Select a Layout</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="Townhome">Townhome</option>
              <option value="Mansion">Mansion</option>
              <option value="Cabin">Cabin</option>
            </select>
          </label>
          <label className={styles.label}>
            Daily Rate (USD)
            <input
              type='number'
              value={formData.dailyRate}
              name="dailyRate"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Number of Bathrooms
            <input
              type='number'
              value={formData.numBathrooms}
              name="numBathrooms"
              onChange={handleChange}
              />
          </label>
          <label className={styles.label}>
            Number of Bedrooms
            <input
              type='number'
              value={formData.numBedrooms}
              name="numBedrooms"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Pet Friendly?
            <input
              type='checkbox'
              name="petFriendly"
              onChange={handlePetCheckbox}
              checked={formData.petFriendly}
              />
          </label>
          <h4>Amenities</h4>
          <label className={styles.label}>
            Pool
            <input
              type='checkbox'
              name="Pool"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Pool']}
              />
          </label>
          <label className={styles.label}>
            Hot Tub
            <input
              type='checkbox'
              name="Hot Tub"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Hot Tub']}
            />
          </label>
        </form>
      </div>
    </>
  )
}

export default NewProperty