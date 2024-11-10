import { useEffect, useRef } from 'react';
import { useStates } from '../utilities/states';
import { post } from '../utilities/backend-talk';

export default function RegisterPage() {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const user = useStates('user');

    useEffect(() => {
        document.body.classList.add("registerPage");
        return () => document.body.classList.remove("registerPage");
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        const body = {
            id: user.users.users.length + 1,
            username: userNameRef.current.value,
            password: passwordRef.current.value,
            firstname: firstNameRef.current.value,
            lastname: lastNameRef.current.value,
            bookings: []
        };


        const result = await post('/api/register', body);
		user.users = result.data;
		window.location.href = '/authentication';

    }

    return (
        <div className='register'>
            <div className='register_form'>
       <form onSubmit={handleSubmit}>
                    <label className='label'>Användarnamn:</label>
                    <input type="text" ref={userNameRef} className='username' id="username" name="username"  title='Minimum 4 characters required' required />
                    
                    <label className='label'>Lösenord:</label>
                    <input type="password" ref={passwordRef} className='password' name="password"  pattern="[A-Za-z0-9]{8,}" title='Minimum 8 characters required' required />
                    
                    <label className='label'>Förnamn:</label>
                    <input type="text" ref={firstNameRef} className='firstname' id="firstname" name="firstname"  pattern='[A-Za-z0-9]{2,}' title='Minimum 1 character required' required />
                    
                    <label className='label'>Efternamn:</label>
                    <input type="text" ref={lastNameRef} className='lastname' id="lastname" name="lastname"  pattern='[A-Za-z0-9]{2,}' title='Minimum 1 character required' required />
                    
                    <a href="login.html" className='loginlink'>Har du redan ett konto? Logga in här!</a>
                    
                    <button className="register_button" type="submit"> Skapa konto </button>
                </form>
            </div>
        </div>
    );
}