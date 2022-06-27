import React, { useState } from 'react'
import './sidenav.css'
import { useNavigate } from 'react-router'

import { MdDashboard, MdLogout } from 'react-icons/md'
import { BsJournalBookmark } from 'react-icons/bs'
import { FaPeopleCarry } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdFindReplace } from 'react-icons/md'
import { AiFillSetting } from 'react-icons/ai'
import { AiFillContacts } from 'react-icons/ai'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'

import logo from '../../assets/Dytter_Logo_2022.svg'

export const SideNav = ({ setCurrentIndex }) => {

    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(0);
    const [isToggled, setIsToggled] = useState(false);

    const navList = [
        { icon: <MdDashboard/> , label: 'Dashboard' },
        { icon: <MdFindReplace/> , label: 'Match' },
        { icon: <BsJournalBookmark/> , label: 'Bookings' },
        { icon: <FaPeopleCarry/> , label: 'Caregivers' },
        { icon: <AiFillContacts/> , label: 'Contact' },
    ]

    const logoutUser = async() => {
        await signOut(auth);
        navigate('/login');
    }


    return (
        <nav className={isToggled ? 'side-nav isToggled' : 'side-nav'}>
            <div 
                className="logo-menu"
                style={{
                    justifyContent: isToggled ? 'center' : 'space-between'
                }}
            >
                <img 
                    src={logo} alt="logo" 
                    className='logo'
                    style={{
                        display: isToggled ? 'none' : 'block'
                    }}
                />
                <GiHamburgerMenu 
                    className='menu'
                    onClick={() => setIsToggled(!isToggled)}
                />
            </div>
            <div className="nav-items">
                {navList.map((item, index) => {
                    return(
                        <div 
                            className={isActive === index ? 'item activeNav' : 'item'}
                            key={index}
                            onClick={() => {
                                setIsActive(index)
                                setCurrentIndex(index);
                            }}
                        >
                            <div className="icon">
                                {item.icon}
                            </div>
                            <div className="label">
                                {item.label}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="settings" style={{
                flexDirection: isToggled ? 'column' : 'row',
                gap: isToggled ? '2rem' : '0'
                
            }}>
                <AiFillSetting onClick={() => setCurrentIndex(5)}/>
                <MdLogout onClick={logoutUser}/>
            </div>
        </nav>
    )
}
