const tableNode = document.querySelector('.tbody');
const usersTableCard = $('#users_table_card');
const newUserCard = $('#new_user_card');
const cardDiv = $('.card');


//Create Role class
class Role {
    constructor(id, role) {
        this.id = id;
        this.role = role;
    }
}



$(document).ready(function () {

    window.addEventListener('load', getDatabase);

});

function getDatabase() {
    fetch("http://localhost:8080/api/")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let temp = "";
            let roleString = "";
            data.forEach((elem) => {
                temp += "<tr class='table'>";
                temp += "<th id='id'>" + elem.id + "</th>";
                temp += "<td id='username'>" + elem.username + "</td>";
                temp += "<td id='lastName'>" + elem.lastName + "</td>";
                temp += "<td id='age'>" + elem.age + "</td>";
                temp += "<td id='email'>" + elem.email + "</td>";
                elem.roles.forEach((role) => {
                    roleString += role.name + " ";
                })
                temp += "<td>" + roleString + "</td>";
                roleString = "";
                temp += "<td><button type='button' data-toggle='modal' " +
                    "class='btn btn-primary btn-sm text-white btn-info' data-target='#editModal' onclick='showEditModal(" + elem.id + ")'>Edit</button></td>";
                temp += "<td><button type='submit' class='btn btn-primary btn-sm btn-danger' onclick='delUser(" + elem.id + ")'>Delete</button></td>";
                temp += "</tr>";
            })
            tableNode.innerHTML = "";
            tableNode.innerHTML += temp
            temp = "";
        })
        .catch((err) => {
            console.error(err);
        });
}


// DELETE-request
async function delUser(id) {
    try {
        const url = "http://localhost:8080/api/" + id;
        const response = await fetch(url, {
            method: 'DELETE'
        }).then(resp => console.log(resp)).then(getDatabase);
    } catch (e) {
        console.error(e);
    }
}

//POST-request with new user
async function newUser() {
    const url = "http://localhost:8080/api";

    const form = document.querySelector('.form-new-user');

    const formData = new FormData(form);
    let currentRoles = [];
    const existingRoles = Array.from(formData.getAll('roles'))

    for (let i = 0; i < existingRoles.length; i++) {
        const id = existingRoles[i];
        const role = id == 1 ? `ROLE_ADMIN` : `ROLE_USER`;
        currentRoles.push(new Role(id, role));
    }

    let data = {
        username: formData.get('username'),
        lastName: formData.get('lastName'),
        age: formData.get('age'),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: currentRoles
    }
    console.log(data)
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json()).then(data => {
            form.reset();
        })
    } catch (err) {
        alert(err.name);
        console.log(err)
    }

}

document.querySelector("#addNewUserBtn").addEventListener('click', newUser);
usersTableCard.click(() => {
    if (!usersTableCard.attr('class').includes('active')) {
        getDatabase();
        usersTableCard.attr('class', "nav-link active");
        newUserCard.attr('class', "nav-link text-primary");

        //change body into div Card
        document.querySelector('.secondCard').style.display = "none";
        document.querySelector('.firstCard').style.display = "block";
    }
})
newUserCard.click(() => {
    if (!newUserCard.attr('class').includes("active")) {
        newUserCard.attr('class', "nav-link active");
        usersTableCard.attr('class', "nav-link text-primary");

        //change body into div Card
        document.querySelector('.secondCard').style.display = "block";
        document.querySelector('.firstCard').style.display = "none";
    }
});

//function for show modal
function showEditModal(id) {
    let body = "";
    let url = "http://localhost:8080/api/" + id;
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log("Got this user for editing " + data);
            body += `
            <form className="text-center" id="formEditUser">
                    <div class="form-group">
                    <label class="font-weight-bold" for="id">Id:</label>
                    <input class="form-control" type="text" id="id" name="id" value="${data.id}" readonly>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="name">Name:</label>
                    <input class="form-control" type="text" id="name" name="username" value="${data.username}">
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="lastName">Last name:</label>
                    <input class="form-control" type="text" value="${data.lastName}" id="lastName" name="lastName"
                           placeholder="familia">
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="password">Password:</label>
                    <input class="form-control" type="password" value="${data.password}" name="password" id="password" readonly>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="age">Age:</label>
                    <input class="form-control" type="number" value="${data.age}" name="age" id="age">
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="email">Email:</label>
                    <input class="form-control" type="text" value="${data.email}" name="email" id="email"
                           placeholder="email">
                </div>
                <div class="form-group" style="display: flex; flex-direction: column">
                    <label class="font-weight-bold" for="roles">Role:</label>
                      <select multiple class="mb-3 custom-select" id="roles" name="roles">
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                      </select>
                </div>
            </form>`
            document.querySelector('.insertModal').innerHTML = body;
        })
        .catch((err) => {
            console.log(err);
        })
}


// action of editing user
async function editInfoUser() {
    let currentRoles = [];
    const formData = await new FormData(await document.querySelector("#formEditUser"));
    const existingRoles = Array.from(formData.getAll('roles'))

    for (let i = 0; i < existingRoles.length; i++) {
        const id = existingRoles[i];
        const role = id == 1 ? `ROLE_ADMIN` : `ROLE_USER`;
        currentRoles.push(new Role(id, role));
    }
    let data = {
        id: formData.get('id'),
        username: formData.get('username'),
        lastName: formData.get('lastName'),
        age: formData.get('age'),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: currentRoles
    }
    console.log(data);

    try {
        const response = await fetch("http://localhost:8080/api/edit", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json()).then(data => {
            console.log("Edit user with id: " + formData.get('id'))
            $('#editModal').modal('hide');
            getDatabase();
        })
    } catch (err) {
        console.log(err);
    }
}

//click to edit user
document.querySelector('#editInfo').addEventListener('click', editInfoUser);



