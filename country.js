var countrySateCityinfo = {
    Spring: {
            "Computer Science": ["COMPSCI 422G - Introduction to Artificial Intelligence ",
            "COMPSCI 425G - Introduction to Data Mining ",
             "COMPSCI 431G - Programming Languages Concepts ","COMPSCI 458G - Computer Architecture ","COMPSCI 482G - Rich Internet Applications "],
            "HealthcareAdmis": ["HCA 541G - Healthcare Information Systems Analysis and Design ", "HCA 723 - Health Care Systems Applications - Administrative and Clinical ",
            " HCA 740 - Introduction to Biomedical Database Applications "," HCA 743 - Predictive Analytics in Healthcare "],
            "MathematicalSciences":["MATH 305G - Introduction to Mathematical and Computational Modeling","MATH 315G - Mathematical Programming and Optimization ",
       "MATH 322G - Introduction to Partial Differential Equations " ,"MATH 325G - Vector Analysis "]
       
    },
    Fall: {
       

        "Computer Science": ["COMPSCI 422G - Introduction to Artificial Intelligence ",
            "COMPSCI 425G - Introduction to Data Mining ",
             "COMPSCI 431G - Programming Languages Concepts ","COMPSCI 458G - Computer Architecture ","COMPSCI 482G - Rich Internet Applications "],
            "HealthcareAdmis": ["HCA 541G - Healthcare Information Systems Analysis and Design ", "HCA 723 - Health Care Systems Applications - Administrative and Clinical ",
            " HCA 740 - Introduction to Biomedical Database Applications "," HCA 743 - Predictive Analytics in Healthcare "],
            "MathematicalSciences":["MATH 305G - Introduction to Mathematical and Computational Modeling","MATH 315G - Mathematical Programming and Optimization ",
       "MATH 322G - Introduction to Partial Differential Equations " ,"MATH 325G - Vector Analysis "]
    },

    Summer: {
        "Computer Science": ["COMPSCI 422G - Introduction to Artificial Intelligence ",
        "COMPSCI 425G - Introduction to Data Mining ",
         "COMPSCI 431G - Programming Languages Concepts ","COMPSCI 458G - Computer Architecture ","COMPSCI 482G - Rich Internet Applications "],
        "HealthcareAdmis": ["HCA 541G - Healthcare Information Systems Analysis and Design ", "HCA 723 - Health Care Systems Applications - Administrative and Clinical ",
        " HCA 740 - Introduction to Biomedical Database Applications "," HCA 743 - Predictive Analytics in Healthcare "],
        "MathematicalSciences":["MATH 305G - Introduction to Mathematical and Computational Modeling","MATH 315G - Mathematical Programming and Optimization ",
   "MATH 322G - Introduction to Partial Differential Equations " ,"MATH 325G - Vector Analysis "]
     
    }
    
}

selectTerm = document.getElementById('term'),
selectDept = document.getElementById('department'),
// selectCourse = document.getElementById('course'),
selects = document.querySelectorAll('select')
window.onload = function(){

    // const selectCountry = document.getElementById('country'),
        selectTerm = document.getElementById('term'),
        selectDept = document.getElementById('department'),
        // selectCourse = document.getElementById('course'),
        selects = document.querySelectorAll('select')

        // selectTerm.disabled = true
        selectDept.disabled = true
        // selectCourse.disabled = true

        selects.forEach(select => {
            if(select.disabled == true){
                select.style.cursor = "auto"
            }
            else{
                select.style.cursor = "pointer"
            }
        })

      

         for(let state in countrySateCityinfo){
            console.log(state);
            selectTerm.options[selectTerm.options.length] =
             new Option(state, state)
        }


        // term change
        selectTerm.onchange = (e) =>{
            selectDept.disabled = false
            // selectCourse.disabled = true

            selects.forEach(select => {
                if(select.disabled == true){
                    select.style.cursor = "auto"
                }
                else{
                    select.style.cursor = "pointer"
                }
            })

            selectDept.length = 1
            // selectCourse.length = 1

            // for(let city in countrySateCityinfo[selectCountry.value][e.target.value]){
                for(let city in countrySateCityinfo[selectTerm.value]){
                console.log(city);
                selectDept.options[selectDept.options.length] = new Option(city, city)
            }
        }

        // change Department
        selectDept.onchange = (e) =>{
            fetchData();

            // selectCourse.disabled = false

            // selects.forEach(select => {
            //     if(select.disabled == true){
            //         select.style.cursor = "auto"
            //     }
            //     else{
            //         select.style.cursor = "pointer"
            //     }
            // })
            
            // selectCourse.length = 1

            // let zips = countrySateCityinfo[selectCountry.value][selectTerm.value][e.target.value]
            // let zips = countrySateCityinfo[selectTerm.value][selectDept.value]
            
            // for(let i=0; i<zips.length; i++){
            //     console.log(zips[i]);

            //     selectCourse.options[selectCourse.options.length] = new Option(zips[i], zips[i])
            // }
        }
}

courseName;


function fetchData(){

    // fetch("https://reqres.in/api/users")
    // .then(response =>{
    //     console.log(response);
    //     if(!response.ok){
    //         throw Error("Error");
    //     }
    //     return response.json();

    // })
    // .then(data =>{
        app = document.getElementById('app');
        app.innerHTML = "";

        console.log("testing the fetch");
        console.log(countrySateCityinfo);
        let courses = countrySateCityinfo[selectTerm.value][selectDept.value]
        const html = courses.map
        (user =>{
            return `<div class="user" id = "user" onmouseover="function_name()"><p class="course-data" id="course-name">${user}</p>
            <button type="button" id = "add-course-button" class="add-button">
            <ion-icon name="arrow-forward-outline"></ion-icon>
	</button>`;
        }).join("");
        // console.log(html);
        
        
        // console.log(courses);
        document.querySelector('#app').insertAdjacentHTML("afterbegin",html);
        // courseName= document.getElementById('course-name').innerText;
      

}
function function_name(){
     courseName= document.getElementById('user');
     data = courseName.closest("p").innerText;
    console.log(data);
}



fetchData();

