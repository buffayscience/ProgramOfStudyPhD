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

  window.location.href = `HomePage.html?object=${JSON.stringify(data)}`;

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
