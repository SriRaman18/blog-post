const form = document.querySelector("#blogForm");
const anchorLink = document.querySelectorAll(".a-link");
const sections = document.querySelectorAll(".section");
const title = document.querySelector("#title");
const language = document.querySelector("#lang");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const postDiv = document.querySelector(".postDiv");
const details = document.querySelector(".view");

const display = document.querySelector(".display");

const time = document.querySelector(".time");
// creating empty array
let listArray = [];
// form validation
function formValidation(e) {
  e.preventDefault();
  ValidateEmail();
}
// date and time
function timeOut() {
  const currentTime = new Date().toLocaleTimeString();

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  time.textContent = `posted at : ${day}-${month}-${year},${currentTime}`;
  // settime out functions
  setTimeout(() => {
    time.textContent = "";
  }, 2000);
}

function storeProductsData() {
  // form values
  let Title = title.value;
  let Language = language.value;
  let Name = name.value;
  let Email = email.value;

  const inputData = {
    Title: Title,
    Language: Language,
    Name: Name,
    Email: Email,
  };
  listArray.push(inputData);
  // local storage set item
  localStorage.setItem("bookmarks", JSON.stringify(listArray));

  timeOut();
}

function fetchData() {
  // local storage get item
  if (localStorage.getItem("bookmarks")) {
    listArray = JSON.parse(localStorage.getItem("bookmarks"));
  }
}
fetchData();

function populateButtonsSection() {
  postDiv.innerHTML = "";
  listArray.forEach((prod, idx) => {
    populateButtons(prod, idx);
  });
}
// blog display page
populateButtonsSection();

function populateButtons(prod, idx) {
  const btn = document.createElement("button");

  btn.classList.add("buttons-btn");

  btn.textContent = `Blog Post ${idx + 1}`;
  btn.setAttribute("onclick", `populateDetails("${idx}")`);

  postDiv.appendChild(btn);
}
// view page
function populateDetails(idx) {
  details.innerHTML = "";

  const found = listArray[idx];

  const detail = document.createElement("div");

  detail.classList.add("detail");

  detail.innerHTML = `
 <small> 🎉🎉🎉 </small>
  <h2> 1)Blog Title : ${found.Title}</h2>
  <h2> 2)Language: ${found.Language}</h2>
  <h2> 3)Author Name: ${found.Name}</h2>
  <h2> 4)Email Id: ${found.Email}</h2>

  `;

  details.appendChild(detail);

  moveToDetail();
}

function moveToDetail() {
  removeActivePage();
  sections[2].classList.add("active-page");
}

anchorLink.forEach((link, index) => {
  link.addEventListener("click", () => {
    removeActivePage();

    sections[index].classList.add("active-page");
  });
});

function removeActivePage() {
  sections.forEach((section) => {
    section.classList.remove("active-page");
  });
}

// submit event
form.addEventListener("submit", formValidation);
// Email verification
function ValidateEmail() {
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.value.match(mailFormat)) {
    storeProductsData();
    form.reset();
  } else {
    alert("You have entered an invalid email address!");
  }
}
