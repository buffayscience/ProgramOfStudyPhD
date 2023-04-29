let approvedMinor = new Map();
approvedMinor.set("Major", 1);
approvedMinor.set("Minor", 2);
approvedMinor.set("Approved Electives", 3);
approvedMinor.set("Math/Quantitative Methods", 4);
approvedMinor.set("Other Courses", 5);
approvedMinor.set("Doctoral Thesis", 6);

const COMPUTERSCIENCE = "ComputerScience";
const HEALTHCAREADM = "HeathCareAdministration";
const BUSINESSADM = "BusinessAdministration";
const hashMap = {};



const year = ["2015", "2016", "2017", "2018", "2019", "2020"];
CompScicourseData = new Map();
hcaCourseData = new Map();
busAdmCourseData = new Map();

class CourseModel {
  constructor(
    courseId,
    courseName,
    courseLevel,
    maxCredits,
    minCredits,
    departmentCode,
    graduateLevel,
    credits
  ) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.courseLevel = courseLevel;
    this.maxCredits = maxCredits;
    this.minCredits = minCredits;
    this.departmentCode = departmentCode;
    this.graduateLevel = graduateLevel;
    this.credits = credits;
  }

  greet() {
    console.log(
      "${this.courseId}${this.courseName}${this.courseLevel} ${this.maxCredits}${this.minCredits}${this.departmentCode}${this.graduateLevel}${this.credits}"
    );
  }
}

class SelectedCourseModel {
  constructor(
    area,
    isMastersCourse,
    isMathCourse,
    department,
    courseName,
    courseNumber,
    courseLevel,
    isUWMCourse,
    credits
  ) {
    this.area = area;
    this.isMastersCourse = isMastersCourse;
    this.isMathCourse = isMathCourse;
    this.department = department;
    this.courseName = courseName;
    this.courseNumber = courseNumber;
    this.courseLevel = courseLevel;
    this.isUWMCourse = isUWMCourse;
    this.credits = credits;
  }

  greet() {
    console.log(
      "${this.area}${this.isMastersCourse}${this.isMathCourse} ${this.department}${this.courseName}${this.courseNumber}${this.courseLevel}${this.isUWMCourse}${this.credits}"
    );
  }
}

function getCourseData() {
  console.log("test");
  fetch("http://localhost:8080/courses/COMPSCI")
    .then((response) => response.json())
    .then((json) => {
      const courseData = json.data;
      for (let i = 0; i < courseData.length; i++) {
        CompScicourseData[
          courseData[i].departmentCode + courseData[i].courseId
        ] = courseData[i];
      }
      //  console.log(CompScicourseData);
    })
    .catch((error) => console.error(error));

  fetch("http://localhost:8080/courses/HCA")
    .then((response) => response.json())
    .then((json) => {
      const courseData = json.data;
      for (let i = 0; i < courseData.length; i++) {
        hcaCourseData[courseData[i].departmentCode + courseData[i].courseId] =
          courseData[i];
      }
    })
    .catch((error) => console.error(error));

  fetch("http://localhost:8080/courses/BUSADM")
    .then((response) => response.json())
    .then((json) => {
      const courseData = json.data;
      for (let i = 0; i < courseData.length; i++) {
        busAdmCourseData[
          courseData[i].departmentCode + courseData[i].courseId
        ] = courseData[i];
      }
    })
    .catch((error) => console.error(error));
}

function validateCourseData() {

  
  console.log(hashMap);

  const myValuesArray = Object.values(hashMap);

  console.log(myValuesArray);

  var data = new SelectedCourseModel(
    1,
    true,
    true,
    1,
    "Algorithm design and analysiaas",
    "CS535",
    500,
    true,
    3
  );
  let courses = [];

  var coursesData = {
    courses: [
      // {
      //   area: 1,
      //   isMastersCourse: true,
      //   isMathCourse: true,
      //   department: 1,
      //   courseName: "Algorithm design and analysis",
      //   courseNumber: "CS535",
      //   courseLevel: 500,
      //   isUWMCourse: true,
      //   credits: 3,
      // },
      // Add the rest of the course objects here
    ],
  };

  courses.push(data);
  // console.log(courses);
  console.log("-------"+JSON.stringify(coursesData));

  // Send the data to the backend using jQuery's $.ajax() function
  $.ajax({
    url: "http://localhost:8080/courses/validate",
    type: "POST",
    data: JSON.stringify(coursesData),
    headers: {
      "Content-Type": "application/json",
    },
    success: function (response) {
      // If the request was successful, do nothing
      alert("-" + response.errorMessage);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // If there was an error, display the error message in an alert box
      alert("Error: " + textStatus + " - " + errorThrown);
    },
  });
}

getCourseData();

var termDeptInfo = {
  Spring: {
    ComputerScience: CompScicourseData,
    HeathCareAdministration: hcaCourseData,
    BusinessAdministration: busAdmCourseData,
  },
  Fall: {
    ComputerScience: CompScicourseData,
    HeathCareAdministration: hcaCourseData,
    BusinessAdministration: busAdmCourseData,
  },

  Summer: {
    ComputerScience: CompScicourseData,
    HeathCareAdministration: hcaCourseData,
    BusinessAdministration: busAdmCourseData,
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


    validateCourseData();
  });

  selects.forEach((select) => {
    if (select.disabled == true) {
      select.style.cursor = "auto";
    } else {
      select.style.cursor = "pointer";
    }
  });

  for (const key of approvedMinor.keys()) {
    console.log(key);
    selectminor.options[selectminor.options.length] = new Option(key,key);
  }
  

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
      selectDept.options[selectDept.options.length] = new Option(dept, dept);
    }
  };

  // change Department
  selectDept.onchange = (e) => {
    fetchData();
  };


  function fetchData() {
    let courses = termDeptInfo[selectTerm.value][selectDept.value];

    const courseListTable = document.getElementById("courseList");
    courseListTable.innerHTML = "";

    for (const key in courses) {
      courseListTable.innerHTML += `
                <tr>
                    <td class = "course-data">
                    <p  id="table-data" >${
                      key + "-" + courses[key].courseName
                    }</p>  
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
        const termData =
          selectminor.value +
          "-" +
          selectYear.value +
          "-" +
          selectTerm.value +
          "-" +
          data;
        const coursName = data.split("-")[0];
        var course ;
        if(selectDept.value.trim().toLowerCase() === COMPUTERSCIENCE.toLowerCase())
         course = CompScicourseData[coursName];
         else if(selectDept.value.trim().toLowerCase() === HEALTHCAREADM.toLowerCase()){
          course = hcaCourseData[coursName];
         }else if(selectDept.value.trim().toLowerCase() === BUSINESSADM.toLowerCase()){
          course = busAdmCourseData[coursName];
         }
        console.log("-----------------");
        console.log(course);
        console.log("-----------------");

        if (!hashMap.hasOwnProperty(termData)) {
          hashMap[termData] = course;
          hashMap[termData].credits = hashMap[termData].minCredits;
          console.log(hashMap);

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
              <input type="number" id="myTextBox" readonly/>
              <button class="addMinusBtn" id = "plusBtn">+</button>
              <input type="checkbox" class="checkBox" id = "isMathCourse">
              <input type="checkbox" class="checkBox" id = "isMasterCourse">
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
    var mathCourse = newRow.querySelector("#isMathCourse");
    var masterCourse = newRow.querySelector("#isMasterCourse");

    if (numBox.value.length == 0) {
      numBox.value = hashMap[data].minCredits;
    }
    hashMap[data].isMathCourse = false;
    hashMap[data].isMastersCourse = false;
    var majorValue= selectminor.value;
    console.log(majorValue);
    hashMap[data].area = approvedMinor.get(majorValue);

    console.log("mathcourse" + mathCourse.checked);

    mathCourse.addEventListener("change", function () {
      // do something when the checkbox is checked or unchecked\
      console.log("mathcourse" + mathCourse.checked);
      hashMap[data].isMathCourse = mathCourse.checked;
    });

    masterCourse.addEventListener("change", function () {
      // do something when the checkbox is checked or unchecked\
      console.log("mastercourse" + masterCourse.checked);
      hashMap[data].isMastersCourse = masterCourse.checked;
    });

    deleteBtn.onclick = function () {
      delete hashMap[data];
      const row = deleteBtn.parentNode.parentNode;
      row.remove();
    };

  

    addBtn.onclick = function () {
      minValue = hashMap[data].minCredits;
      maxValue = hashMap[data].maxCredits;
      if (numBox.value < maxValue) {
        numBox.value = parseInt(numBox.value) + 1;
        hashMap[data].credits = parseInt(numBox.value);
        console.log("-------" + hashMap[data].credits);
        console.log(hashMap);
      }
    };

    minusBtn.onclick = function () {
      minValue = hashMap[data].minCredits;
      maxValue = hashMap[data].maxCredits;
      if (numBox.value > minValue) {
        numBox.value = parseInt(numBox.value) - 1;
        hashMap[data].credits = parseInt(numBox.value);
        console.log("-------" + hashMap[data].credits);
        console.log(hashMap);
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
