import React from 'react'
import UpgradeStore from './UpgradeStore'
import BuildingStore from './BuildingStore'
import './SectionRight.css'

function SectionRight() {
  return (
    <>
      <div className='section-right'>
        <h1 style={{color:"white"}}>Store</h1>
        <UpgradeStore/>
        <BuildingStore/>
      </div>
    </>
  )
}

export default SectionRight