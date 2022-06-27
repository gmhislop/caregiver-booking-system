import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase-config';
import './register.css';
import { setDoc, doc } from 'firebase/firestore'
import { Loader } from '../../miscellaneous/Loader/Loader';
import logo from '../../assets/Dytter_Logo_2022.svg'
import { MdOutlineVisibility } from 'react-icons/md'
import { AiOutlineEyeInvisible } from 'react-icons/ai'

export const Register = () => {

	// INITIALIZE USE NAVIGATE HOOK TO BE USED IN NAVIGATING TO THE LOGIN PAGE WHEN THE REGISTRATION IS SUCCESSFUL
    const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// INITIALIZE VARIABLES
    const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	// HANDLE ON FORM SUBMIT
	const handleSubmit = async() => {
		
		// CHECK IF THE FIELDS ARE EMPTY
		if(!username || !email || !password || !confirmPassword){
			return setError('Please fill all the fields');
		}

		// CHECK IF THE PASSWORD IS THE SAME AS THE CONFIRMATION
		if(password !== confirmPassword){
			return setError('Password do not match')
		}

		// SET THE PASSWORD TO BE AT LEAST 10 CHARACTERS LONG
		if(password.length < 10){
			return setError('Password must be at least 10 characters');
		}

		// CREATE USER IN A TRY CATCH BLOCK
		try {
			setError('');
			setLoading(true);

			// CREATE USER
			const { user } = await createUserWithEmailAndPassword(auth, email, password);

			// ALSO SET THE DATABASE FOR THE USER INFO WHEN THE USER IS SUCCESSFULLY CREATED
			await setDoc(doc(db, 'users', user.uid), {
				username,
				email,
				firstName: 'none',
				lastName: 'none',
				organization: 'none',
				profileUrl: 'https://gravatar.com/avatar/b6e911c78f6ed5f3d32f8ffce3f808bb?s=400&d=mp&r=pg'
			});

			setLoading(false);
			navigate('/login');
		} catch (error) {
			console.log(error);
			if(error.code === 'auth/invalid-email'){
				setError('Invalid email');
			}
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
		<div className="register-container">
			{loading ? (
				<Loader/>
			) : (
				<div className="form-container">
					<div className="left-panel">
						<h1>Register</h1>
						{error && <p className='error'>{error}</p>}
						<input 
							type="text" 
							placeholder='Username'
							onChange={e => setUsername(e.target.value)}
						/>
						<input 
							type="email" 
							placeholder='Email'
							onChange={e => setEmail(e.target.value)}
						/>
						<input 
							type={showPassword ? 'text' : "password"}  
							placeholder='Password'
							onChange={e => setPassword(e.target.value)}
						/>
						<div className="toggle-password-visibility">
							{showPassword ? (
								<MdOutlineVisibility onClick={() => setShowPassword(!showPassword)}/>
								) : (
								<AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)}/>
							)}
						</div>
						<input 
							type={showConfirmPassword ? 'text' : "password"}  
							placeholder='Confirm Password'
							onChange={e => setConfirmPassword(e.target.value)}
						/>
						<div className="toggle-confirm-password-visibility">
							{showConfirmPassword ? (
								<MdOutlineVisibility onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
								) : (
								<AiOutlineEyeInvisible onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
							)}
						</div>
						<button type='button' onClick={handleSubmit}>Register</button>
						<p>Already have an account?</p>
						<Link to='/login'>Login</Link>
					</div>
					<div className="right-panel">
						<img 
                    src={logo} alt="logo" 
                    className='logo'>
					</img>
					</div>
				</div>
			)}
		</div>
	);
}
