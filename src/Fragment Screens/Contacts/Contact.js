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

        emailjs.send('service_zeosfkc', 'template_jrqd0yh', 'gYWr46G5g23Qm8e5a')
        .then(res => console.log(res))
        .catch(err => console.log(err));
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
                    <input 
                        type="text" 
                        name='name'
                        placeholder='Name'
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        name='subject'
                        placeholder='Subject'
                        onChange={e => setSubject(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        name='email'
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">

                    <textarea 
                        type="text" 
                        name='message'
                        placeholder='Message'
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
