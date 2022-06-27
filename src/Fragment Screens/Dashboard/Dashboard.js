import React, { useEffect } from 'react'
import './dashboard.css'

import { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { async } from '@firebase/util'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase-config'

export const Dashboard = ({ caregivers, bookings }) => {

    // INITIALIZE THE TOP CAREGIVERS
    const [topCaregivers, setTopCaregivers] = useState([]);
    const [matchedData, setMatchedData] = useState([]);

    const pieData = {
        datasets: [{
            data: [caregivers.length, bookings.length, matchedData.length],
            backgroundColor: ['#F2D7D9', '#CDF0EA', '#B1BCE6'],
        }],
        labels: [
            'Total Bookings',
            'Open Bookings',
            'Available Caregivers'
        ]
    };

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

    // RUN ON RENDER. SORT THE TOP CAREGIVERS BASED ON THEIR COMPLETED BOOKINGS
    // useEffect(() => {

    //     // COPY THE VALUE SO THE ORIGINAL DATA WON'T BE AFFECTED BY ANY ALTERATION
    //     const caregiversList = [...caregivers];

    //     // I USED BUBBLE SORT HERE
    //     let swapped = true;
    //     do {
    //         swapped = false;
    //         for (let j = 0; j < caregiversList.length; j++) {
    //             if (caregiversList[j]?.completedBookings < caregiversList[j + 1]?.completedBookings) {
    //                 let temp = caregiversList[j];
    //                 caregiversList[j] = caregiversList[j + 1];
    //                 caregiversList[j + 1] = temp;
    //                 swapped = true;
    //             }
    //         }
    //     } while (swapped);

    //     setTopCaregivers(caregiversList);
    // }, [caregivers])

    // console.log(matchedData);

    return (
        <div className="dashboard-container">
            <div className="flex-container">
                <div className="right">
                    <div className="right-data">
                        <Pie 
                            data={pieData}
                        />
                    </div>
                </div>
                <div className="left">
                    <div className="item left-item-1">
                        <h3>Recent Confirmations</h3>
                        <div className='table'>
                                <div className='table-head'>
                                    <div className='table-data'>Date</div>
                                    <div className='table-data'>Caregiver</div>
                                    <div className='table-data'>Department</div>
                                </div>
                                <div className="table-content">
                                    {matchedData.map((data, index) => {
                                        return (
                                            data.status === 'confirmed' &&
                                            <div className='table-body' key={index}>
                                                <div className='table-data'>{data.date}</div>
                                                <div className='table-data'>{data.caregiversName}</div>
                                                <div className='table-data'>{data.department}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                        </div>
                    </div>
                    <div className="item left-item-2">
                    <h3>Top Caregivers</h3>
                        <div className='table'>
                            <div className="table-head">
                                <div className="table-data">Profile</div>
                                <div className="table-data">Name</div>
                                <div className="table-data">Completed Bookings</div>
                            </div>
                            <div className="table-content">
                                {topCaregivers.map((caregiver, index) => {
                                    return(
                                        <div className='table-body' key={index}>
                                            <div className='table-data image'>
                                                <img src={caregiver.thumbnail} alt="" />
                                            </div>
                                            <div className='table-data name'>{`${caregiver.firstName} ${caregiver.lastName}`}</div>
                                            <div className='table-data price'>{caregiver.completedBookings}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
