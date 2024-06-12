import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Properties.module.css'

import * as propertyService from '../../services/propertyService'

const Properties = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    const fetchProperties = async () => {
      const propertyData = await propertyService.index()
      setProperties(propertyData)
    }
    fetchProperties()
  }, [])


  return (
    <>
      <div className={styles.container}>
        <h2>Property Index</h2>
        <NavLink to='/properties/new'>Create a Property</NavLink>
      </div>
    </>
  )
}

export default Properties