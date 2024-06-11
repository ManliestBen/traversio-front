import { NavLink } from 'react-router-dom'

import styles from './Properties.module.css'

const Properties = () => {
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