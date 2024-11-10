import { useEffect, useRef } from "react";
import { useStates } from '../utilities/states';
export default LoginPage;

function LoginPage() {
    const user = useStates('user');
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        document.body.classList.add("loginPage");
        return () => document.body.classList.remove("loginPage");
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let correctUser = user.users.users.filter(obj => obj.username === email && obj.password === password);
        if (correctUser.length > 0) {
            user.name = correctUser[0].username;
            user.id = correctUser[0].id;
            user.loggedin = true;
        }
    }

    return (
        <>{!user.loggedin ? (
            <div className="login">
                <div className="login_form">
                    <form onSubmit={handleSubmit}>
                        <label className="label">Användarnamn</label>
                        <input className="username" type="text" id="username" ref={emailRef} />
                        <label className="label">Lösenord</label>
                        <input className="username" type="password" id="password" ref={passwordRef} />
                        <button className="login_button" type="submit">Logga in</button>
                    </form>
                </div>
            </div>
        ) : (
            <p>Välkommen {user.name}, du är inloggad</p>
        )}
        </>
    );
}
