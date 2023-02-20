
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


	useEffect(() => {
		document.body.classList.add("registerPage");
		return() => document.body.classList.remove("registerPage");
		
	}, [] );

	function handleSubmit(e){
		e.preventDefault();
		console.log(form.username,form.firstname,form.lastname,form.password);
	}

	return <>

	
	


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
					<a href="login.html" className='loginlink'>Already registered? Log In here!</a>

					<button type="submit"> Register </button>
				</form>
			</div>
	</div>

    </>

}
