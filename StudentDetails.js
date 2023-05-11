// window.onload = function () {
class StudentModel {
  constructor(name, studentId, email, phone, advisor, date, major, minor) {
    this.name = name;
    this.studentId = studentId;
    this.email = email;
    this.phone = phone;
    this.advisor = advisor;
    this.date = date;
    this.major = major;
    this.minor = minor;
  }
}
function setDataFunc() {
  var studentName = document.getElementById("name");
  var studentId = document.getElementById("studentId");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var advisor = document.getElementById("advisor");
  var major = document.getElementById("major");
  var minor = document.getElementById("minor");
  var dateInput = document.getElementById("date-input");

if (studentName.value.length === 0) {
  alert("Please enter valid Name");
}
else if (studentId.value.length === 0) {
  alert("Please enter valid Student ID");
}
else if (email.value.length === 0) {
  alert("Please enter valid Email");
}
else if (phone.value.length === 0) {
  alert("Please enter valid Phone");
}
else if (advisor.value.length === 0) {
  alert("Please enter valid Advisor Name");
}
else if (major.value.length === 0) {
  alert("Please enter valid Major Name");
}
else if (minor.value.length === 0) {
  alert("Please enter valid Minor Name");
}

else if (dateInput.value.length === 0) {
  alert("Please enter valid date");
}else {
  let data = new StudentModel(
    studentName.value,
    studentId.value,
    email.value,
    phone.value,
    advisor.value,
    dateInput.value,
    major.value,
    minor.value
  );
  console.log(data);

  localStorage.setItem('studentData',JSON.stringify(data));
  localStorage.setItem('studentName',(studentName.value));
  localStorage.setItem('studentId',(studentId.value));
  localStorage.setItem('email',(email.value));
  localStorage.setItem('phone',(phone.value));
  localStorage.setItem('advisor',(advisor.value));
  localStorage.setItem('dateInput',(dateInput.value));
  localStorage.setItem('major',(major.value));
  localStorage.setItem('minor',(minor.value));





  window.location.href = `HomePage.html`;
  }
}

function testPDF() {
  const jsonString =
    '[{"coursename":"Mathematics","courseid":"MATH101","credits":3,"term":"Fall","year":2022},{"coursename":"English Composition","courseid":"ENG100","credits":4,"term":"Spring","year":2023}]';

  const courses = JSON.parse(jsonString);

  let tableHtml =
    "<table><tr><th>Course Name</th><th>Course ID</th><th>Credits</th><th>Term</th><th>Year</th></tr>";

  courses.forEach((course) => {
    tableHtml += `<tr><td>${course.coursename}</td><td>${course.courseid}</td><td>${course.credits}</td><td>${course.term}</td><td>${course.year}</td></tr>`;
  });

  tableHtml += "</table>";

  console.log(tableHtml);
}

// }
