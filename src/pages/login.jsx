import { useState } from "react";
import { useStates } from '../utilities/states';
export default LoginPage;

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const form = useStates({
        email: '',
        password: ''
    })
    // send email and password to server for authentication 

    function handleSubmit(e) {
        e.preventDefault();
        console.log(form.email, form.password);
    }

    return <>

        <div className="login">
            <div className="login_form">
                <form onSubmit={handleSubmit}>
                    <label className="label">Username</label>
                    <input className="username" type="text" id="username"  {...form.bind('email')}></input>
                    <label className="label">Password</label>
                    <input className="username" type="password" id="username"  {...form.bind('password')}></input>
                    <button type="submit">Complete your booking</button>
                </form >
            </div >
        </div >

    </>

}
