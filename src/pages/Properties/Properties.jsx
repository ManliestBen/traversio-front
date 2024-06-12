import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Properties.module.css'

import PropertyCard from '../../components/PropertyCard/PropertyCard'

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
        <div className={styles.cardContainer}>
          {properties.map(property =>
            <NavLink to={`/properties/${property._id}`} key={property._id}>
              <PropertyCard property={property} />
            </NavLink>
          )}
        </div>
      </div>
    </>
  )
}

export default Properties