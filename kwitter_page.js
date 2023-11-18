var firebaseConfig = {
    apiKey: "AIzaSyBg58APbVPZWEkay0gMM0hlUVkik4nRcIY",
    authDomain: "lets-chat-web-app-23c08.firebaseapp.com",
    databaseURL: "https://lets-chat-web-app-23c08-default-rtdb.firebaseio.com",
    projectId: "lets-chat-web-app-23c08",
    storageBucket: "lets-chat-web-app-23c08.appspot.com",
    messagingSenderId: "323869577933",
    appId: "1:323869577933:web:4d43b0e233f79ac69d8f84"
  };
  
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username")
room_name = localStorage.getItem("room_name")

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id)
                        console.log(message_data)
                        name1 = message_data["name"]
                        message = message_data["message"]
                        like = message_data["like"]
                        name_with_tag = "<h4>" + name1 + "<img src ='tick.png' class='user_tick'> </h4>"
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"
                        like_with_tag = "<button class='btn btn-warning' id='" + firebase_message_id + "' onclick='updateLike(this.id)' value='" + like + "'>"
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+ like + "</span> </button>"
                        row = name_with_tag + message_with_tag + like_with_tag + span_with_tag 
                        document.getElementById("output").innerHTML += row 
                  }
            });
      });
}
getData();

function send()
{
      msg = document.getElementById("msg").value ; 
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      })
      document.getElementById("msg").value = ""
}

function logout() {
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location = "index.html";
}

function updateLike(message_id) {
     likes = document.getElementById(message_id).value
     updated_like = Number(likes) + 1 
     firebase.database().ref(room_name).child(message_id).update({
      like: updated_like
     })
}
