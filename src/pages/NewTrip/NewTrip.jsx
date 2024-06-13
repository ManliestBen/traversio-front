import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import styles from './NewTrip.module.css'

import * as propertyService from '../../services/propertyService'


const NewTrip = () => {
  const [property, setProperty] = useState({})
  const {propertyId} = useParams()
  
  useEffect(() => {
    const fetchPropertyData = async () => {
      const propertyData = await propertyService.show(propertyId)
      setProperty(propertyData)
    }
    fetchPropertyData()
  }, [propertyId])
  
  return (
    <>
      <div className={styles.container}>
        <h2>Book this property</h2>
      </div>
    </>
  )
}

export default NewTrip