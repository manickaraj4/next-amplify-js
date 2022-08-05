import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import styles from '../styles/Home.module.css'


export default function Signout(){
    const [message,setMessage] = useState('Signing Out...');
    useEffect(
        () =>  {
            Auth.signOut().then(
                (res)=> {
                    window.location = '/';
                }
            ).catch((err)=>{
                console.log(err);
                setMessage('Could not sign out');
            })
            
        }, []
    );
    

    return (
        <div>
            <h1>{message}</h1>
        </div>
    )
}