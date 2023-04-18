/** @format */

const create = document.querySelector(".create");
const update = document.querySelector(".update");
console.log(create);
create.onclick = function () {
    addNew();
};

let formGroup = document.querySelector("#form");
function validatorInput() {
    if (formGroup) {
        let inputElement = formGroup.querySelectorAll(".form-input");
        console.log(inputElement);

        for (let i = 0; i < inputElement.length; i++) {
            if (inputElement[i].value === "") {
                inputElement[i].parentElement.querySelector(
                    ".errorMessage"
                ).innerText = `co loi`;
            } else {
                inputElement[i].parentElement.querySelector(".errorMessage").innerText =
                    "";
            }
        }
    }
}


function defaultInput() {
    const name = formGroup.querySelector("#name").value = "";
    const address = formGroup.querySelector("#address").value = "";


}

function addNew() {
    validatorInput();
    let errorElement = formGroup.querySelectorAll(".errorMessage");
    for (let i = 0; i < errorElement.length; i++) {
        if (errorElement[i].innerText === "") {
            console.log("ok");
        } else {
            console.log("error");
        }
    }

    const name = formGroup.querySelector("#name").value;
    const address = formGroup.querySelector("#address").value;

    const listStudent = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : [];

    listStudent.push({
        name: name,
        address: address,
    });
    localStorage.setItem("data", JSON.stringify(listStudent));
    renderData()
    defaultInput()
}

function renderData() {
    const listStudent = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : [];
    let student = `
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th>ACTION</th>
            </tr>
        
        `;

    listStudent.map((value, index) => {
        student += `
            <tr key=${index}>
                <td>${index + 1}</td>
                <td>${value.name}</td>
                <td>${value.address}</td>
                <td style=width ="400px">
                    <button onclick = 'editStudent(${index})'>Edit</button>
                    <button onclick= 'handleDeleteValue(${index})'>Delete</button>
                
                </td>
            </tr> 
        `

    })

    const tableContent = document.getElementById('tableContent')
    tableContent.innerHTML = student
}

function editStudent(index) {
    const listStudent = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : [];

    let name = formGroup.querySelector('#name')
    let address = formGroup.querySelector('#address')
    const indexStore = document.querySelector('.index').value = index

    name.value = listStudent[index].name
    address.value = listStudent[index].address

    create.style.display = 'none'
    update.style.display = 'inline-block'
}

update.onclick = function () {
    const listStudent = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : [];
    const indexStore = document.querySelector('.index').value


    let name = formGroup.querySelector('#name')
    let address = formGroup.querySelector('#address')
    listStudent[indexStore] = {
        name: name.value,
        address: address.value
    }

    localStorage.setItem("data", JSON.stringify(listStudent))
    renderData()
    create.style.display = 'inline-block'
    update.style.display = 'none'
    defaultInput()


}

function handleDeleteValue(index) {
    const listStudent = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : [];

    listStudent.splice(index)
    localStorage.setItem('data', JSON.stringify(listStudent))
    renderData()
}
