"use client"
import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesColumn, ChartNoAxesGantt } from 'lucide-react'
import React from 'react'

const UserMenu = () => {
  return (
    <UserButton appearance={{
        elements:{
             avatarBox: 'w-10 h-10 rounded-full',
        }
    }}>

    <UserButton.MenuItems>
        <UserButton.Link
        label="My Events"
        labelIcon={<ChartNoAxesGantt size={16}/>}
        href={'/events'}/>

        <UserButton.Action label="manageAccount"/>
    </UserButton.MenuItems>

    </UserButton>
  )
}

export default UserMenu