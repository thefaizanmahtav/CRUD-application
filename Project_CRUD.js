let pepoleData = [];
let isEditMode = false
let Index = 0;

// Generating UID..
function generatePassword(length = 10) {
   const charset = "0123456789";
   let UniID = '';
   for (let i = 0; i < length; i++) {
      UniID += charset.charAt(Math.floor(Math.random() * charset.length));
   }
   return +UniID;
}

document.getElementById("submitData").addEventListener("click", onSubmit)


function onSubmit($event) {
   event.preventDefault();

   if (Validation()) throw new Error("inValid Form : Please Fill All the details correctly!");

   pepoleData = JSON.parse(localStorage.getItem("Data")) ? JSON.parse(localStorage.getItem("Data")) : [];

   let id = generatePassword()
   let name = document.getElementById("fullName").value
   let email = document.getElementById("email").value
   let dateofbirth = document.getElementById("dateofbirth").value
   let phone = document.getElementById("phonenumber").value
   let gender = document.querySelector('input[name="inlineRadioOptions"]:checked').value
   let state = document.getElementById("state").value
   let district = document.getElementById("district").value
   let joining = document.getElementById("joiningDate").value
   let intern = document.querySelector('input[name="InternType"]:checked').value

   if (isEditMode) {
      pepoleData[Index] = {
         id: pepoleData[Index].id,
         name: name,
         email: email,
         dateofbirth: dateofbirth,
         phone: phone,
         gender: gender,
         state: state,
         district: district,
         joining: joining,
         intern: intern
      }
   } else {
      pepoleData.push({
         id: id,
         name: name,
         email: email,
         dateofbirth: dateofbirth,
         phone: phone,
         gender: gender,
         state: state,
         district: district,
         joining: joining,
         intern: intern
      })
   }

   localStorage.setItem('Data', JSON.stringify(pepoleData))
   document.getElementById("submitData").innerHTML = "Submit"
   showData()
   document.getElementById("form-reset").reset();
}

// validation

function Validation() {
   let name = document.getElementById("fullName").value
   let email = document.getElementById("email").value
   let dateofbirth = document.getElementById("dateofbirth").value
   let phone = document.getElementById("phonenumber").value
   let gender = !document.querySelector('input[name="inlineRadioOptions"]:checked')
   let state = document.getElementById("state").value
   let district = document.getElementById("district").value
   let joining = document.getElementById("joiningDate").value
   let intern = !document.querySelector('input[name="InternType"]:checked')

   if (!name) {
      document.getElementById("desc").innerHTML = "Please Enter Your Name!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   } else if (!email) {
      document.getElementById("desc").innerHTML = "Please Enter Your Email!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   } else if (!email.includes('@')) {
      document.getElementById("desc").innerHTML = "inValid Email!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   } else if (!dateofbirth) {
      document.getElementById("desc").innerHTML = "Please Enter Date Of Birth!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   } else if (!phone) {
      document.getElementById("desc").innerHTML = "Please Enter Phone Number!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   } else if (gender) {
      document.getElementById("desc").innerHTML = "Please Chose Gender!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   } else if (!state) {
      document.getElementById("desc").innerHTML = "Please Select State!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   } else if (!district) {
      document.getElementById("desc").innerHTML = "Please Select District!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   } else if (!joining) {
      document.getElementById("desc").innerHTML = "Please Enter Joining Date!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   } else if (intern) {
      document.getElementById("desc").innerHTML = "Please Select Intern Type!"
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      return true
   }
   return false
}

// Gettin LocalStorageData

function showData() {
   let lcData = JSON.parse(localStorage.getItem("Data"))

   let htmll = "";
   for (const j in lcData) {
      htmll += ` <tr>
      <th scope="row">${lcData[j].id}</th>
                   <td>${lcData[j].name}</td>
                   <td>${lcData[j].email}</td>
                   <td>${lcData[j].dateofbirth}</td>
                   <td>${lcData[j].phone}</td>
                   <td>${lcData[j].gender}</td>
                   <td>${lcData[j].state}</td>
                   <td>${lcData[j].district}</td>
                   <td>${lcData[j].joining}</td>
                   <td>${lcData[j].intern}</td>
    <td>
    <i id="edit-bx" class='bx bx-edit-alt me-2' onclick="updateEmploy(${j})"></i>
    <i id="delete-bx" class='bx bxs-trash-alt' onclick="deleteEmploy(${j})"></i>
    </td>
        </tr>
    `
   }
   document.getElementById("table1").innerHTML = htmll
}
showData()

function deleteEmploy(index) {
   let lcData = JSON.parse(localStorage.getItem("Data"))
   lcData.splice(index, 1)
   localStorage.setItem('Data', JSON.stringify(lcData))
   showData()
}


function updateEmploy(index) {

   let lcData = JSON.parse(localStorage.getItem("Data"))

   isEditMode = true
   Index = index

   document.getElementById("submitData").innerHTML = "Update"


   document.getElementById("fullName").value = lcData[index].name
   document.getElementById("email").value = lcData[index].email
   document.getElementById("dateofbirth").value = lcData[index].dateofbirth
   document.getElementById("phonenumber").value = lcData[index].phone
   document.getElementById("state").value = lcData[index].state
   document.getElementById("district").value = lcData[index].district
   document.getElementById("joiningDate").value = lcData[index].joining

   for (let i = 0; i < document.getElementsByName("inlineRadioOptions").length; i++) {
      if (document.getElementsByName("inlineRadioOptions")[i].value === lcData[index].gender) {
         document.getElementsByName("inlineRadioOptions")[i].checked = true
      }
   }

   for (let i = 0; i < document.getElementsByName("InternType").length; i++) {
      if (document.getElementsByName("InternType")[i].value === lcData[index].intern) {
         document.getElementsByName("InternType")[i].checked = true
      }
   }

   showData()
}