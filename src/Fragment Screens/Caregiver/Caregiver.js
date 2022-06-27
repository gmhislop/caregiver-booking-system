import React from 'react'
import './caregiver.css'

export const Caregiver = ({ caregivers }) => {

    return (
        <div className='caregiver-container'>
            <div className='table'>
                <div className='table-head'>
                    <div className='table-data'>ID</div>
                    <div className='table-data'>Foto</div>
                    <div className='table-data'>Naam zorgverlener</div>
                    <div className='table-data'>Functie</div>
                    <div className='table-data'>Email</div>
                    <div className='table-data'>Telefoonnumer</div>
                </div>
                <div className="table-content">
                    {caregivers.map((data, index) => {
                        return(
                            <div className='table-body'>
                                <div className='table-data'>{data.userId}</div>
                                <div className='table-data'>
                                    <img className='image' src={data.thumbnail} alt='thumbnail'/>
                                </div>
                                <div className='table-data'>{data.preferredFullName}</div>
                                <div className='table-data'>{data.jobTitleName}</div>
                                <div className='table-data'>{data.email}</div>
                                <div className='table-data'>{data.phoneNumber}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
