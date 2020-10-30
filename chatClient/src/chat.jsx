import React,{useEffect,useState,useRef} from 'react';
import './App.css';
import io from 'socket.io-client';
import {AppBar,Grid,Typography,Button,Avatar,TextField,IconButton,Drawer} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import {auth,firestore} from './firebase'

function Chat(props) {
const user=props.user
  const [payload,setPayload] = useState("");
  const[flag,setFlag] = useState(false)
  const [msg,setMsg] = useState([])
  const dummy = useRef()
  const [currentSocket,setSocket]= useState()
  const [count,SetCount] = useState(0)
  const [anchor,setAnchor] = useState(false)

  useEffect(()=>{
    const socket = io() //add your server socket location here. For example(test locally): localhost://3000
    setSocket(socket)
    socket.on('connected',data=>{
      setFlag(data)
      firestore.collection('server').doc('messages').get().then(doc=>{
        if(doc.data().msg)
        {
          setMsg(doc.data().msg)
        }
      })
      .catch(error=>{
        if(error.code === "Unavailable")
        console.log(error)
      })
    })
    socket.on("count",data=>{
      SetCount(data.count)
    })
    socket.on("gotMsg",data=>{
        setMsg(msg=>[...msg,data])
      })
    
    return ()=>{
        console.log("unmounted")
        socket.disconnect()
    }
  },[])

  useEffect(()=>{
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  },[msg])


  const formSubmit = (e) => {
    e.preventDefault()
    if(payload)
    {
        currentSocket.emit('chatMessage',{uid:user.uid,name:user.displayName,photoURL:user.photoURL,msg:payload,CAT:Date().toLocaleString()})
        setPayload("")
        
    }

  }

  return (
    <div className="App" style={{minHeight:"100vh",alignItems:"center",display:"flex",flexDirection:"column",backgroundColor:"#1B262C",backgroundSize:"100%"}}>
      
            <Grid style={{marginTop:"3%"}} container justify="center">
            <Grid item xs={12} sm={12} md={10} lg={6} style={{minHeight:"85vh",backgroundColor:"#132743",borderRadius:"8px"}}> 
            <div>
                <AppBar position="static" color="primary">
                    <Grid container  justify="space-between" alignItems="center" style={{paddingRight:"20px",paddingTop:"15px",paddingBottom:"15px",paddingLeft:"20px"}}>
                        <Grid item  xs={4} sm={5} style={{display:"flex",alignItems:"center"}}>
                            <Typography style={{marginRight:"20px",fontFamily:"Courier New', Courier, monospace",color:"#79d70f"}} variant="h4">Chat Room</Typography>
                         <Grid>
                              {flag?<p className="status">Connected</p>:<p className="status">Not Connected</p>}
                              <p className="count">{count} user online</p>
                         </Grid>
                        </Grid>
                        <Grid style={{display:"flex"}}>
                            <Avatar alt="Remy Sharp" src="" style={{width:"50px",height:"50px",marginRight:"20px"}} src={user.photoURL}></Avatar>
                            <Button  variant="contained" color="secondary"onClick={()=>{auth.signOut()}}>Logout</Button>
                            <IconButton onClick={e=>{setAnchor(true)}}><MenuIcon/></IconButton>
                            <Drawer anchor="right"open={anchor}></Drawer>
                        </Grid>
                    </Grid>
                  </AppBar>
                  <Grid container justify="center">
                    <Grid className="main" item xs={12} sm={11} style={{marginTop:"2%",marginBottom:"10px"}}> 
                              {msg && msg.map((data,index)=>(
                                            <ChatMsg key={index} msg={data}/>
                                        ))}
                                      <span ref={dummy}></span>
                    </Grid>
                  </Grid>
                        <form onSubmit={formSubmit}> 
                        <Grid container justify="center">
                            <Grid item xs={12} sm={11} style={{display:"flex",overflow:"hidden"}}>
                                <TextField variant="outlined" multiline={true} InputProps={{ style: {borderRadius:"20px",borderWidth:"40px"}}}  placeholder="Enter your message" style={{backgroundColor:"#a6f6f1",minWidth:"90%",borderRadius:"20px"}} value={payload} onChange={(e)=>{setPayload(e.currentTarget.value)}}></TextField>
                                <Button variant="contained" onClick={(e)=>{formSubmit(e)}} style={{border:"10px",background:"rgba(17, 175, 80, 0)"}}><SendIcon  style={{color:"#bbe1fa",fontSize:"40px"}}/></Button>
                            </Grid>
                        </Grid>
                        </form>               
            </div>
            </Grid>
        </Grid>
        <div className="footer" style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
          <p>Developed by Prabhav Singh Negi </p>
          <a href="https://github.com/prabhavnegi">My GitHub</a>
        </div>
    </div>
  );
}

const ChatMsg = (props) => {
  const {uid,photoURL,msg,CAT} = props.msg
  const msgClass = uid===auth.currentUser.uid ? "sender" : "reciever"
  const ts = new Date(CAT)
  const dt=ts.toLocaleDateString() + " " +  ts.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  return (
    <div className={msgClass}>
      <div className="msg"> 
        <Avatar src={photoURL} fontSize="small"></Avatar>
        <p>{msg}</p>
      </div>
      <div className="date">
        <p>{dt}</p>
      </div>
    </div>
  )
}

export default Chat;