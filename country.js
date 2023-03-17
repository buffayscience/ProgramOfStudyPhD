var countrySateCityinfo = {
  Spring: {
    "Computer Science": [
      "COMPSCI 422G - Introduction to Artificial Intelligence ",
      "COMPSCI 425G - Introduction to Data Mining ",
      "COMPSCI 431G - Programming Languages Concepts ",
      "COMPSCI 458G - Computer Architecture ",
      "COMPSCI 482G - Rich Internet Applications ",
    ],
    HealthcareAdmis: [
      "HCA 541G - Healthcare Information Systems Analysis and Design ",
      "HCA 723 - Health Care Systems Applications - Administrative and Clinical ",
      " HCA 740 - Introduction to Biomedical Database Applications ",
      " HCA 743 - Predictive Analytics in Healthcare ",
    ],
    MathematicalSciences: [
      "MATH 305G - Introduction to Mathematical and Computational Modeling",
      "MATH 315G - Mathematical Programming and Optimization ",
      "MATH 322G - Introduction to Partial Differential Equations ",
      "MATH 325G - Vector Analysis ",
    ],
  },
  Fall: {
    "Computer Science": [
      "COMPSCI 422G - Introduction to Artificial Intelligence ",
      "COMPSCI 425G - Introduction to Data Mining ",
      "COMPSCI 431G - Programming Languages Concepts ",
      "COMPSCI 458G - Computer Architecture ",
      "COMPSCI 482G - Rich Internet Applications ",
    ],
    HealthcareAdmis: [
      "HCA 541G - Healthcare Information Systems Analysis and Design ",
      "HCA 723 - Health Care Systems Applications - Administrative and Clinical ",
      " HCA 740 - Introduction to Biomedical Database Applications ",
      " HCA 743 - Predictive Analytics in Healthcare ",
    ],
    MathematicalSciences: [
      "MATH 305G - Introduction to Mathematical and Computational Modeling",
      "MATH 315G - Mathematical Programming and Optimization ",
      "MATH 322G - Introduction to Partial Differential Equations ",
      "MATH 325G - Vector Analysis ",
    ],
  },

  Summer: {
    "Computer Science": [
      "COMPSCI 422G - Introduction to Artificial Intelligence ",
      "COMPSCI 425G - Introduction to Data Mining ",
      "COMPSCI 431G - Programming Languages Concepts ",
      "COMPSCI 458G - Computer Architecture ",
      "COMPSCI 482G - Rich Internet Applications ",
    ],
    HealthcareAdmis: [
      "HCA 541G - Healthcare Information Systems Analysis and Design ",
      "HCA 723 - Health Care Systems Applications - Administrative and Clinical ",
      " HCA 740 - Introduction to Biomedical Database Applications ",
      " HCA 743 - Predictive Analytics in Healthcare ",
    ],
    MathematicalSciences: [
      "MATH 305G - Introduction to Mathematical and Computational Modeling",
      "MATH 315G - Mathematical Programming and Optimization ",
      "MATH 322G - Introduction to Partial Differential Equations ",
      "MATH 325G - Vector Analysis ",
    ],
  },
};

(selectTerm = document.getElementById("term")),
  (selectDept = document.getElementById("department")),
  (selects = document.querySelectorAll("select"));
window.onload = function () {
  (selectTerm = document.getElementById("term")),
    (selectDept = document.getElementById("department")),
    (selects = document.querySelectorAll("select"));

  selectDept.disabled = true;

  selects.forEach((select) => {
    if (select.disabled == true) {
      select.style.cursor = "auto";
    } else {
      select.style.cursor = "pointer";
    }
  });

  for (let state in countrySateCityinfo) {
    console.log(state);
    selectTerm.options[selectTerm.options.length] = new Option(state, state);
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

    for (let city in countrySateCityinfo[selectTerm.value]) {
      console.log(city);
      selectDept.options[selectDept.options.length] = new Option(city, city);
    }
  };

  // change Department
  selectDept.onchange = (e) => {
    fetchData();
  };
};

const mySet = new Set();

function fetchData() {
  console.log("testing the fetch");
  console.log(countrySateCityinfo);
  let courses = countrySateCityinfo[selectTerm.value][selectDept.value];

  const courseListTable = document.getElementById("courseList");
  const courseListAddedTable = document.getElementById("courseListAdded");

  courseListTable.innerHTML = "";

  for (let i = 0; i < courses.length; i++) {
    courseListTable.innerHTML += `
                <tr>
                    <td><p id="table-data" >${courses[i]}</p>  <button class="deleteBtn" id = "add-btn">Add</button></td>
                </tr>
            `;
  }

  const tdElements = document.querySelectorAll("td");
  tdElements.forEach((tdata) => {
    const courseName = tdata.querySelector("p"); // Find the element with the specific ID inside the <td> element
    const addBtn = tdata.querySelector("button");

    addBtn.addEventListener("click", () => {
      const data = courseName.innerText; // Get the text content of the <td> element
      if (!mySet.has(data)) {
        mySet.add(data);
      } else {
        alert(data + "is already present");
      }

      console.log(mySet);
      courseListAddedTable.innerHTML = ``;
      for (const value of mySet) {
        courseListAddedTable.innerHTML += `
                    <tr>
                        <td><p id="table-data" >${value}</p>  <button class="deleteBtn" id = "add-btn">Add</button></td>
                    </tr>
                `;
      }
    });
  });
}

fetchData();
