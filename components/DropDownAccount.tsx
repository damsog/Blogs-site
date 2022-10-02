import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSession, signOut } from 'next-auth/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface DropUpAccountProps {
    up:boolean
}

const DropDownAccount = ({up}:DropUpAccountProps)=> {
    const { data: session, status } = useSession();

    return (
    <Menu as="div" className="relative inline-block text-left">
        <div>
        <Menu.Button className="inline-flex justify-center rounded-full bg-white text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:ring-offset-gray-100">
            <img className='w-10 h-10 rounded-full' src={session!.user!.image as string} alt="" />
        </Menu.Button>
        </div>

        <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        >
        <Menu.Items className={classNames(`absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${up ? `-top-2 -translate-y-full -left-1`:''}`)}>
            <div className="py-1">
                <a href="#" className={classNames('text-gray-700','block px-4 py-2 text-sm')}>
                    {session?.user?.name}
                </a>
                <a href="#" className={classNames('text-gray-700','block px-4 py-2 text-xs font-extralight')}>
                    {session?.user?.email}
                </a>
            </div>
            <div className="py-1">
                <Menu.Item>
                    {({ active }) => (
                        <a href={`/settings/${session?.user?.email}`} className={classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-4 py-2 text-sm')}>
                            Account settings
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => ( 
                        <button onClick={()=>signOut()} className={classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block w-full px-4 py-2 text-left text-sm' )}>
                            Sign out
                        </button>
                    )}
                </Menu.Item>
            </div>
        </Menu.Items>
        </Transition>
    </Menu>
    )
}

export default DropDownAccount;