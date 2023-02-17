
import { useStates } from '../utilities/states';
export default RegisterPage;

function RegisterPage(){
	// const user = useStates('user');
	const form = useStates({
		username:"",
		firstname:"",
		lastname:"",
		password:""
	})

	function handleSubmit(e){
		e.preventDefault();
		console.log(form.username,form.firstname,form.lastname,form.password);
	}

	return <>

{/* <div className="login">
            <div className="login_form">
                <form onSubmit={handleSubmit}>
                    <label className="label">Username</label>
                    <input className="username" type="text" id="username"  {...form.bind('email')}></input>
                    <label className="label">Password</label>
                    <input className="username" type="password" id="username"  {...form.bind('password')}></input>
                    <button type="submit">Complete your booking</button>
                </form >
            </div >
        </div > */}


		{/* 
	<label class="label" for="username">Username</label>
				<input class="username" type="text"id="username"name="username"pattern="[A_Za-z0-9]{7,}"
				    title="Minimum 7 characters required"required><br>
				<label class="label" for="password">Password</label>
				<input class="password" name="password"pattern="[A-Za-z0-9]{8,}"
				    title="Minimum 8 characters required" required><br>	
				<label class="label"for="firstname">Firstname</label>	
				<input class="firstname"type="text"id="firstname" name="firstname"pattern="[A_Za-z0-9]{2,}"	
				     title="Minimum 1 characters required"required><br>
				<a href="login.html" class="loginlink">Already registered? Log In here!</a>
				<input class="register _button" type="submit"value="Sign Up" href="login.html"

		*/}

		<div className='register'>
			<div className='register_form'>
				<form onSubmit={handleSubmit}>
					<label className='label'>Username</label>
					<input type="text" className='username' id="username" name="username" {...form.bind('username')} pattern='[A-Za-z0-9]{7,}' title='Minimum 7 characters required' required />
					<label className='label'>Password</label>
					<input className='password' name="password" pattern="[A-Za-z0-9]{8,}" {...form.bind('password')} title='Minimum 8 characters required' required />
					<label className='label'>Firstname</label>
					<input className='firstname' type="text" id="firstname" name="firstname" {...form.bind('firstname')} pattern='[A-Za-z0-9]{2,}' title='Minimum 1 characters required' required />
					<label className='label'>Lastname</label>
					<input className='lastname' type="text" id="lastname" name="lastname" {...form.bind('lastname')} pattern='[A-Za-z0-9]{2,}' title='Minimum 1 characters required' required />
					<button type="submit">Register</button>
				</form>
			</div>
	</div>

    </>

}
