/* =========================================================
   Form Validation Module
   Student Residence Application
   ========================================================= */


/* =========================================================
   VALIDATE ALL FORM FIELDS
   ========================================================= */

function validateAllFields() {


    let isValid = true;


    const fields = [

        "name",
        "mobile",
        "email",
        "dob",
        "gender",
        "state",
        "bac",
        "year",
        "residenceFile"

    ];



    fields.forEach(
        fieldId => {


            const field =
            document.getElementById(fieldId);



            if(field && !validateField(field)) {

                isValid = false;

            }


        }
    );


    return isValid;


}




/* =========================================================
   SINGLE FIELD VALIDATION
   ========================================================= */

function validateField(field) {


    let valid = true;



    const value =
    field.value.trim();




    /*
      Required fields
    */

    if(
        field.hasAttribute("required")
        &&
        value === ""
    ){

        valid = false;

    }




    /*
      Email
    */

    if(
        field.id === "email"
        &&
        value
    ){

        valid =
        validateEmail(value);

    }




    /*
      Mobile Algeria
      Example:
      0555123456
    */

    if(
        field.id === "mobile"
        &&
        value
    ){

        valid =
        validateMobile(value);

    }




    /*
      BAC registration number
      8 digits
    */

    if(
        field.id === "bac"
        &&
        value
    ){

        valid =
        /^\d{8}$/.test(value);

    }




    /*
      Bac year
      4 digits
      Example:
      2026
    */

    if(
        field.id === "year"
        &&
        value
    ){

        valid =
        validateYear(value);

    }




    /*
      PDF file
    */

    if(
        field.id === "residenceFile"
    ){

        valid =
        validatePDF(field);

    }





    setFieldStatus(
        field,
        valid
    );


    return valid;


}




/* =========================================================
   EMAIL VALIDATION
   ========================================================= */

function validateEmail(email){


    const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return regex.test(
        email.toLowerCase()
    );


}





/* =========================================================
   ALGERIAN MOBILE VALIDATION
   ========================================================= */

function validateMobile(number){


    const regex =
    /^(05|06|07)[0-9]{8}$/;


    return regex.test(number);


}





/* =========================================================
   YEAR VALIDATION
   FIX FOR YOUR PREVIOUS ISSUE
   ========================================================= */


function validateYear(year){


    /*
       Must be exactly 4 numbers
       Between 1900 and current year
    */


    if(!/^\d{4}$/.test(year)){

        return false;

    }



    const numericYear =
    parseInt(year);



    const currentYear =
    new Date()
    .getFullYear();



    return (

        numericYear >= 1900
        &&
        numericYear <= currentYear

    );


}





/* =========================================================
   PDF VALIDATION
   ========================================================= */

function validatePDF(input){


    if(
        !input.files
        ||
        input.files.length===0
    ){

        return false;

    }



    const file =
    input.files[0];



    const maxSize =
    5 * 1024 * 1024;



    if(
        file.type !==
        "application/pdf"
    ){

        return false;

    }



    if(
        file.size >
        maxSize
    ){

        return false;

    }



    return true;


}





/* =========================================================
   VISUAL FIELD STATUS
   ========================================================= */


function setFieldStatus(
    field,
    valid
){


    if(valid){


        field.classList.remove(
            "is-invalid"
        );


        field.classList.add(
            "is-valid"
        );


    }

    else{


        field.classList.remove(
            "is-valid"
        );


        field.classList.add(
            "is-invalid"
        );


    }


}





/* =========================================================
   LIVE VALIDATION
   ========================================================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


    document
    .querySelectorAll(
        "input,select"
    )
    .forEach(
        field=>{


            field.addEventListener(
                "blur",
                ()=>{

                    validateField(field);

                }
            );



            field.addEventListener(
                "input",
                ()=>{


                    if(
                        field.classList.contains(
                            "is-invalid"
                        )
                    ){

                        validateField(field);

                    }


                }
            );


        }
    );


});
