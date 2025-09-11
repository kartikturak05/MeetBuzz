import { getUserAvailability } from '@/actions/availability'
import React from 'react'
import { defaultAvailability } from './data';
import AvailabilityForm from './_components/availability-form';

const AvailabilityPage = async() => {
    const availability = await getUserAvailability();
    console.log(availability)
  return (
    <div>
        <AvailabilityForm initialData={availability || defaultAvailability}/>
    </div>
  )
}

export default AvailabilityPage