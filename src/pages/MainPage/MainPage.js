import React, { useEffect, useState } from 'react'
import { SideNav } from '../../components/SideNav/SideNav'
import './mainpage.css'
import { Dashboard } from '../../Fragment Screens/Dashboard/Dashboard'
import { Caregiver } from '../../Fragment Screens/Caregiver/Caregiver'
import { Bookings} from '../../Fragment Screens/Bookings/Bookings'
import { Match } from '../../Fragment Screens/Match/Match'
import { Contact } from '../../Fragment Screens/Contacts/Contact'
import { Account } from '../../Fragment Screens/Account/Account'
import axios from 'axios'
import { Loader } from '../../miscellaneous/Loader/Loader'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'

export const MainPage = () => {

    // INITIALIZE VARIABLES
    const [currentIndex, setCurrentIndex] = useState(0);
    const [caregivers, setCaregivers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [matched, setMatched] = useState([]);

    // SCREENS TO BE RENDERED WHEN THE INDEX CHANGES ON NAVIGATION CLICK
    const screens = [
        <Dashboard caregivers={caregivers} bookings={bookings}/>,
        <Match/>,
        <Bookings bookings={bookings}/>,
        <Caregiver caregivers={caregivers}/>,
        <Contact/>,
        <Account/>
    ]

    // RUN ON FIRST RENDER
    useEffect(() => {

        // FETCH THE CAREGIVER DATA AND SET THAT TO A VARIABLE
        const fetchCaregiversData = () => {
            setLoading(true);
            axios.get('https://my-caregiver-api.herokuapp.com/caregivers')
            .then(({data}) => {
                setCaregivers(data)
                axios.get('https://booking-data-project.herokuapp.com/Bookings/')
                .then(({data}) => {
                    setBookings(data);
                    setLoading(false);
                })
                .catch(err => { 
                    console.log(err);
                    setLoading(false);
                });
            })
            .catch(err => {
                console.log(err);
                //setLoading(false);
            });
        }

        fetchCaregiversData();
    }, [])

    // RUN ON RENDER AND WHEN THE CAREGIVERS AND BOOKINGS ARE FILLED WITH DATA FROM FETCH
    useEffect(() => {

        // CHECK IF THE CAREGIVERS AND BOOKINGS ARE STILL EMPTY
        if(!caregivers && !bookings) return;

        // COPY THE VALUE OF BOTH CAREGIVER AND BOOKINGS TO A VARIABLE SO THE ORIGINAL DATA WON'T BE AFFECTED WHEN THE DATA IS SPLICED
        const caregiversList = [...caregivers];
        const bookingsList = [...bookings];

        const matchData = () => {

            caregiversList.forEach(caregiver => {
                bookingsList.forEach((booking, index) => {
                    if(caregiver.jobTitleName === booking.jobTitleName){
                        // CREATE A CUSTOM OBJECT MERGING THE DATA FROM THE CAREGIVER ANF BOOKINGS WHEN IT MATCHES
                        const customMatch = {
                            bookingId: booking.bookingId,
                            caregiversName: `${caregiver.firstName} ${caregiver.lastName}`,
                            jobTitleName: booking.jobTitleName,
                            department: booking.department,
                            date: booking.date,
                            time: booking.time,
                            status: 'unconfirmed',
                            userId: caregiver.userId
                        }

                        // TAKE THE PREVIOUS CONTENT OF THE MATCHED VARIABLE AND PREPEND THE CUSTOM OBJECT CREATED
                        setMatched(match => [customMatch, ...match]);

                        // STORE THE MATCHED ON THE DATABASE
                        const storeDoc = async() => {
                            // CHECK IF IT HAS ALREADY BEEN STORED SO THAT IT WON'T TRY TO STORE AGAIN AND AGAIN WHEN THE PAGE REFRESHES
                            const {_document} =  await getDoc(doc(db, 'matched', caregiver.userId))

                            // STORE ON THE DATABASE WHEN IT'S NOT STORED YET
                            if(_document === null){
                                setDoc(doc(db, 'matched', caregiver.userId), customMatch)
                                .then((res) => console.log(res))
                                .catch((err) => console.log(err))
                            }
                        }

                        // CALL THE STORE FUNCTION ON A TRY CATCH
                        try {
                            storeDoc();
                        } catch (error) {
                            console.log(error);
                        }
                        bookingsList.slice(index, 1);
                    }
                })
            });
        }

        matchData();
    }, [caregivers, bookings])

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <main className="main-page">
                    <SideNav setCurrentIndex={setCurrentIndex}/>
                    <div className="main-content">
                        {screens[currentIndex]}
                    </div>
                </main>
            )}
        </>
    )
}
