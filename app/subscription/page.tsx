import React from 'react'
import {PricingTable} from "@clerk/nextjs";

const subscription = () => {
  return ( 
    <div className={'flex items-center justify-center pr-50 pl-50'}>
        <PricingTable />
    </div>
  )
}

export default subscription
