import React from 'react';
import './App.css';
import {Grid,Button} from '@material-ui/core'
import {auth,googleSignIn} from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from "./chat"

function App() {
  const [user, loading] = useAuthState(auth)

 return (
   <div>
      {loading?"":user?<Chat user={user}/>:<SignIn/>}
   </div>
 )
}





function SignIn() {
  return (
    <div>
    <div style={{ minHeight: "100vh", display: "flex",alignItems:"center", backgroundColor: "#1B262C", backgroundSize: "100%" }}>
      <Grid container justify="center">
        <Grid item xs={12} sm={11} md={6} style={{ minHeight: "80vh", backgroundColor: "#0f4c75", borderRadius: "8px" }}>
          <Grid container style={{ marginTop: "15%" }} direction="column" justify="center">
            <h1 style={{ textAlign:"center",color: "white", fontSize: "4rem" }}>Welcome to the ChatApp project</h1>
            <Button variant="contained" color="secondary" style={{ marginLeft: "30%", marginRight: "30%", paddingTop: "10px", paddingBottom: "10px" }} onClick={() => { googleSignIn(); } }>Sign in With Google</Button>
            <h2 style={{marginTop:"10%",marginBottom:"10px",textAlign:"center",color:"#fca652"}}>Developed By Prabhav Negi</h2>
            <h4 style={{marginTop:"0",textAlign:"center",color:"white"}}><a style={{color:"#ccf6c8"}} target="_blank" rel="noopener noreferrer" href="https://github.com/prabhavnegi">https://github.com/prabhavnegi</a></h4>
          </Grid>
        </Grid>
      </Grid>
    </div>
    </div>
  );
}

export default App;