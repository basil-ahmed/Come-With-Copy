# Come-With

[Website Link](https://come-with-updated.glitch.me/)

## Concept:

Come-With is an interactive website that encourages Students from the NYUAD community to get out of their comfort zone and partake in different activities
and foster real-life connections between the users. Come-With is a tool that encourages students to take advantage of the richness of real life events and activities around, instead of wasting time online. The web application is a tool that unlike other internet products does not aim to absorb the time and 
life of its users, but it is an intermediary that aims to connect people in real life.

Come-With displays a collection of activities from different categories: sports, conferences, events, city events and user-created events. Moreover, the website has a feature that allows the users to create personalized events that will be posted on the websiteand will automatically create a chat-box that will gather all the people interested in the event.

Once the user picks an activity they will be automatically directed to a real-time chat box that allows the users to chat and agree on the details of their 
meeting.

<img width="724" alt="Screenshot 2022-11-12 at 21 46 48" src="https://user-images.githubusercontent.com/112507667/201487606-75f84642-4112-48d4-b1c9-3e06d19dbb22.png">

## Design:

The user experience has been specifically engineered to nudge the user to discover a web-page which is a list of activities divided into different categories. The activities are presented in a big and clear font, with an emoji describing each activity on the website, and the color of the background
of the activity changes upon hover. These design changes are specifically made to appeal to the users that are mostly Gen-z internet savvy teenagers. Moreover, the design of the website is straightforward and clean-cut in order to attract the attention of the user quickly and avoid wasting the users
time on useless features or design decisions.

<img width="500" alt="Screenshot 2022-11-12 at 22 02 00" src="https://user-images.githubusercontent.com/112507667/201488278-f7652e91-d13a-41a6-af03-31aefe3dde0c.png"> 

### Chat-box:

The chat box feature is designed to be straight forward and in a big font with real-time chatting capabilities. Each text includes the name and the content of the message. Moreover, The input field is designed to be big at the bottom of the page and it is designed to automatically send the message of the user once the enter key is pressed. This has been purposely implemented in the website to accommodate the young user base that like speed and straight forward 
design.
<img width="500" alt="Screenshot 2022-11-12 at 20 29 53" src="https://user-images.githubusercontent.com/112507667/201488302-edca55a5-d3b5-4323-901d-688747a041f8.png">



## Technicalities & Challenges:

### Adding name to the chat:

While working on the chat box it has been a challenge to emit the name of the user and add it to the chat. Because by that time the message emitting system was working but the infrastructure to send the name was not there and everything had to be redone and reverse engineered to include the name of the users in the chat. However, to avoid the problem we went around the issue by including the name with the message and separate them with a signal.

### Chat-box:

In order to make the chat-box appear and disappear once the user picks an activity. All the elements on the page disappear and the chat-box appears on the 
webpage. To avoid this problem our team used this code in the javascript.

<img width="470" alt="Screenshot 2022-11-12 at 23 32 51" src="https://user-images.githubusercontent.com/112507667/201491458-65a704ff-0e4e-4ff0-abad-66da15177979.png">

### Creating new divs:

Creating new divs and adding them to each different category has been a challenge, it was also a difficulty to emit the div and have show to different users that are connected to the server. These divs were for the new activities created by the users. When we figured it out to send it to every other user, whenever a user reloaded the new activity would not exist anymore. We eventually figured it out.

### Pop-up:
It was a challenge designing the pop-up and making it appear and disapear once the user clickes on the create a new activity option. this problem was solved by including certain css style code. Moreover designing the way the pop up appears then disappears from the screen was a challenge.

## Sockets Flow:

- When a user connects to the website, the socket makes a connection. 
- The first thing, after a connection is built between the server and the client, the client does is to check if there are already any new activities created by people and those are imported on to the webpage by the client.

          newact.addEventListener("click", () => {

            var input_act = document.getElementById("Activity").value;
            
            var input_category = document.getElementById("Category").value;
            
            // Send the Activity to the Server
            socket.emit("activity", {
                activity: input_act,
                category: input_category
            })

          })

- This happens in real time so that whenever anyone creates a new activity, it gets uploaded everywhere else.
- This is also useful for when anyone reloads the page, the new activity is still there.
- Whenever a client clicks on the activity, it sends the name to the server and the server creates a room of the name of the activity.

            //emit a message requesting to join the room
            socket.emit('joinroom', {
                room: e.target.id
            })

- It then checks the already available messages available in the room and sends it back to client.

      socket.on('joinroom', (data) => {
              console.log(io.sockets.adapter.sids);
              if(socket.room) {
                  socket.leave(socket.room);
              }
              socket.join(data.room);
              socket.room = data.room;
              if (!messages[socket.room]) {
                  messages[socket.room] = [];
              }
              socket.emit('messages',messages[socket.room]);
          }) 
          
- This is helpful for people when they join a chat room and the previous messages are still there.

## Next steps:

We would like to add more events in the web-application. One of the ideas we have is fetch data from APIs such as eventbrite or other platforms.
Moreover, We would like to improve the design and have the name of the activity picked by the user show in the chat box.
We would also like to use a server that can back up the data and thus the application will run on peer to peer networks and a database to back up all the data.

## Website Design

<img width="1440" alt="Screen Shot 2022-11-10 at 10 28 22 AM" src="https://user-images.githubusercontent.com/90772853/201492685-ba141728-51b5-4c3d-9a47-289b76afaeff.png">
<img width="1440" alt="Screen Shot 2022-11-10 at 10 27 26 AM" src="https://user-images.githubusercontent.com/90772853/201492693-97583c86-db72-4cec-befb-01c7f9af80aa.png">
<img width="1440" alt="Screen Shot 2022-11-10 at 10 27 13 AM" src="https://user-images.githubusercontent.com/90772853/201492695-d68c8aad-6d8f-46b4-beaf-42d0bc9524f8.png">
