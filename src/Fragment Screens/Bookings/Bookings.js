import React from 'react'
import './bookings.css'

export const Bookings = ({ bookings }) => {

    return (
        <div className='bookings-container'>
            <div className='table'>
                <div className='table-head'>
                    <div className='table-data'>Functie</div>
                    <div className='table-data'>Afdeling</div>
                    <div className='table-data'>Datum</div>
                    <div className='table-data'>Tijd</div>
                </div>
                <div className="table-content">
                    {bookings.map((data, index) => {
                        return(
                            <div className='table-body' key={index}>
                                <div className='table-data'>{data.jobTitleName}</div>
                                <div className='table-data'>{data.department}</div>
                                <div className='table-data'>{data.date}</div>
                                <div className='table-data'>{data.time}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
