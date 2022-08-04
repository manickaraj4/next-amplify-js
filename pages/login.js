import { Auth } from 'aws-amplify';
import { useState } from "react";

export default function Login(){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const onChangeUsername = function (e) {
        setUsername(e.target.value);
    }

    const onChangePassword = function (e) {
        setPassword(e.target.value);
    }



    const signIn  = async function signIn() {
        try {
            const user = await Auth.signIn(username, password);
            console.log(user);
            setErrorMessage('');
            window.location = '/';
        } catch (error) {
            console.log('error signing in', error);
            setErrorMessage('password or username incorrect');
        }
    }

    return (
        <div>
            <label>Username</label>
            <input label='Username' type='text' onChange={onChangeUsername} value={username}/>
            <br></br>
            <label>Password</label>
            <input type='password' onChange={onChangePassword} value={password}/>
            <br></br>
            <button onClick={signIn}>Sign In</button>
            <h1>{errorMessage}</h1>
        </div>
    )

}