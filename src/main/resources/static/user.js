const url = "http://localhost:8080/user/api";

fetch(url).then(response => response.json())
.then(data => {
    let roles = "";
    data.roles.forEach(role => {
        roles += role.name + " ";
    })

    let body = `
        <tr class="table-active">
        <th scope="row">${data.id}</th>
        <td>${data.username}</td>
        <td>${data.lastName}</td>
        <td>${data.age}</td>
        <td>${data.email}</td>
        <td>${roles}</td>
        </tr>
    `
    document.querySelector('#table_data').innerHTML = body;
})