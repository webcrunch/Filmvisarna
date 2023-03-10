import { useEffect } from 'react';
import { useStates } from '../utilities/states';
import { get, post, del } from '../utilities/backend-talk';
export default RegisterPage;

function RegisterPage(){
	const user = useStates('user');
	const form = useStates({
		username:"",
		password: "",
		firstname: "",
		lastname: ""
	})
	useEffect(() => {
		document.body.classList.add("registerPage");
		return() => document.body.classList.remove("registerPage");
	}, [] );

	const handleSubmit = async e => {
		e.preventDefault();
		let body = {
			 "id": user.users.users.length + 1,
      		"username": form.username,
      		"password": form.password,
      		"bookings": []
		}
		let result = await post('/api/register', body);
		user.users = result.data;
	}

	return <>

	
	


		<div className='register'>
			<div className='register_form'>
				{/* <h1>Skapa konto för att boka filmer och hantera dina bokningar lättare.</h1> */}
				<form onSubmit={handleSubmit}>
					<label className='label'>Användarnamn:</label>
					<input type="text" className='username' id="username" name="username" {...form.bind('username')} pattern='[A-Za-z0-9]{4,}' title='Minimum 4 characters required' required />
					<label className='label'>Lösenord:</label>
					<input className='password' name="password" pattern="[A-Za-z0-9]{8,}" {...form.bind('password')} title='Minimum 8 characters required' required />
					<label className='label'>Förnamn:</label>
					<input className='firstname' type="text" id="firstname" name="firstname" {...form.bind('firstname')} pattern='[A-Za-z0-9]{2,}' title='Minimum 1 characters required' required />
					<label className='label'>Efternamn:</label>
					<input className='lastname' type="text" id="lastname" name="lastname" {...form.bind('lastname')} pattern='[A-Za-z0-9]{2,}' title='Minimum 1 characters required' required />
					<a href="login.html" className='loginlink'>Har du redan ett konto ? Logga in här!</a>

					<button className="register_button" type="submit"> Skapa konto </button>
				</form>
			</div>
	</div>

    </>

}
