import { useEffect } from "react";
import { useStates } from '../utilities/states';
export default LoginPage;

function LoginPage() {
    const form = useStates({
        email: '',
        password: ''
    })
    const user = useStates('user');
    // send email and password to server for authentication

    useEffect(() => {
        // add the class ticketPage to the body element
        // when the page shows / the component mounts
        document.body.classList.add("loginPage");
        // remove the class ticketPage when the page
        // unmounts..
        return () => document.body.classList.remove("loginPage");
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        let correctUser = user.users.filter(obj => obj.username == form.email && obj.password == form.password);
        if (correctUser.length > 0) {
            user.name = correctUser[0].username;
            user.id = correctUser[0].id;
            user.loggedin = true;
        }
    }
    return  <>{ !user.loggedin ?  <div className="login">
            <div className="login_form">
                <form onSubmit={handleSubmit}>
                    <label className="label">Username</label>
                    <input className="username" type="text" id="username"  {...form.bind('email')}></input>
                    <label className="label">Password</label>
                    <input className="username" type="password" id="username"  {...form.bind('password')}></input>
                    <button type="submit">Complete your booking</button>
            </form >
        </div > </div> : 
            <p>Välkommen {user.name} du är inloggad</p>
            }
    </>

}