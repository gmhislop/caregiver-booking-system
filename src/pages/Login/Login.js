
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { Loader } from '../../miscellaneous/Loader/Loader';
import './login.css'
import logo from '../../assets/Dytter_Logo_2022.svg'
import { MdOutlineVisibility } from 'react-icons/md'
import { AiOutlineEyeInvisible } from 'react-icons/ai'

export const Login = () => {

	// INITIALIZE USE NAVIGATE HOOK TO BE USED IN NAVIGATING TO THE LOGIN PAGE WHEN THE REGISTRATION IS SUCCESSFUL
    const navigate = useNavigate();

	// INITIALIZE VARIABLES
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);

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
			{loading ? (
				<Loader/>
			) : (
				<div className="form-container">
					<div className="left-panel">
						<h1>Login</h1>
						{error && <p className='error'>{error}</p>}
						<input 
							type="email" 
							placeholder='Email'
							onChange={e => setEmail(e.target.value)}
						/>
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
						<button type='button' onClick={handleSubmit}>LOG IN</button>
						<p>Already have an account?</p>
						<Link to='/register'>Register</Link>
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
