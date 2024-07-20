import React from 'react'
import BuildingStoreItem from './BuildingStoreItem'

function BuildingStore() {
  return (
    <div className='building-store'>
      <BuildingStoreItem buildingName={"Trowel"}/>
      <BuildingStoreItem buildingName={"Wheelbarrow"}/>
      <BuildingStoreItem buildingName={"Oven"}/>
      <BuildingStoreItem buildingName={"Factory"}/>
      <BuildingStoreItem buildingName={"Nuclear Brick Plant"}/>
      <BuildingStoreItem buildingName={"Brick Cultivation Pods"}/>
      <BuildingStoreItem buildingName={"Brick-a-tron"}/>
      <BuildingStoreItem buildingName={"Mother of Bricks"}/>
      <BuildingStoreItem buildingName={"Brick Government"}/>
      <BuildingStoreItem buildingName={"Holy Church of Bricks"}/>
    </div>
  )
}

export default BuildingStore