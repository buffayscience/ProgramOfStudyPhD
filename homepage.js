const year = ["2015", "2016", "2017", "2018", "2019", "2020"];
const CompScicourseData = {
  "COMPSCI 422G": "COMPSCI 422G - Introduction to Artificial Intelligence",
  "COMPSCI 425G": "COMPSCI 425G - Introduction to Data Mining",
  "COMPSCI 431G": "COMPSCI 431G - Programming Languages Concepts ",
  "COMPSCI 458G": "COMPSCI 458G - Computer Architecture  ",
  "COMPSCI 482G": "COMPSCI 482G - Rich Internet Applications ",
};

const hcaCourseData = {
  "HCA 541G": "HCA 541G - Healthcare Information Systems Analysis and Design ",
  "HCA 723":
    "HCA 723 - Health Care Systems Applications - Administrative and Clinical ",
  "HCA 740": " HCA 740 - Introduction to Biomedical Database Applications ",
  "HCA 743": " HCA 743 - Predictive Analytics in Healthcare ",
};

var termDeptInfo = {
  Spring: {
    ComputerScience: CompScicourseData,
    HealthcareAdmis: hcaCourseData,
  },
  Fall: {
    ComputerScience: CompScicourseData,
    HealthcareAdmis: hcaCourseData,
  },

  Summer: {
    ComputerScience: CompScicourseData,
    HealthcareAdmis: hcaCourseData,
  },
};

window.onload = function () {
  (selectYear = document.getElementById("year")),
    (selectTerm = document.getElementById("term")),
    (selectDept = document.getElementById("department")),
    (selects = document.querySelectorAll("select"));
  const courseListAddedTable = document.getElementById("courseListAdded");
  courseListAddedTable.innerHTML = ``;

  selectDept.disabled = true;
  selectTerm.disabled = true;

  selects.forEach((select) => {
    if (select.disabled == true) {
      select.style.cursor = "auto";
    } else {
      select.style.cursor = "pointer";
    }
  });

  for (var i = 0; i < year.length; i++) {
    selectYear.options[selectYear.options.length] = new Option(
      year[i],
      year[i]
    );
  }

  selectYear.onchange = (e) => {
    selectTerm.disabled = false;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });

    for (let term in termDeptInfo) {
      console.log(term);
      selectTerm.options[selectTerm.options.length] = new Option(term, term);
    }

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
  };

  const mySet = new Set();
  const courseNameSet = new Set();
  class Course {
    constructor(year, term, courseName, credits) {
      this.term = term;
      this.courseName = courseName;
      this.year = year;
      this.credits = credits;
    }
  }
  function fetchData() {
    console.log("testing the fetch");
    console.log(termDeptInfo);
    let courses = termDeptInfo[selectTerm.value][selectDept.value];

    const courseListTable = document.getElementById("courseList");

    courseListTable.innerHTML = "";

    for (const key in courses) {
      courseListTable.innerHTML += `
                <tr>
                    <td class = "course-data"><p  id="table-data" >${courses[key]}</p>  <button class="deleteBtn" id = "add-btn">Add</button></td>
                </tr>
            `;
    }

    const tdElements = document.querySelectorAll("td");
    tdElements.forEach((tdata) => {
      const courseName = tdata.querySelector("p"); // Find the element with the specific ID inside the <td> element
      const addBtn = tdata.querySelector("button");

      addBtn.addEventListener("click", () => {
        const data = courseName.innerText; // Get the text content of the <td> element

        const termData = selectYear.value + "-" + selectTerm.value + "-" + data;
        const course = new Course(selectYear.value, selectTerm.value, data);
        if (!courseNameSet.has(termData)) {
          mySet.add(course);
          courseNameSet.add(termData);
          courseListAddedTable.innerHTML += `
          <tr>
              <td class="data-row" ><p >${
                course.year + " - " + course.term + " - " + course.courseName    }</p> <button   class="addMinusBtn" id = "minusBtn">-</button>
              <input type="number" id="myTextBox" />
              <button class="addMinusBtn" id = "plusBtn">+</button>
              </td>
          </tr>`;
          showData();
        } else {
          alert(termData + "is already present");
        }

        console.log(mySet);
        console.log(courseNameSet);
      });
    });
  }

  function showData() {
    const addedCourses = document.querySelectorAll("td.data-row");
    console.log(addedCourses);

    for (i = 0; i < addedCourses.length; i++) {
      console.log("testing addedcourses");
      var numBox = addedCourses[i].querySelector("input");
      var addBtn = addedCourses[i].querySelector("#plusBtn");
      var minusBtn = addedCourses[i].querySelector("#minusBtn");
      if (numBox.value.length == 0) {
        numBox.value = 3;
      }

      addBtn.onclick = function () {
        if (numBox.value < 18) {
          numBox.value = parseInt(numBox.value) + 1;
        }
      };

      minusBtn.onclick = function () {
        if (numBox.value > 1) {
          numBox.value = parseInt(numBox.value) - 1;
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
  }
  fetchData();
};
