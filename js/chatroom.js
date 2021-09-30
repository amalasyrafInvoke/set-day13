const firebaseConfig = {
  apiKey: 'AIzaSyAY6v0SkfYoGnZlTrrVA6bnLV_-JzTKMIg',
  authDomain: 'chat-room-d8763.firebaseapp.com',
  databaseURL:
    'https://chat-room-d8763-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-room-d8763',
  storageBucket: 'chat-room-d8763.appspot.com',
  messagingSenderId: '120613339957',
  appId: '1:120613339957:web:10224b2e2ae0d97f63c27c',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

var messageInput = document.getElementById('message-input');
var chatroom = document.getElementById('chat-room');
var appHolder = document.getElementById('app-holder');
var roomList = document.getElementById('roomlist-list');

var chatroomJoined = null;
var roomCount = 0;

// retrieve data from firebase when loading the page
function getMessage(id) {
db.ref('chatlist')
  .child(id)
  .child('message')
  .on('child_added', (snapshot) => {
    var nameVal = snapshot.val().name;
    var msgVal = snapshot.val().msg;
    var dateVal = snapshot.val().date;
    var timeVal = snapshot.val().time;

    //create element when firebase got new child
    var createDiv = document.createElement('div');
    createDiv.classList.add('chat-box');

    if (nameVal === localStorage.getItem('username')) {
      createDiv.classList.add('self');
    }

    var addnameText = document.createElement('h3');
    addnameText.innerHTML = nameVal;

    var addMsgText = document.createElement('p');
    addMsgText.innerHTML = msgVal;
    addMsgText.style.textAlign = 'left';

    var timeDiv = document.createElement('div');
    timeDiv.classList.add('time-holder');

    var addDateText = document.createElement('p');
    addDateText.innerHTML = dateVal;
    addDateText.classList.add('date-text');

    var addTimeText = document.createElement('p');
    addTimeText.innerHTML = timeVal;
    addTimeText.classList.add('time-text');

    chatroom.append(createDiv);
    createDiv.append(addnameText);
    createDiv.append(addMsgText);
    createDiv.append(timeDiv);
    timeDiv.append(addTimeText);
    timeDiv.append(addDateText);

    chatroom.scrollTo(0, chatroom.scrollHeight);
  });
}

db.ref('chatlist').on('child_added', (snapshot) => {
  // console.log(snapshot.val().name);
  // console.log(snapshot.val());
  // console.log(snapshot.key);

  roomCount++;

  var roomName = snapshot.val().name;
  var dateCreated = snapshot.val().dateCreated;

  //create element of roomlist
  var createDiv = document.createElement('div');
  createDiv.classList.add('roomList');
  createDiv.setAttribute('id', snapshot.key);
  createDiv.onclick = settingUpRoom;

  var addRoomNameText = document.createElement('h3');
  addRoomNameText.innerHTML = roomName;

  var addDateCreatedText = document.createElement('p');
  addDateCreatedText.innerHTML = dateCreated;

  roomList.appendChild(createDiv);
  createDiv.appendChild(addRoomNameText);
  createDiv.appendChild(addDateCreatedText);
});

function createNewRoom() {
  db.ref('chatlist').push({
    name: `Chat Room ${roomCount + 1}`,
    dateCreated: new Date().toISOString().substr(0, 10).replaceAll('-', '/'),
  });
}
function sendMessage() {
  var nameValue = localStorage.getItem('username');

  var date = new Date();
  var mydate = date.toISOString().substr(0, 10).replaceAll('-', '/');
  var mytime = date.toLocaleTimeString('en-US', { hour12: true });

  if (messageInput.value === '') {
    window.alert('Failed. Empty Message');
    return;
  }

  //push the data and store in DB
  db.ref('chatlist')
    .child(localStorage.getItem('roomID'))
    .child('message')
    .push({
      name: nameValue,
      msg: messageInput.value,
      date: mydate,
      time: mytime,
    });
}

function enterRoomList() {
  appHolder.style.transform = 'translateX(-100vw)';
  var usernameInput = document.getElementById('username-input');

  window.localStorage.setItem('username', usernameInput.value);
}

function moveToLogin() {
  appHolder.style.transform = 'translateX(0vw)';
}

function backToRoomList() {
  appHolder.style.transform = 'translateX(-100vw)';

  chatroom.textContent = '';
  document.getElementById('your-name-input').textContent = '';
}

function settingUpRoom() {
  localStorage.setItem('roomID', this.id);

  var chatRoomName = this.childNodes[0].innerHTML;
  localStorage.setItem('roomName', chatRoomName);

  document.getElementById('theRoom').querySelector('h1').innerHTML =
    this.childNodes[0].innerHTML;

  var lastMessage = document.createElement('h6');
  lastMessage.innerHTML = 'END MESSAGE HISTORY';

  chatroom.appendChild(lastMessage);

  getMessage(this.id);

  appHolder.style.transform = 'translateX(-200vw)';

  var yourName = document.getElementById('your-name-input');

  var addText = document.createElement('h3');
  addText.innerHTML = 'You Are';

  var addName = document.createElement('p');
  addName.innerHTML = localStorage.getItem('username');

  yourName.appendChild(addText);
  yourName.appendChild(addName);
}
