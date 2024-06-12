
import styles from './PropertyCard.module.css'

const PropertyCard = (props) => {
  return (
    <>
      <div className={styles.card}>
        {props.property.photos.length ? 
          <img src={props.property.photos[0]} alt="A picture of this property" />
          :
          <img src={'https://picsum.photos/200/200'} alt="A random placeholder image" />
        }
        {props.property.name}
      </div>
    </>
  )
}

export default PropertyCard