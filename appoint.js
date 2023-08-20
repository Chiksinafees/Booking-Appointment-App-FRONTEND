const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#number");
const inputEmail = document.querySelector("#email");
const appointForm = document.querySelector("#appointForm");

appointForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const obj = {
    name: inputName.value,
    number: inputNumber.value,
    email: inputEmail.value,
  };
  
  await axios
    .post("http://localhost:3000/user/insert", obj)
    .then((response) => {
      showUserOnScreen(response.data.newUserDetail);
      console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>Something is Wrong!!</h4>";
      console.log(err);
    });
});

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/user/getAll")
    .then((response) => {
      console.log(response.data.allUser);
      for (let i = 0; i < response.data.allUser.length; i++) {
        showUserOnScreen(response.data.allUser[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showUserOnScreen(user) {
  document.getElementById("name").value = "";
  document.getElementById("number").value = "";
  document.getElementById("email").value = "";

  if (localStorage.getItem(user.email) !== null) {
    console.log(user.email);
    removeUserFromScreen(user.email);
  }

  const parentNode = document.getElementById("option");
  const childHTML = `<li id= ${user.id}>${user.name} - ${user.number}- ${user.email} 
    <button onclick= deleteUser("${user.id}")>delete</button>
    <button onclick="editUser('${user.id}', '${user.name}', '${user.number}', '${user.email}')">edit</button></li>`;
  parentNode.innerHTML += childHTML;
}

function deleteUser(userId) {
  axios
    .delete(`http://localhost:3000/user/getAll/${userId}`)
    .then((response) => {
      removeUserFromScreen(userId);
    })
    .catch((err) => console.log(err));
}

function editUser(userId, namee, numberr, emaill) {
  document.getElementById("name").value = namee;
  document.getElementById("number").value = numberr;
  document.getElementById("email").value = emaill;
  deleteUser(userId);
}

function removeUserFromScreen(userId) {
  const parentNodee = document.getElementById("option");
  const childNodeToBeDelete = document.getElementById(userId);
  if (childNodeToBeDelete) {
    parentNodee.removeChild(childNodeToBeDelete);
  }
}
