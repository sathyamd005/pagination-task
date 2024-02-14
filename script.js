// creating heading  for displaying-------------
let textContainer = document.createElement("div");
textContainer.classList.add("textContainer");
let h1 = document.createElement("h1");
h1.id = "title";
h1.textContent = "DOM Task";
let p = document.createElement("p");
p.id = "description";
p.textContent = "Pagination using DOM";
textContainer.append(h1, p);

// creating Buttons for displaying-------------
let DomWrapper = document.createElement("div");
DomWrapper.classList.add("wrapper");

let paginationBtnOne = document.createElement("div");
paginationBtnOne.classList.add("paginationBtn", "one");
let firstBtn = document.createElement("a");
firstBtn.textContent = "<<<First";
firstBtn.setAttribute("data-set", "fir");
let prevBtn = document.createElement("a");
prevBtn.textContent = "<<Previous";
prevBtn.setAttribute("data-set", "pre");
paginationBtnOne.append(firstBtn, prevBtn);
let DompaginationNumber = document.createElement("div");
DompaginationNumber.id = "paginationNumber";
let paginationBtnTwo = document.createElement("div");
paginationBtnTwo.classList.add("paginationBtn", "two");
let nextBtn = document.createElement("a");
nextBtn.textContent = "Next>>";
nextBtn.setAttribute("data-set", "nxt");
let lastBtn = document.createElement("a");
lastBtn.textContent = "Last>>>";
lastBtn.setAttribute("data-set", "lst");
paginationBtnTwo.append(nextBtn, lastBtn);

DomWrapper.append(paginationBtnOne, DompaginationNumber, paginationBtnTwo);

// console.log(DomWrapper);
// console.log(DomWrapper.innerHTML);
let DomTable= document.createElement("table");
DomTable.classList.add("table","table-bordered");
DomTable.id = "list";

let tableResponsiveDiv = document.createElement("div");
tableResponsiveDiv.classList.add("table-responsive");
tableResponsiveDiv.append(DomTable);

// TableContainer.appendChild(tableResponsiveDiv);
let buttonsDiv = document.createElement("div");
buttonsDiv.id = "buttons";
buttonsDiv.classList.add("d-flex", "justify-content-center");
//Appending all create html element in body

document.body.append(textContainer,tableResponsiveDiv,buttonsDiv,DomWrapper);


let paginationNumbers = document.getElementById("paginationNumber");
let list = document.getElementById("list");
let wrapper = document.querySelector(".wrapper");

//getting data  using xml method

const req = new XMLHttpRequest();
req.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
req.send();
req.addEventListener("load", request);
function request() {
  //received data stored in data
  let data = JSON.parse(this.responseText);
  let currentPage = 1;
  let rows = 10;
  //Displaying data in table using list id
  function DisplayList(data, list, rows, currentPage) {
    list.innerHTML = `
    <thead>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </thead>
    `;
    currentPage--;
    let start = rows * currentPage;
    let end = start + rows;
    let paginatedItems = data.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];
      let tr = document.createElement("tr");
      let tbody = document.createElement("tbody");
      tr.classList.add("item");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      td1.textContent = item.id;
      td2.textContent = item.name;
      td3.textContent = item.email;
      tr.append(td1, td2, td3);
      tbody.append(tr)
      list.append(tbody);
    }
  }
  //Displaying page no in browser as per data retrived from url
  function SetupPagination(data, paginationNumbers, rows) {
    paginationNumbers.innerHTML = "";
    let page_count = Math.ceil(data.length / rows);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = PaginationButton(i, data);
      paginationNumbers.appendChild(btn);
    }
  }
  //Creating button element & updating its style & adding onclick event to update table list
  function PaginationButton(page, data) {
    let button = document.createElement("a");
    button.classList.add("page");
    button.innerText = page;
    if (currentPage == page) button.classList.add("active");
    button.addEventListener("click", function () {
      currentPage = page;
      DisplayList(data, list, rows, currentPage);
      let allBtn = document.querySelectorAll(".page");
      allBtn.forEach((e) => e.classList.remove("active"));
      button.classList.add("active");
    });
    return button;
  }
  //adding onclick event to first,prev,next,last buttons;
  function updateBtn(currentPage) {
    let allBtn = document.querySelectorAll(".page");
    allBtn.forEach((e) => e.classList.remove("active"));
    allBtn[currentPage - 1].classList.add("active");
    DisplayList(data, list, rows, currentPage);
  }
  wrapper.addEventListener("click", (e) => {
    if (e.target.dataset.set == "fir") {
      if (currentPage != 1) {
        currentPage = 1;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "lst") {
      if (currentPage != 10) {
        currentPage = 10;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "pre") {
      if (currentPage != 1) {
        currentPage--;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "nxt") {
      if (currentPage != 10) {
        currentPage++;
        updateBtn(currentPage);
      }
    }
  });
// function call
  DisplayList(data, list, rows, currentPage);
  SetupPagination(data, paginationNumbers, rows);
}