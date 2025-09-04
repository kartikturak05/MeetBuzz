import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'

const Header= () => {
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2">
        <Link href={'/'} className='flex items-center'>
            <Image src={'/logo.jpg'} alt="MeetBuzz Logo" width="150" height={"60"} className='h-16 w-auto' />
        </Link>

        <div className='flex gap-4 items-center'>
            <Link href={'/events?create=true'}>
                <Button  className="flex items-center gap-2"><PenBox size={18}/>Create Event</Button>
            </Link>
                <Button variant={'outline'}>Login</Button>
        </div>
    </nav>
  )
}

export default Header