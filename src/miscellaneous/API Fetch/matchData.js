import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

export const matchData = async(caregivers, bookings, setMatchedData) => {

    // CHECK IF THE CAREGIVERS AND BOOKINGS ARE STILL EMPTY
    if(!caregivers && !bookings) return;
    // COPY THE VALUE OF BOTH CAREGIVER AND BOOKINGS TO A VARIABLE SO THE ORIGINAL DATA WON'T BE AFFECTED WHEN THE DATA IS SPLICED
    const caregiversList = [...caregivers];
    const bookingsList = [...bookings];

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

                setMatchedData(customMatch);

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
    })
}
