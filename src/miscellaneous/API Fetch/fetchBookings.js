import axios from 'axios';

export const fetchBookingsData = async(setBookings) => {

    axios.get('https://booking-data-project.herokuapp.com/Bookings/')
    .then(({data}) => {
        setBookings(data);
    })
    .catch(err => { 
        console.log(err);
    });
}
