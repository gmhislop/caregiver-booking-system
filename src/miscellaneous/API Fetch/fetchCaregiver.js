import axios from "axios";

export const fetchCaregiversData = async(setCaregivers) => {

    axios.get('https://my-caregiver-api.herokuapp.com/caregivers')
    .then(({data}) => {
        setCaregivers(data)
    })
    .catch(err => {
        console.log(err);
    });
}