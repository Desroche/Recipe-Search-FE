import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../provider/authProvider'; 
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    
    const { token } = useAuth();
    const navigate = useNavigate();
    const { setToken } = useAuth(); 
    const [loginState, setLoginState] = useState(fieldsState);

    
    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, [token, navigate]);


    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = async () => {
        try {

            const response = await fetch('/auth/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginState),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('username', data.username);
                navigate('/home');            
            } else {
                if (response.status === 401) {
                    console.error('Incorrect username or password. Please try again.');
                } else {
                    console.error('Login failed. Please check your credentials and try again.');
                }
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };
    

    return(
        
    <div className="max-w-md w-full mx-auto space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
                }
            </div>
    
            <FormAction handleSubmit={handleSubmit} text="Login"/>

        </form>   
    </div>
    )
}