
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import './login.css'

import { MdOutlineVisibility } from 'react-icons/md'
import { AiOutlineEyeInvisible } from 'react-icons/ai'

import logo from '../../assets/Dytter_Logo_2022.svg'
import { useApp } from '../../context/AppContext';
import { fetchCaregiversData } from '../../miscellaneous/API Fetch/fetchCaregiver';
import { fetchBookingsData } from '../../miscellaneous/API Fetch/fetchBookings';
import { matchData } from '../../miscellaneous/API Fetch/matchData';

export const Login = () => {

	// INITIALIZE USE NAVIGATE HOOK TO BE USED IN NAVIGATING TO THE LOGIN PAGE WHEN THE REGISTRATION IS SUCCESSFUL
    const navigate = useNavigate();

	// INITIALIZE VARIABLES
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [error, setError] = useState();
	const [show, setShow] = useState(false);

	// GET THE STATES FROM THE APP PROVIDER
	const { 
		setLoading,
		loading,
		setCaregivers,
		setBookings,
		caregivers,
		bookings,
		setMatchedData
	} = useApp();

	// HANDLE ON FORM SUBMIT
	const handleSubmit = async() => {

		// CHECK IF THE FIELDS ARE EMPTY
		if(!email || !password){
			return setError('Please fill all the fields');
		}

		// TRY TO LOG IN
		try {
			setError('');
			setLoading(true);

			// LOGIN USER
			await signInWithEmailAndPassword(auth, email, password);

			// FETCH ALL THE DATA NEEDED
			await fetchCaregiversData(setCaregivers);
			await fetchBookingsData(setBookings);
			await matchData(caregivers, bookings, setMatchedData);
			setLoading(false);
			navigate('/');
		} catch (error) {
			if(error.code === 'auth/user-not-found'){
				setError('User not found');
			}else if(error.code === 'auth/wrong-password'){
				setError('Wrong Password');
			}
			setLoading(false);
		}
	};

	// SET THE ERROR TO AN EMPTY STRING AFTER 2 SECONDS, SO THAT THE ERROR WOULD AUTOMATICALLY HIDE
	useEffect(() => {
		if(error){
			setTimeout(() => {
				setError('');
			}, 2000)
		}
	}, [error])
	
	return (
		<div className="login-container">
			<div className="form-container">
				<div className="left-panel">
					<img src={logo} alt="" className='logo'/>
					<h1>Login</h1>
					{error && <p className='error'>{error}</p>}
					<input 
						type="email" 
						placeholder='Email'
						onChange={e => setEmail(e.target.value)}
					/>
					<div className="password">
						<input 
							type={show ? 'text' : "password"} 
							placeholder='Password'
							onChange={e => setPassword(e.target.value)}
						/>
						<div className="toggle-visibility">
							{show ? (
								<MdOutlineVisibility onClick={() => setShow(!show)}/>
								) : (
								<AiOutlineEyeInvisible onClick={() => setShow(!show)}/>
							)}
						</div>
					</div>
					<button type='button' onClick={handleSubmit}>
						{loading ? (
							<div className="loading"></div>
						) : 'Login'}
					</button>
					<p>Doesn't have an account yet?</p>
					<Link to='/register'>Register</Link>
				</div>
			</div>
		</div>
	);
}
