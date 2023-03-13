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

window.onload = function(){

    // const selectCountry = document.getElementById('country'),
        selectState = document.getElementById('state'),
        selectCity = document.getElementById('city'),
        selectZip = document.getElementById('zip'),
        selects = document.querySelectorAll('select')

        // selectState.disabled = true
        selectCity.disabled = true
        selectZip.disabled = true

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
            selectState.options[selectState.options.length] =
             new Option(state, state)
        }


        // state change
        selectState.onchange = (e) =>{
            selectCity.disabled = false
            selectZip.disabled = true

            selects.forEach(select => {
                if(select.disabled == true){
                    select.style.cursor = "auto"
                }
                else{
                    select.style.cursor = "pointer"
                }
            })

            selectCity.length = 1
            selectZip.length = 1

            // for(let city in countrySateCityinfo[selectCountry.value][e.target.value]){
                for(let city in countrySateCityinfo[selectState.value]){
                console.log(city);
                selectCity.options[selectCity.options.length] = new Option(city, city)
            }
        }

        // change city
        selectCity.onchange = (e) =>{
            selectZip.disabled = false

            selects.forEach(select => {
                if(select.disabled == true){
                    select.style.cursor = "auto"
                }
                else{
                    select.style.cursor = "pointer"
                }
            })
            
            selectZip.length = 1

            // let zips = countrySateCityinfo[selectCountry.value][selectState.value][e.target.value]
            let zips = countrySateCityinfo[selectState.value][selectCity.value]
            
            for(let i=0; i<zips.length; i++){
                selectZip.options[selectZip.options.length] = new Option(zips[i], zips[i])
            }
        }
}
