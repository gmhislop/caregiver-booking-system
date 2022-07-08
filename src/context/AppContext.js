import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext();

export const useApp = () => {
    return useContext(AppContext);
}

export const AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
	const [caregivers, setCaregivers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [matchedData, setMatchedData] = useState([]);


    const value = {
        loading,
        setLoading,
        caregivers,
        setCaregivers,
        bookings,
        setBookings,
        matchedData, 
        setMatchedData
    }

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}
