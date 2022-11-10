//Open and connect socket
let socket = io();
//Listen for confirmation of connection
socket.on("connect", () => {
    console.log("Connected");
});

let rooms = [];
let name; // global variable to store the name using window.name inside functions

let room = document.getElementById("room");
let heading = document.getElementById("heading");
let sports = document.getElementById("sports");
let events = document.getElementById("events");
let conferences = document.getElementById("conferences");
let newActivities = document.getElementById("new");
let create = document.getElementById("create");

window.addEventListener("load", () => {

    var activities = document.getElementsByClassName("container");
    var newact = document.getElementById("btn");
    newact.addEventListener("click", () => {

            var input_act = document.getElementById("Activity").value;
            
            var input_category = document.getElementById("Category").value;
            
            // Send the Activity to the Server
            socket.emit("activity", {
                activity: input_act,
                category: input_category
            })

    })

    // storing all the activities in the room array
    for (var i = 0; i < activities.length; i++) {

        rooms.push(activities[i].id);

    };

    for (var i = 0; i < activities.length; i++) {
        activities[i].addEventListener('click', (e) => {

            window.name = prompt("Please enter your name:", "");

            heading.style.display = "none";
            sports.style.display = "none";
            events.style.display = "none";
            conferences.style.display = "none";
            newActivities.style.display = "none";
            create.style.display = "none";
            room.style.display = "block";

            //emit a message requesting to join the room
            socket.emit('joinroom', {
                room: e.target.id
            })

            console.log({ rooms: e.target.id });
        });
    }

    //send the message to the server when a new message is typed up and also add the name to it
    let sendbutton = document.getElementById('send-button');
    sendbutton.addEventListener('click', () => {
        let message = window.name + " ➟ " + document.getElementById("my-message").value;
        socket.emit('message', {
            message: message
        })
    })

    var input = document.getElementById("my-message");
    input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("send-button").click();
        input.value = '';//clear the input field----------------------ADD THIS LINE
    }
    });
})

//as soon as you join a room, get the latest messages in that room
socket.on('messages', (data) => {
    console.log(data);
    document.getElementById('messages').innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let elt = document.createElement('p');
        elt.classList.add('message');
        elt.innerHTML = data[i];
        document.getElementById('messages').appendChild(elt);
    }
})

//when another client in your room send a message, and you receive it
socket.on('message', (data) => {
    console.log(data)
    let elt = document.createElement('p');
    elt.innerHTML = data.message;
    elt.classList.add('message');
    document.getElementById('messages').appendChild(elt);
})

//when another client makes a new activity and you recieve it
socket.on("activity", (data) => {
    
    // create a new div element
    const newDiv = document.createElement("div");
    // and give it some content
    const newContent = document.createTextNode(data.activity);
    // add the text node to the newly created div
    newDiv.classList.add("container");
    newDiv.id = data.activity;
    newDiv.appendChild(newContent);
    rooms.push(newDiv.id);

    // add the newly created element and its content into the DOMs
    var parent;
    var div1;
    if (data.category.toLowerCase() == "sports") {
        parent = "sports"
        div1 = "sport4"
    }
    else if (data.category == "events") {
        parent = "events"
        div1 = "events4"
    }
    else if (data.category == "conferences") {
        parent = "conferences"
        div1 = "conferences4"
    }
    else {
        parent = "new"
        div1 = "div1"
    };

    const currentDiv = document.getElementById(div1);
    document.getElementById(parent).insertBefore(newDiv, currentDiv);

    newDiv.addEventListener('click', (e) => {
        console.log("Clicked");

        window.name = prompt("Please enter your name:", "");

        heading.style.display = "none";
        sports.style.display = "none";
        events.style.display = "none";
        conferences.style.display = "none";
        newActivities.style.display = "none";
        create.style.display = "none";
        room.style.display = "block";

        //emit a message requesting to join the room
        socket.emit('joinroom', {
            room: e.target.id
        })

        console.log({ rooms: e.target.id });
    });
})

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}
