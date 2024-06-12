import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import styles from './PropertyDetails.module.css'

import * as propertyService from '../../services/propertyService'

const PropertyDetails = (props) => {
  const [property, setProperty] = useState({})
  const {propertyId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPropertyData = async () => {
      const propertyData = await propertyService.show(propertyId)
      setProperty(propertyData)
    }
    fetchPropertyData()
  }, [propertyId])

  const handleDeleteProperty = async (propertyId) => {
    await propertyService.delete(propertyId)
    navigate('/properties')
  }

  if (!property.name) return <h1>Loading Property...</h1>

  return (
    <>
      <div className={styles.container}>
        <h1>{property.name}</h1>
        {property.photos.length ? 
          <img src={property.photos[0]} alt="A picture of this property" />
          :
          <img src={'https://picsum.photos/500/500'} alt="A random placeholder image" />
        }
        {property.owner._id === props.user.profile &&
          <button onClick={() => handleDeleteProperty(propertyId)}>Delete Property</button>
        }
      </div>

    </>
  )
}

export default PropertyDetails