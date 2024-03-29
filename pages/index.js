import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { Button, Link, TextField, Text } from '@aws-amplify/ui-react';


export default function Home() {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading,setLoading] = useState(true);

  async function callWhoami(){
    const res = await fetch('api/whoami');
    //console.log(res);

    if (res.status === 200){
      //console.log(res.json());

      return await res.json();
      /* res.json().then(
        (data) => data.username
      ).catch((err)=> console.log(err)); */
      //return res.json().username;
    }
    else{
      return null;
    }
  }

  useEffect(()=>{

    callWhoami().then(
      (res) => {

        if (res === null){
          setCurrentUser(res);
        }else{
          //console.log(res);

          setCurrentUser(res.username);
/*           res.then(
            (data) => setCurrentUser(data.username)
          ).catch((err)=> console.log(err)); */
        }
        
        setLoading(false);
    }
    ).catch((err)=> {
      console.log(err);
      setLoading(false);
    });

  },[]);




  if (loading === true) {

  return (
    <div>
      <h1>Loading.... </h1>
    </div>
  )

  }
  else if (currentUser === null) {

    return (
      <div className={styles.container}>
        <Head>
          <title>Current User Info</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main>
          <h3 className={styles.title}>
            {'Welcome everyone. To sign in please use the link below'}
          </h3>
          <div className={styles.footer}>
        <Link href='/login'>Proceed to Login..</Link>
        </div>
          </main>
          
      </div>
    )

  }
  else
  
  {

  return (
    <div className={styles.container}>
      <Head>
        <title>Current User Info</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3 className={styles.title}>
          {'Welcome to this wonderful app '+ currentUser}
        </h3>
        <div className={styles.footer}><Link href='/signout'>Sign Out</Link></div>
        <Cart></Cart>
      </main>
        
    </div>
  )
  }
}

/* function ListNotes(){
  const [notes,setNotes] = useState([]);

  return 
  (
    <div className={styles.container}>
      {
        notes.map(
          (note) => {

          }
        )
      }
    </div>
  )

} */

function AddNote({refresh}){

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [result,setResult] = useState('');

  function descChange(e){
    setDesc(e.currentTarget.value)
  }

  function nameChange(e){
    setName(e.currentTarget.value)
  }

  async function createNote(){

    const res = await fetch('api/addnote?name='+name+'&description='+desc);
    
    const body = await res.json();
    console.log(body);
    if (res.status === 200){
       setResult('note created sucessfully');
       refresh();
    }else{
      setResult('Some issue with creation of note');
    }
  }

  return (
    <div className={styles.code}>
      <TextField label="Name:" placeholder='provide a name for the note' onChange={nameChange}></TextField>
      <TextField label="Description:" placeholder='provide a description for the note'  onChange={descChange}></TextField>
      <Button onClick={createNote}>Add Note</Button>
      <Text>{result}</Text>
    </div>
  )
}


const Cart = () => {

  const [notes,setNotes] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');

  async function listNotes(){

    const res = await fetch('api/listnotes');
    
    const body = await res.json();
    console.log(body);
    if (res.status === 200){
      setNotes(body.result.items);
    }else{
      setErrorMessage('Some issue with listing notes');
    }
  }

  useEffect(()=>{
    listNotes();

  },[]);



  return (
      <div className={styles.grid}>
      <div className={styles.separate}> 
      
      <AddNote refresh={listNotes}></AddNote>
      </div>
      {
          notes.map((note)=>(
              <Note owner={note.owner} id={note.id} name={note.name} content={note.description} refresh={listNotes} key={note.id}></Note>
          ))
      }
      </div>
  )
}


const Note = ({owner,id,name,content,refresh}) => {
  const [errormsg,setErrorMessage] = useState('');

  async function deleteNote(id){

    const res = await fetch('api/deletenote/'+id);
    
    const body = await res.json();
    console.log(body);
    if (res.status === 200){
      setErrorMessage('note delete sucessfully');
      refresh();
    }else{
      setErrorMessage('Some issue with deletion of this note');
    }
  }
  
  return (
      <div className={styles.card}>  
          <h6>{id}</h6>
          <h3>{name}</h3>
          <h4 className={styles.code}>{content}</h4>
          <h5>Owned by: {owner}</h5>
          <Button onClick={()=>deleteNote(id)}>Delete this note</Button>
          <br></br>
          <label>{errormsg}</label>
      </div>
  )
}

