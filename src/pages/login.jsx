export default LoginPage;

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // send email and password to server for authentication 

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}


