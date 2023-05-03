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
const ELECENG = "ElectricalEngineering";
hashMap = new Map();

const year = [
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
];
CompScicourseData = new Map();
hcaCourseData = new Map();
busAdmCourseData = new Map();
electricalEnggData = new Map();

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
    courseName,
    courseId,
    courseLevel,
    credits,
    year,
    term,
    isUWMCourse
  ) {
    this.area = area;
    this.isMastersCourse = isMastersCourse;
    this.isMathCourse = isMathCourse;
    this.courseName = courseName;
    this.courseId = courseId;
    this.courseLevel = courseLevel;
    this.isUWMCourse = isUWMCourse;
    this.credits = credits;
    this.year = year;
    this.term = term;
    this.isUWMCourse = isUWMCourse;
  }

  greet() {
    console.log(
      "${this.area}${this.isMastersCourse}${this.isMathCourse} ${this.department}${this.courseName}${this.courseId}${this.courseLevel}${this.isUWMCourse}${this.credits}"
    );
  }
}

function getCourseData() {
  fetch("http://localhost:8080/courses/COMPSCI")
    .then((response) => response.json())
    .then((json) => {
      const courseData = json.data;
      for (let i = 0; i < courseData.length; i++) {
        CompScicourseData[courseData[i].courseId] = courseData[i];
      }
    })
    .catch((error) => console.error(error));

  fetch("http://localhost:8080/courses/HCA")
    .then((response) => response.json())
    .then((json) => {
      const courseData = json.data;
      for (let i = 0; i < courseData.length; i++) {
        hcaCourseData[courseData[i].courseId] = courseData[i];
      }
    })
    .catch((error) => console.error(error));

  fetch("http://localhost:8080/courses/BUSADM")
    .then((response) => response.json())
    .then((json) => {
      const courseData = json.data;
      for (let i = 0; i < courseData.length; i++) {
        busAdmCourseData[courseData[i].courseId] = courseData[i];
      }
    })
    .catch((error) => console.error(error));

  fetch("http://localhost:8080/courses/ELECENG")
    .then((response) => response.json())
    .then((json) => {
      const courseData = json.data;
      for (let i = 0; i < courseData.length; i++) {
        electricalEnggData[courseData[i].courseId] = courseData[i];
      }
    })
    .catch((error) => console.error(error));
}

function openPopup() {
  let popupdiv = document.querySelector(".popup");
  console.log(popupdiv);
  console.log("test");
  popupdiv.classList.add("openpopup");
}
function closePopup() {
  let popupdiv = document.querySelector(".popup");
  console.log(popupdiv);
  popupdiv.classList.remove("openpopup");
}
function functiontest() {
  console.log("test");
}

function validateCourseData() {
  errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";
    statusImg = document.getElementById("statusImg");
  popupHeading = document.getElementById("popupHeading");

  console.log(hashMap);

  const myValuesArray = Object.values(hashMap);

  console.log(myValuesArray);

  let coursesArray = [];

  let valuesList = Array.from(hashMap.values()); // Get the list of values from the Map

  for (const course of valuesList) {
    let data = new SelectedCourseModel(
      course.area,
      course.isMastersCourse,
      course.isMathCourse,
      course.courseName,
      course.courseId,
      course.courseLevel,
      course.credits,
      course.year,
      course.term,
      course.isUWMCourse
    );
    console.log("***************");
    console.log(data);
    console.log("***************");

    coursesArray.push(data);
  }
  console.log(coursesArray);

  let coursesData = {
    courses: coursesArray,
  };

  console.log(JSON.stringify(coursesData));

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
      // alert("-" + response.errorMessage);
      if (response.statusCode == 200) {
        statusImg.src = "images/tick.png";
        popupHeading.textContent = "Success!!";
      } else {
        statusImg.src = "images/fail.png";
        popupHeading.textContent = "";
      }
      const lines = response.errorMessage.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const textNode = document.createTextNode(lines[i]);
        errorMessage.appendChild(textNode);
        errorMessage.appendChild(document.createElement("br"));
        // errorMessage.textContent += lines[i] + "\n\n";
      }
      // errorMessage.textContent = response.errorMessage;
      openPopup();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // If there was an error, display the error message in an alert box
      // alert("Error: " + textStatus + " - " + errorThrown);
      errorMessage.textContent = response.errorMessage;
      openPopup();
    },
  });
}

getCourseData();

var termDeptInfo = {
  Spring: {
    ComputerScience: CompScicourseData,
    HeathCareAdministration: hcaCourseData,
    BusinessAdministration: busAdmCourseData,
    ElectricalEngineering: electricalEnggData,
  },
  Fall: {
    ComputerScience: CompScicourseData,
    HeathCareAdministration: hcaCourseData,
    BusinessAdministration: busAdmCourseData,
    ElectricalEngineering: electricalEnggData,
  },

  Summer: {
    ComputerScience: CompScicourseData,
    HeathCareAdministration: hcaCourseData,
    BusinessAdministration: busAdmCourseData,
    ElectricalEngineering: electricalEnggData,
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

  const courseListTable = document.getElementById("courseList");
  verifyBtn.addEventListener("click", () => {
    // if (coursesDiv.classList.contains("hide")) {
    //   coursesDiv.classList.remove("hide");
    //   selectedCoursesDiv.classList.remove("full-screen");
    // } else {
    //   coursesDiv.classList.add("hide");
    //   selectedCoursesDiv.classList.add("full-screen");
    // }
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
    selectminor.options[selectminor.options.length] = new Option(key, key);
  }

  selectminor.onchange = (e) => {
    selectYear.disabled = false;
    selectTerm.disabled = true;
    selectDept.disabled = true;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });
    selectYear.length = 1;
    selectTerm.length = 1;
    selectDept.length = 1;
    courseListTable.innerHTML = "";

    for (var i = 0; i < year.length; i++) {
      selectYear.options[selectYear.options.length] = new Option(
        year[i],
        year[i]
      );
    }
  };

  selectYear.onchange = (e) => {
    selectTerm.disabled = false;
    selectDept.disabled = true;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });
    selectTerm.length = 1;
    selectDept.length = 1;
    courseListTable.innerHTML = "";

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
    courseListTable.innerHTML = "";

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
        var data = courseName.innerText; // Get the text content of the <td> element
        var termData =
          selectminor.value +
          "-" +
          selectYear.value +
          "-" +
          selectTerm.value +
          "-" +
          data;
        var coursName = data.split("-")[0];
        var course;
        if (
          selectDept.value.trim().toLowerCase() ===
          COMPUTERSCIENCE.toLowerCase()
        )
          course = CompScicourseData[coursName];
        else if (
          selectDept.value.trim().toLowerCase() === HEALTHCAREADM.toLowerCase()
        ) {
          course = hcaCourseData[coursName];
        } else if (
          selectDept.value.trim().toLowerCase() === BUSINESSADM.toLowerCase()
        ) {
          course = busAdmCourseData[coursName];
        } else if (
          selectDept.value.trim().toLowerCase() === ELECENG.toLowerCase()
        ) {
          course = electricalEnggData[coursName];
        }

        if (!hashMap.has(termData)) {
          hashMap.set(termData, course);
          console.log("---------------");
          console.log(hashMap.get(termData));
          // hashMap.get(termData).credits = hashMap.get(termData).minCredits;
          hashMap.set(termData, {
            ...hashMap.get(termData),
            credits: hashMap.get(termData).minCredits,
          });
          hashMap.set(termData, {
            ...hashMap.get(termData),
            year: selectYear.value,
          });
          hashMap.set(termData, {
            ...hashMap.get(termData),
            term: selectTerm.value,
          });
          var majorValue = selectminor.value;
          hashMap.set(termData, {
            ...hashMap.get(termData),
            area: approvedMinor.get(majorValue),
          });
          console.log(hashMap.get(termData).area);

          hashMap.set(termData, {
            ...hashMap.get(termData),
            isMastersCourse: 0,
          });
          hashMap.set(termData, { ...hashMap.get(termData), isMathCourse: 0 });
          hashMap.set(termData, { ...hashMap.get(termData), isUWMCourse: 0 });

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
        course = null;
        termData = null;
      });
    });
  }

  function showData(newRow) {
    const addedCourses = document.querySelectorAll("td.data-row");

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
      numBox.value = hashMap.get(data).minCredits;
    }

    // hashMap.get(data).isMathCourse = false;
    // hashMap.get(data).isMastersCourse = false;

    console.log("hashmap");
    console.log("data" + data);
    const map = new Map(Object.entries(hashMap));

    for (const [key, value] of map) {
      console.log(key, value);
    }

    mathCourse.addEventListener("change", function () {
      // do something when the checkbox is checked or unchecked\
      // hashMap.get(data).isMathCourse = mathCourse.checked;
      var isChecked;
      if (mathCourse.checked) {
        isChecked = 1;
      } else {
        isChecked = 0;
      }

      hashMap.set(data, { ...hashMap.get(data), isMathCourse: isChecked });
    });

    masterCourse.addEventListener("change", function () {
      // do something when the checkbox is checked or unchecked\
      // hashMap.get(data).isMastersCourse = masterCourse.checked;
      var isChecked;
      if (masterCourse.checked) {
        isChecked = 1;
      } else {
        isChecked = 0;
      }
      hashMap.set(data, { ...hashMap.get(data), isMastersCourse: isChecked });
    });

    deleteBtn.onclick = function () {
      // delete hashMap.get(data);
      hashMap.delete(data);
      const row = deleteBtn.parentNode.parentNode;
      row.remove();
    };

    addBtn.onclick = function () {
      minValue = hashMap.get(data).minCredits;
      maxValue = hashMap.get(data).maxCredits;
      if (numBox.value < maxValue) {
        numBox.value = parseInt(numBox.value) + 1;
        // hashMap.get(data).credits = parseInt(numBox.value);

        // const test1 = parseInt(numBox.value);
        hashMap.set(data, {
          ...hashMap.get(data),
          credits: parseInt(numBox.value),
        });
      }
    };

    minusBtn.onclick = function () {
      minValue = hashMap.get(data).minCredits;
      maxValue = hashMap.get(data).maxCredits;
      if (numBox.value > minValue) {
        numBox.value = parseInt(numBox.value) - 1;
        // hashMap.get(da).credits = parseInt(numBox.value);
        hashMap.set(data, {
          ...hashMap.get(data),
          credits: parseInt(numBox.value),
        });
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
