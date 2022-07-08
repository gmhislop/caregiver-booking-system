import React, { useEffect, useState } from 'react'
import { SideNav } from '../../components/SideNav/SideNav'
import './mainpage.css'
import { Dashboard } from '../../Fragment Screens/Dashboard/Dashboard'
import { Caregiver } from '../../Fragment Screens/Caregiver/Caregiver'
import { Bookings} from '../../Fragment Screens/Bookings/Bookings'
import { Match } from '../../Fragment Screens/Match/Match'
import { Contact } from '../../Fragment Screens/Contacts/Contact'
import { Account } from '../../Fragment Screens/Account/Account'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useApp } from '../../context/AppContext'
import { fetchCaregiversData } from '../../miscellaneous/API Fetch/fetchCaregiver'
import { fetchBookingsData } from '../../miscellaneous/API Fetch/fetchBookings'

export const MainPage = () => {

    // INITIALIZE VARIABLES
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matchedData, setMatchedData] = useState([]);

    const {
		setCaregivers,
		setBookings,
		caregivers,
		bookings,
	} = useApp();

    // SCREENS TO BE RENDERED WHEN THE INDEX CHANGES ON NAVIGATION CLICK
    const screens = [
        <Dashboard matchedData={matchedData} setMatchedData={setMatchedData}/>,
        <Match/>,
        <Bookings/>,
        <Caregiver/>,
        <Contact/>,
        <Account/>
    ]

    useEffect(() => {
        // THIS IS MAINLY INTENDED TO HANDLE REFRESH. FETCH THE DATA ONCE AGAIN ON REFRESH
        if(caregivers.length === 0 || bookings.length === 0){
            console.log("Here");
    
            fetchCaregiversData(setCaregivers);
            fetchBookingsData(setBookings);
        }
    }, [bookings, caregivers, setBookings, setCaregivers])

    // FETCH THE MATCHED DATA
    useEffect(() => {
        const fetchMatched = async() => {
            await getDocs(collection(db, 'matched'))
            .then((res) => {
                setMatchedData(res.docs.map((doc) => ({ ...doc.data() })));
            })
            .catch((err) => {
                console.log(err);
            })
        }
        fetchMatched();
    }, [])


    return (
        <main className="main-page">
            <SideNav setCurrentIndex={setCurrentIndex}/>
            <div className="main-content">
                {screens[currentIndex]}
            </div>
        </main>
    )
}
