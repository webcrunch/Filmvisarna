import { useEffect } from 'react';
import { useStates } from '../utilities/states';
export default RegisterPage;

function RegisterPage(){
	// const user = useStates('user');
	const form = useStates({
		användarnamn:"",
		förnamn:"",
		efternamn:"",
		lösenord:""
	})


	useEffect(() => {
		document.body.classList.add("registerPage");
		return() => document.body.classList.remove("registerPage");
		
	}, [] );

	function handleSubmit(e){
		e.preventDefault();
		console.log(form.användarnamn,form.förnamn,form.efternamn,form.lösenord);
	}

	return <>

	
	


		<div className='register'>
			<div className='register_form'>
				<form onSubmit={handleSubmit}>
					<label className='label'>Användarnamn</label>
					<input type="text" className='användarnamn' id="användarnamn" name="användarnamn" {...form.bind('användarnamn')} pattern='[A-Za-z0-9]{7,}' title='Minimum 7 characters required' required />
					<label className='label'>Lösenord</label>
					<input className='lösenord' name="lösenord" pattern="[A-Za-z0-9]{8,}" {...form.bind('lösenord')} title='Minimum 8 characters required' required />
					<label className='label'>Förnamn</label>
					<input className='förnamn' type="text" id="förnamn" name="förnamn" {...form.bind('förnamn')} pattern='[A-Za-z0-9]{2,}' title='Minimum 1 characters required' required />
					<label className='label'>Efternamn</label>
					<input className='efternamn' type="text" id="efternamn" name="efternamn" {...form.bind('efternamn')} pattern='[A-Za-z0-9]{2,}' title='Minimum 1 characters required' required />
					<a href="login.html" className='loginlink'>Är du redan registrerad? Logga in här!</a>

					<button type="submit"> Register </button>
				</form>
			</div>
	</div>

    </>

}
