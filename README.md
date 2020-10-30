# chatApp
This project is a simple chatApp where a user can connect using Google Acoount and send message to the server.
It works using the SOCKETIO library and the user connects to the server sockets.

I have removed my firebase credentials from the code.

For backend it has NODEJS SOCKETIO for realtime chat and Firebase firestore and authentication for database.
  A user can join the chat by signing in using Google Sign In.
  The server initially send messages using SOCKETIO but whenever a user disconnects or the message list reaches 20 messages it writes the chat history in the database.
  
                                                    -------------------------------------------------------------------
                                                    
For frontend it has REACT and the UI is made using MATERIALUI library

                                                    -------------------------------------------------------------------

The LIVE DEMO OF THE APP -> https://textapp.netlify.app/
