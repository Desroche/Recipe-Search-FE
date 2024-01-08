import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";

const fields = signupFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {

    const [signupState, setSignupState] = useState(fieldsState);
    const [errorMessage, setErrorMessage] = useState('');
    const { username, email, password, confirm_password } = signupState;
    const navigate = useNavigate();

    const validateForm = () => {
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?/]+/;


        if (!username) {
            return "Username is required.";
        }
        if (!usernameRegex.test(username)) {
            return "Username must contain only letters or numbers and be a minimum of 8 characters.";
        }
        if (username.length < 8 || username.length > 20) {
            return "Username must be a minimum of 8 characters and a maximum of 20.";
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) { 
            return "Email is invalid.";
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (!uppercaseRegex.test(password)) {
            return "Password must include at least one uppercase letter.";
        }
        if (!lowercaseRegex.test(password)) {
            return "Password must include at least one lowercase letter.";
        }
        if (!numberRegex.test(password)) {
            return "Password must include at least one number.";
        }
        if (!specialCharRegex.test(password)) {
            return "Password must include at least one special character.";
        }
        if (password !== confirm_password) {
            return "Passwords do not match.";
        }
        return null;
    };


    const handleChange = (e) => {
        if (e.target.id === 'password' || e.target.id === 'confirm_password') {
            setErrorMessage('');
        }
        setSignupState({ ...signupState, [e.target.id]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }
        createAccount();
    };

    
    const createAccount = async () => {
        try {
            const response = await fetch('/auth/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirm_password,
                }),
            });

            if (response.ok) {
                navigate('/');
            } else {
                const responseData = await response.json();

                if (response.status === 400) {
                    if(responseData.error === 'username_taken') {
                        setErrorMessage('Username is already taken.');
                    } else if (responseData.error === 'email_taken') {
                        setErrorMessage('Email already in use.');
                    } else {
                        setErrorMessage('Username or Email already in use.');
                    }
                } else {
                    console.error('Signup failed with status:', response.status);
                    setErrorMessage('Signup failed. Please try again later.');
                }
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setErrorMessage('Error during signup. Please try again later.');
        }
    };

    return (
        <div className="max-w-md w-full mx-auto space-y-8">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="">
                    {fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )}
                    {errorMessage && <div className='error-message'>{errorMessage}</div>}
                    <FormAction handleSubmit={handleSubmit} text="Signup" />
                </div>
            </form>
        </div>
    )
}



/*



*/