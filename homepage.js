const approvedMinor = [
  "Major",
  "Minor",
  "Approved Electives",
  "Math/Quantitative Methods",
  "Other Courses",
  "Doctoral Thesis"
];

const year = ["2015", "2016", "2017", "2018", "2019", "2020"];
CompScicourseData = new Map();
hcaCourseData = new Map();
busAdmCourseData = new Map();
function getCourseData() {
  console.log('test');
  fetch('http://localhost:8080/courses/COMPSCI')
  .then(response => response.json()) 
  .then(json => {
    const courseData = json.data;
     for(let i =0;i<courseData.length;i++){
      CompScicourseData[courseData[i].departmentCode + courseData[i].courseId] = courseData[i];
     }
    //  console.log(CompScicourseData);
    })
  .catch(error => console.error(error));


  fetch('http://localhost:8080/courses/HCA')
  .then(response => response.json()) 
  .then(json => {
    const courseData = json.data;
     for(let i =0;i<courseData.length;i++){
      hcaCourseData[courseData[i].departmentCode + courseData[i].courseId] = courseData[i];
     }
    })
  .catch(error => console.error(error));

  fetch('http://localhost:8080/courses/BUSADM')
  .then(response => response.json()) 
  .then(json => {
    const courseData = json.data;
     for(let i =0;i<courseData.length;i++){
      busAdmCourseData[courseData[i].departmentCode + courseData[i].courseId] = courseData[i];
     }
    })
  .catch(error => console.error(error));
}

//  CompScicourseData = {
//   "COMPSCI 422G": "COMPSCI 422G - Introduction to Artificial Intelligence",
//   "COMPSCI 425G": "COMPSCI 425G - Introduction to Data Mining",
//   "COMPSCI 431G": "COMPSCI 431G - Programming Languages Concepts ",
//   "COMPSCI 458G": "COMPSCI 458G - Computer Architecture  ",
//   "COMPSCI 482G": "COMPSCI 482G - Rich Internet Applications ",
//   "COMPSCI 535G": "COMPSCI 535G - Algorithm Design and Analysis",
//   "COMPSCI 537G": "COMPSCI 537G - Introduction to Operating Systems ",
//   "COMPSCI 557G": "COMPSCI 557G - Introduction to Database Systems ",
//   "COMPSCI 710": "COMPSCI 710 - Artificial Intelligence ",
//   "COMPSCI 711": "COMPSCI 711 - Introduction to Machine Learning ",
//   "COMPSCI 725": "COMPSCI 725 - Robot Motion Planning ",
//   "COMPSCI 998": "COMPSCI 998 - Doctoral Thesis ",
//   "COMPSCI 700": "COMPSCI 700 CEAS Graduate Seminar",
// };


// const hcaCourseData = {
//   "HCA 541G": "HCA 541G - Healthcare Information Systems Analysis and Design ",
//   "HCA 723":
//     "HCA 723 - Health Care Systems Applications - Administrative and Clinical ",
//   "HCA 740": " HCA 740 - Introduction to Biomedical Database Applications ",
//   "HCA 743": " HCA 743 - Predictive Analytics in Healthcare ",
// };
getCourseData();


var termDeptInfo = {
  Spring: {
    ComputerScience: CompScicourseData,
    HeathCareAdministration: hcaCourseData,
    BusinessAdministration:busAdmCourseData,
  },
  Fall: {
    ComputerScience: CompScicourseData,
    HeathCareAdministration: hcaCourseData,
    BusinessAdministration:busAdmCourseData,

  },

  Summer: {
    ComputerScience: CompScicourseData,
    HeathCareAdministration: hcaCourseData,
    BusinessAdministration:busAdmCourseData,

  },
};

window.onload = function () {

  (selectminor = document.getElementById("minor")),
    (selectYear = document.getElementById("year")),
    (selectTerm = document.getElementById("term")),
    (selectDept = document.getElementById("department")),
    (selects = document.querySelectorAll("select"));
  verifyBtn = document.querySelector("#verifyBtn");
  coursesDiv = document.querySelector(".left-div");
  selectedCoursesDiv = document.querySelector(".right-div");

  const courseListAddedTable = document.getElementById("courseListAdded");
  courseListAddedTable.innerHTML = ``;
  selectYear.disabled = true;
  selectDept.disabled = true;
  selectTerm.disabled = true;

  verifyBtn.addEventListener("click", () => {
    if (coursesDiv.classList.contains("hide")) {
      coursesDiv.classList.remove("hide");
      selectedCoursesDiv.classList.remove("full-screen");
    } else {
      coursesDiv.classList.add("hide");
      selectedCoursesDiv.classList.add("full-screen");
    }

    console.log(hashMap);

    const myValuesArray = Object.values(hashMap);

    console.log(myValuesArray);

    postData();
  });

  selects.forEach((select) => {
    if (select.disabled == true) {
      select.style.cursor = "auto";
    } else {
      select.style.cursor = "pointer";
    }
  });
  for (var i = 0; i < year.length; i++) {
    selectminor.options[selectminor.options.length] = new Option(
      approvedMinor[i],
      approvedMinor[i]
    );
  }
  // for (var i = 0; i < year.length; i++) {
  //   selectYear.options[selectYear.options.length] = new Option(
  //     year[i],
  //     year[i]
  //   );
  // }

  selectminor.onchange = (e) => {
    selectYear.disabled = false;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });
    selectYear.length = 1;

    for (var i = 0; i < year.length; i++) {
        selectYear.options[selectYear.options.length] = new Option(
          year[i],
          year[i]
        );
      }

    // for (let term in year) {
    //   selectYear.options[selectYear.options.length] = new Option(term, term);
    // }
  };

  selectYear.onchange = (e) => {
    selectTerm.disabled = false;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });
    selectTerm.length = 1;

    for (let term in termDeptInfo) {
      selectTerm.options[selectTerm.options.length] = new Option(term, term);
    }
  };

  selectTerm.onchange = (e) => {
    selectDept.disabled = false;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });

    selectDept.length = 1;

    for (let dept in termDeptInfo[selectTerm.value]) {
      console.log(dept);
      selectDept.options[selectDept.options.length] = new Option(dept, dept);
    }
  };

  // change Department
  selectDept.onchange = (e) => {
    fetchData();
  };

  const hashMap = {};
  class Course {
    constructor(year, term, courseName, credits) {
      this.term = term;
      this.courseName = courseName;
      this.year = year;
      this.credits = credits;
    }

    greet() {
      console.log(
        ` ${this.term} - ${this.courseName}  -  ${this.year} -  ${this.credits} `
      );
    }
  }

  function postData(){

    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 30
    };
    
    fetch('http://example.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

  }

 
  function fetchData() {
    let courses = termDeptInfo[selectTerm.value][selectDept.value];

    const courseListTable = document.getElementById("courseList");
    console.log(courses);
    courseListTable.innerHTML = "";

    for (const key in courses) {
      console.log(key);

      courseListTable.innerHTML += `
                <tr>
                    <td class = "course-data">
                    <p  id="table-data" >${key +"-"+ courses[key].courseName}</p>  
                    <button class="deleteBtn" id = "add-btn">Add</button></td>
                </tr>
            `;
    }

    const tdElements = document.querySelectorAll("td");
    tdElements.forEach((tdata) => {
      const courseName = tdata.querySelector("p"); // Find the element with the specific ID inside the <td> element
      const addBtn = tdata.querySelector("button");

      addBtn.addEventListener("click", () => {
        const data = courseName.innerText; // Get the text content of the <td> element
        const termData = selectminor.value+"-"+ selectYear.value + "-" + selectTerm.value + "-" + data;
        const coursName = data.split("-")[0];

        const course = CompScicourseData[coursName]
        console.log("-----------------");
        console.log(course);
        console.log("-----------------");


        if (!hashMap.hasOwnProperty(termData)) {
          hashMap[termData] = course;
          const newRow = document.createElement("tr");

          newRow.innerHTML = `
          <tr>
              
          <td class="data-row" >
          <div class="selectcoursesParent">
          <div class="leftCourses">
              <p >${termData}</p>
                </div>
                <div class="rightCourses">
                <button   class="addMinusBtn" id = "minusBtn">-</button>
              <input type="number" id="myTextBox" />
              <button class="addMinusBtn" id = "plusBtn">+</button>
              <button class="deleteBtn" id = "deleteBtn">Delete</button>
              </div>
              </div>

              </td>
          </tr>`;
          courseListAddedTable.appendChild(newRow);

          showData(newRow);
        } else {
          alert(termData + "is already present");
        }
      });
    });
  }

  function showData(newRow) {
    const addedCourses = document.querySelectorAll("td.data-row");
    console.log(addedCourses);

    // for (i = 0; i < addedCourses.length; i++) {
    var courseName = newRow.querySelector("p"); // Find the element with the specific ID inside the <td> element

    const data = courseName.innerText; // Get the text content of the <td> element
    var numBox = newRow.querySelector("input");
    var addBtn = newRow.querySelector("#plusBtn");
    var minusBtn = newRow.querySelector("#minusBtn");
    var deleteBtn = newRow.querySelector("#deleteBtn");

    if (numBox.value.length == 0) {
      numBox.value = 3;
    }

    deleteBtn.onclick = function () {
      delete hashMap[data];
      const row = deleteBtn.parentNode.parentNode;
      row.remove();
    };

    addBtn.onclick = function () {
      if (numBox.value < 18) {
        numBox.value = parseInt(numBox.value) + 1;
        hashMap[data].credits = numBox.value;
        console.log("-------" + hashMap[data].credits);
        console.log("-------" + hashMap[data].greet());
      }
    };

    minusBtn.onclick = function () {
      if (numBox.value > 1) {
        numBox.value = parseInt(numBox.value) - 1;
        hashMap[data].credits = numBox.value;
        console.log("-------" + hashMap[data].credits);
        console.log("-------" + hashMap[data].greet());
      }
    };

    numBox.addEventListener("input", function () {
      var regex = /[^0-9]/gi;
      numBox.value = numBox.value.replace(regex, "");
      if (numBox.value < 1) {
        numBox.value = 1;
      } else if (numBox.value > 18) {
        numBox.value = 18;
      }
    });
  }
  // }
  fetchData();
};
