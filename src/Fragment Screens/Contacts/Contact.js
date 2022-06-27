import React, { useEffect } from 'react'
import { useState } from 'react'
import './contact.css'
import emailjs from '@emailjs/browser';

export const Contact = () => {

    // INITIALIZE VARIABLES
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [error, setError] = useState();

    const sendEmail = () => {

        // CHECK IF THE FIELDS ARE EMPTY
        if(!name || !email || !message || !subject){
            setError('Please fill all the fields');
            return;
        }

        // const info = {
        //     name,
        //     subject,
        //     email,
        //     message
        // }

        // THIS WLL BE SENT THROUGH EMAIL JS. WHAT YOU NEED TO DO IS TO CREATE YOUR OWN ACCOUNT AT EMAIL JS AND COPY ALL THE NEEDED KEYS AS THE PARAMETER

        // emailjs.send('service_34j7jhp', 'template_6p7p0lz', info, 's4i9jk7PO-pMqAN4h')
        // .then(res => console.log(res))
        // .catch(err => console.log(err));
    }

    // SET THE ERROR BACK TO EMPTY AFTER 2 SECONDS
    useEffect(() => {
		if(error){
			setTimeout(() => {
				setError('');
			}, 2000)
		}
	}, [error])

    return (
        <div className='contact-container'>
            <form>
                <h1>Technical Support</h1>
                {error && <p className='error'>{error}</p>}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name='name'
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                        type="text" 
                        name='subject'
                        onChange={e => setSubject(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name='email'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                        type="text" 
                        name='message'
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type='button' onClick={sendEmail}>Send</button>
                </div>
            </form>
        </div>
    )
}
