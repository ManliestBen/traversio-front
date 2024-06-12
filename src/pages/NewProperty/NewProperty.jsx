import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NewProperty.module.css'

import { create } from '../../services/propertyService'


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
      'Pool': false,
      'Hot Tub': false,
      'Game Room': false,
      'Grill': false,
      'Air Conditioning': false,
      'Wifi': false,
      'Kitchen': false,
      'Laundry': false,
      'Covered Parking': false,
      'Balcony': false,
      'Beach Access': false,
      'TV': false,
      'Sauna': false,
      'Refrigerator': false,
      'Dish Washer': false,
      'Oven': false,
      'Microwave': false,
      'Gym': false,
      'Hair Dryer': false
    },
    petFriendly: false,
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    // run a function to turn the amenities object in formData
    // into an array
    let formDataCopy = {...formData}
    let amenitiesArr = []
    for (let key in formData.amenities) {
      if (formData.amenities[key]) {
        amenitiesArr.push(key)
      }
    }
    formDataCopy.amenities = amenitiesArr
    console.log(formDataCopy)
    // Submit formData to API here
    await create(formDataCopy)
    navigate('/properties')
  }

  const isFormInvalid = () => {
    return !(formData.name && formData.description && formData.streetAddress && formData.city && formData.state && formData.zipCode && formData.layout && formData.dailyRate && formData.numBathrooms && formData.numBedrooms )
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
        <form onSubmit={handleSubmit}>
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
          <label className={styles.label}>
            Game Room
            <input
              type='checkbox'
              name="Game Room"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Game Room']}
            />
          </label>
          <label className={styles.label}>
            Grill
            <input
              type='checkbox'
              name="Grill"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Grill']}
            />
          </label>
          <label className={styles.label}>
            Air Conditioning
            <input
              type='checkbox'
              name="Air Conditioning"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Air Conditioning']}
            />
          </label>
          <label className={styles.label}>
            Wifi
            <input
              type='checkbox'
              name="Wifi"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Wifi']}
            />
          </label>
          <label className={styles.label}>
            Kitchen
            <input
              type='checkbox'
              name="Kitchen"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Kitchen']}
            />
          </label>
          <label className={styles.label}>
            Laundry
            <input
              type='checkbox'
              name="Laundry"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Laundry']}
            />
          </label>
          <label className={styles.label}>
            Covered Parking
            <input
              type='checkbox'
              name="Covered Parking"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Covered Parking']}
            />
          </label>
          <label className={styles.label}>
            Balcony
            <input
              type='checkbox'
              name="Balcony"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Balcony']}
            />
          </label>
          <label className={styles.label}>
            Beach Access
            <input
              type='checkbox'
              name="Beach Access"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Beach Access']}
            />
          </label>
          <label className={styles.label}>
            TV
            <input
              type='checkbox'
              name="TV"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['TV']}
            />
          </label>
          <label className={styles.label}>
            Sauna
            <input
              type='checkbox'
              name="Sauna"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Sauna']}
            />
          </label>
          <label className={styles.label}>
            Refrigerator
            <input
              type='checkbox'
              name="Refrigerator"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Refrigerator']}
            />
          </label>
          <label className={styles.label}>
            Dish Washer
            <input
              type='checkbox'
              name="Dish Washer"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Dish Washer']}
            />
          </label>
          <label className={styles.label}>
            Oven
            <input
              type='checkbox'
              name="Oven"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Oven']}
            />
          </label>
          <label className={styles.label}>
            Microwave
            <input
              type='checkbox'
              name="Microwave"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Microwave']}
            />
          </label>
          <label className={styles.label}>
            Gym
            <input
              type='checkbox'
              name="Gym"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Gym']}
            />
          </label>
          <label className={styles.label}>
            Hair Dryer
            <input
              type='checkbox'
              name="Hair Dryer"
              onChange={handleAmenityCheckbox}
              checked={formData.amenities['Hair Dryer']}
            />
          </label>
          <button disabled={isFormInvalid()} type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default NewProperty