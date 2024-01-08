// Initialize empty array for storing people
let people = [];





// Function to add a new person
function addPerson(name, age, bloodGroup,hight, weidht) {
  let person = {
    name: name,
    age: age,
    bloodGroup: bloodGroup,
    hight: hight,
    weidht: weidht
  };

  people.push(person);
  renderTable();
}

// Function to render the table
function renderTable() {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  people.forEach(function(person, index) {
    let row = document.createElement("tr");

    Object.values(person).forEach(function(value) {
      let cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    let actionsCell = document.createElement("td");

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "btn btn-primary btn-sm me-2";
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#editModal");
    editButton.addEventListener("click", function() {
      openEditModal(index);
    });
    actionsCell.appendChild(editButton);

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "btn btn-danger btn-sm";
    removeButton.addEventListener("click", function() {
      removePerson(index);
    });
    actionsCell.appendChild(removeButton);

    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}



// Function to edit a person
function editPerson(index, newName, newAge, newBloodGroup, newHight,NewWeidht ) {
  let person = people[index];
  person.name = newName;
  person.age = newAge;
  person.bloodGroup = newBloodGroup;
  person.hight=newHight;
  person.weidht=NewWeidht
  renderTable();
}

// Function to remove a person
function removePerson(index) {
  people.splice(index, 1);
  renderTable();
}

// Function to open the edit modal with pre-filled values
function openEditModal(index) {
  let person = people[index];
  let editForm = document.getElementById("editForm");
  let editIndexInput = document.getElementById("editIndex");
  let editNameInput = document.getElementById("editName");
  let editAgeInput = document.getElementById("editAge");
  let editBloodGroupInput = document.getElementById("editBloodGroup");
  let editHightInput= document.getElementById("editHight");
  let editweidht= document.getElementById("editW")

  editIndexInput.value = index;
  editNameInput.value = person.name;
  editAgeInput.value = person.age;
  editBloodGroupInput.value = person.bloodGroup;
  editHightInput.value=person.hight;
  editweidht.value=person.weidht;

  editForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let newName = editNameInput.value;
    let newAge = parseInt(editAgeInput.value);
    let newBloodGroup = editBloodGroupInput.value;
    let newHight= editHightInput.value;
    let newWeidht=editweidht.value;

    editPerson(index, newName, newAge, newBloodGroup,newHight, newWeidht );

    // Close the modal
    let editModal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
    editModal.hide();
  });
}

// Submit event handler for the form
let personForm = document.getElementById("personForm");
personForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let nameInput = document.getElementById("name");
  let ageInput = document.getElementById("age");
  let bloodGroupInput = document.getElementById("bloodGroup");
  let hightInput= document.getElementById('hig');
  let weidhtInput=document.getElementById('wei')

  let name = nameInput.value;
  let age = parseInt(ageInput.value);
  let bloodGroup = bloodGroupInput.value;
  let  hight= hightInput.value;
  let weidht=weidhtInput.value;
 // Validate name (maximum 20 characters, first letter capitalized)
 let nameRegex = /^[A-Z][a-zA-Z\s]{1,19}$/;
 if (!name.match(nameRegex)) {
   alert("Name should start with a capital letter and contain only alphabets, spaces, and be 20 characters or less.");
   return;
 }





 // Validate blood group (A+, B+, O+, A-, B-, O-, AB+, AB-)
 let bloodGroupRegex = /^(A|B|O|AB)[+-]$/;
 if (!bloodGroup.match(bloodGroupRegex)) {
   alert("Blood group should be in the format A+, B+, O+, A-, B-, O-, AB+, AB-.");
   return;
 }


  addPerson(name, age, bloodGroup,hight,weidht);

  nameInput.value = "";
  ageInput.value = "";
  bloodGroupInput.value = "";
  hightInput.value="";
  weidhtInput.value="";
});

// Initial rendering of the table
renderTable();