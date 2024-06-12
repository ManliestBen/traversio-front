import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import * as propertyService from '../../services/propertyService'

const PropertyDetails = (props) => {
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
      <h1>Property Details</h1>
    </>
  )
}

export default PropertyDetails