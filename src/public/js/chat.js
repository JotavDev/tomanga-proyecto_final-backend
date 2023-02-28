const socket = io();
const formEmail = document.querySelector("#formEmail");
const formMessage = document.querySelector("#formMessage");
const inputEmail = document.querySelector("#userEmail");
const inputMessage = document.querySelector("#userMessage");
const errorMessage = document.querySelector(".validate");
let email = "";
const joinScreen = document.querySelector(".joinScreen");
const chatScreen = document.querySelector(".chatScreen");
const sendMessage = document.querySelector("#sendMessage")
const headerImage = document.querySelector(".welcomeImage")
const footer = document.querySelector(".iconsFooterGroup")

const emailRegex =
  /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

formEmail.addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = inputEmail.value.trim();
  if(input.length <= 0) {
    errorMessage.style.display = "flex";
    errorMessage.style.color = "rgb(255, 103, 43)";
    inputEmail.style.borderBottomColor = "rgb(255, 103, 43)";
    errorMessage.innerHTML = `Ingresa tu email`;
  } else if(!emailRegex.test(input)) {
    errorMessage.style.display = "flex";
    errorMessage.style.color = "rgb(255, 103, 43)";
    inputEmail.style.borderBottomColor = "rgb(255, 103, 43)";
    errorMessage.innerHTML = `Email inválido`;
  } else {
    errorMessage.style.display = "none";
    inputEmail.style.borderBottomColor = "rgb(141, 238, 15)";
    email = inputEmail.value;
    joinScreen.style.display = "none";
    headerImage.style.display = "none";
    footer.style.display = "none";
    chatScreen.style.display = "flex";
  }
});

sendMessage.addEventListener("click", async (event) => {
  event.preventDefault();
  const message = formMessage.value;

  if (message === undefined) {
    event.preventDefault();
  }
  const dataMessage = {
    userEmail: email,
    userMessage: inputMessage.value,
  };

  const url = "http://localhost:8080/api/messages";
  try{
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataMessage)
    });
    const data = await response.json();
  } catch(error){
    return error
  }
  socket.emit("message", dataMessage);
  inputMessage.value = "";
});

formMessage.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = formMessage.value;

  if (message === undefined) {
    event.preventDefault();
  }
  const dataMessage = {
    userEmail: email,
    userMessage: inputMessage.value,
  };

  const url = "http://localhost:8080/api/messages";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataMessage)
    });
    const data = await response.json();
  } catch(error){
    return error
  }
  socket.emit("message", data);
  inputMessage.value = "";
});

inputMessage.addEventListener("keydown", async (event) => {
  const message = formMessage.value;

  if (event.key == "Enter" && message === undefined) {
    event.preventDefault();
  }
  const dataMessage = {
    userEmail: email,
    userMessage: inputMessage.value,
  };

  const url = "http://localhost:8080/api/messages";
  if (event.key == "Enter") {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMessage),
      });
      const data = await response.json();
    } catch(error){
      return error
    }
    socket.emit("message", dataMessage);
    inputMessage.value = "";
  }
});

const chatBox = document.querySelector(".chatBox");

const createNewMessage = (message) => {
  const verify = email == message.user;
  const style = verify ? "own" : "other";

  chatBox.innerHTML += `<div class="message ${style}">
        <p>${message.message}</p>
    </div>`;
};

socket.on("allMessages", async (data) => {
  chatBox.innerHTML = "";
  await data.forEach((message) => {
    return createNewMessage(message);
  });
});