const addBtn = document.querySelector("#add-btn");
const model = document.querySelector(".model");
const closeBtn = document.querySelector(".close-icon");
const registerBtn = document.querySelector("#register-btn");
const updateBtn = document.querySelector("#update");

let userData = [];
let profile_pic = document.querySelector("#profile-pic");
let uploadPic = document.querySelector("#upload-pic");
const id = document.querySelector("#id");
const f_name = document.querySelector("#first-name");
const l_name = document.querySelector("#last-name");
const email = document.querySelector("#email");
const office = document.querySelector("#office-code");
const job_title = document.querySelector("#job-title");
const registerForm = document.querySelector("#register-form");
let imgUrl;

addBtn.addEventListener("click", () => {
  registerBtn.disabled = false;
  updateBtn.disabled = true;
  registerForm.reset("");
  imgUrl=undefined;
  profile_pic.src = "img/images.jpg";
  model.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  model.classList.remove("active");
});

// start register coding

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userData.push({
    id: id.value,
    f_name: f_name.value,
    l_name: l_name.value,
    email: email.value,
    office: office.value,
    job_title: job_title.value,
    profilePic: imgUrl == undefined ? "img/images.jpg" : imgUrl
  });

  const userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  getDataFromLocal();
  // sweet alert
  Swal.fire({
    // position: 'top-end',
    icon: "success",
    title: "Registration Success!",
    showConfirmButton: false,
    timer: 1500,
  });
  registerForm.reset("");
  closeBtn.click();
});
if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}
// console.log(userData)

// start returning data on page from localstorage

let tableData = document.querySelector(".table-data");

const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
        <tr index='${index}'>
        <td>${index + 1}</td>
        <td><img src="${data.profilePic}" width="40px" height="40px"</td>
        <td>${data.id}</td>
        <td>${data.f_name}</td>
        <td>${data.l_name}</td>
        <td>${data.email}</td>
        <td>${data.office}</td>
        <td>${data.job_title}</td>
        
        <td>
            <button class="update-btn" ><i class="fa fa-eye"></i></button>
            <button class="del-btn" ><i class="fa fa-trash"></i></button>
        </td>
    </tr>
    `;
  });

  // start Delete coding
  let allDelBtn = document.querySelectorAll(".del-btn");
  for (let i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let id = tr.getAttribute("index");
      // alert(id);
      // sweetAlert code

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          //    Swal.fire(
          //     'Deleted!',
          //     'Your file has been deleted.',
          //     'success'
          //   )
        }
      });
    };
  }

  // start update coding
  let allEdit = document.querySelectorAll(".update-btn");
  for (let i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let td = tr.getElementsByTagName("td");

      let index = tr.getAttribute("index");
      let imgTag = td[1].getElementsByTagName("img");
      let profilePic = imgTag[0].src;
      let nId = td[2].innerHTML;
      let fname = td[3].innerHTML;
      let lname = td[4].innerHTML;
      let nEmail = td[5].innerHTML;
      let officeCode = td[6].innerHTML;
      let jobTitle = td[7].innerHTML;
      // alert(jobTitle);
      addBtn.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      imgUrl=profilePic;
      id.value = nId;
      f_name.value = fname;
      l_name.value = lname;
      email.value = nEmail;
      office.value = officeCode;
      job_title.value = jobTitle;
      profile_pic.src = profilePic;
      updateBtn.onclick = function (e) {
        e.preventDefault();
        // alert();
        userData[index] = {
          id: id.value,
          f_name: f_name.value,
          l_name: l_name.value,
          email: email.value,
          office: office.value,
          job_title: job_title.value,
          profilePic: uploadPic.value == "" ? profilePic : imgUrl,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        getDataFromLocal();

        closeBtn.click();
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "Update Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      };
    };
  }
};

getDataFromLocal();

// image processing

uploadPic.addEventListener("change", () => {
  if (uploadPic.files[0].size < 5000000) {
    let fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profile_pic.src = imgUrl;
      // console.log(imgUrl)
    };
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("File Size Should Be Less Than 5MB");
  }
});

// start search coding

let searchEl = document.querySelector("#empId");
const searchFun = () => {
  let tr = tableData.querySelectorAll("tr");
  // console.log(tr)
  let filer = searchEl.value.toLowerCase();
  for (let i = 0; i < tr.length; i++) {
    let id = tr[i].getElementsByTagName("td")[2].innerHTML;
    let fName = tr[i].getElementsByTagName("td")[3].innerHTML;
    let lName = tr[i].getElementsByTagName("td")[4].innerHTML;
    let email = tr[i].getElementsByTagName("td")[5].innerHTML;
    let office = tr[i].getElementsByTagName("td")[6].innerHTML;
    let jTitle = tr[i].getElementsByTagName("td")[7].innerHTML;

    if (id.toLowerCase().indexOf(filer) > -1) {
      tr[i].style.display = "";
    } else if (fName.toLowerCase().indexOf(filer) > -1) {
      tr[i].style.display = "";
    } else if (lName.toLowerCase().indexOf(filer) > -1) {
      tr[i].style.display = "";
    } else if (email.toLowerCase().indexOf(filer) > -1) {
      tr[i].style.display = "";
    } else if (office.toLowerCase().indexOf(filer) > -1) {
      tr[i].style.display = "";
    } else if (jTitle.toLowerCase().indexOf(filer) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
};

searchEl.addEventListener("input", searchFun);

// delete all data

const delAll = document.querySelector(".del-all");

delAll.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("userData");
      window.location = location.href;
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
});
