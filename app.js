/* =========================================================
   Student Residence Application
   Main Application Script
   ========================================================= */


/*
 IMPORTANT:
 After deploying Apps Script as Web App,
 replace this URL with your deployment URL.

 Example:
 https://script.google.com/macros/s/XXXXXXXXXXXX/exec
*/

const API_URL = "AKfycbxNt7MtBNwhjOjvqaVuPfXq6Ymuv3iix0diX6HWob0ZoOGpJQBWriZya98mAEnj7Xf1Hw";



/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const form = document.getElementById("applicationForm");

const submitButton = document.getElementById("submitBtn");

const messageDiv = document.getElementById("messageDiv");



/* =========================================================
   MOBILE DETECTION
   ========================================================= */

const isMobile =
    /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
    );



/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeForm();

    }
);



function initializeForm(){


    loadMunicipalities();


    setupMobileBehavior();


    setupFileValidation();


}




/* =========================================================
   LOAD MUNICIPALITIES
   ========================================================= */

function loadMunicipalities(){


    const state =
        document.getElementById("state");


    if(!state){
        return;
    }


    fetch(
        `${API_URL}?action=municipalities`
    )

    .then(
        response => response.json()
    )

    .then(
        data => {


            state.innerHTML =
            `
            <option value="">
                إختر البلدية
            </option>
            `;


            data.forEach(
                municipality => {


                    const option =
                    document.createElement(
                        "option"
                    );


                    option.value =
                        municipality;


                    option.textContent =
                        municipality;


                    state.appendChild(option);


                }
            );


        }
    )

    .catch(
        error => {


            console.error(
                "Municipality error:",
                error
            );


            state.innerHTML =
            `
            <option>
            خطأ في تحميل البلديات
            </option>
            `;


        }
    );

}




/* =========================================================
   FORM SUBMISSION
   ========================================================= */


form.addEventListener(
"submit",
async function(event){


    event.preventDefault();



    clearMessage();



    if(!validateForm()){


        showMessage(
            "يرجى التأكد من جميع المعلومات المطلوبة",
            "danger"
        );


        return;

    }



    disableButton();



    try {


        const file =
            document
            .getElementById(
                "residenceFile"
            )
            .files[0];



        const base64 =
            await convertFileToBase64(
                file
            );



        const formData = {


            name:
            document
            .getElementById("name")
            .value.trim(),


            mobile:
            document
            .getElementById("mobile")
            .value.trim(),


            email:
            document
            .getElementById("email")
            .value.trim(),


            dob:
            document
            .getElementById("dob")
            .value,


            gender:
            document
            .getElementById("gender")
            .value,


            state:
            document
            .getElementById("state")
            .value,


            bac:
            document
            .getElementById("bac")
            .value.trim(),


            year:
            document
            .getElementById("year")
            .value.trim(),



            residenceFile:{


                name:file.name,


                mimeType:file.type,


                data:base64


            },


            timestamp:
            new Date()
            .toISOString()


        };



        const response =
            await fetch(
                API_URL,
                {

                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify(
                        formData
                    )

                }
            );



        const result =
            await response.json();



        if(result.status==="success"){


            showMessage(
                result.message ||
                "تم تسجيل الطلب بنجاح",
                "success"
            );


            form.reset();



        }
        else{


            showMessage(
                result.message ||
                "حدث خطأ أثناء التسجيل",
                "danger"
            );


        }



    }

    catch(error){


        console.error(
            error
        );


        showMessage(
            "خطأ في الاتصال بالخادم",
            "danger"
        );


    }


    finally{


        enableButton();


    }


});





/* =========================================================
   FILE CONVERSION
   ========================================================= */


function convertFileToBase64(file){


    return new Promise(
        (resolve,reject)=>{


            const reader =
                new FileReader();



            reader.onload =
            ()=>{


                resolve(
                    reader.result
                );


            };



            reader.onerror =
            reject;



            reader.readAsDataURL(
                file
            );


        }
    );


}



/* =========================================================
   FILE VALIDATION
   ========================================================= */


function setupFileValidation(){


    const fileInput =
    document.getElementById(
        "residenceFile"
    );


    if(!fileInput)
        return;



    fileInput.addEventListener(
        "change",
        ()=>{


            const file =
            fileInput.files[0];



            if(!file)
                return;



            if(
                file.type !==
                "application/pdf"
            ){


                fileInput.value="";


                showMessage(
                "يسمح فقط بملفات PDF",
                "danger"
                );


                return;

            }



            if(
                file.size >
                5*1024*1024
            ){


                fileInput.value="";


                showMessage(
                "حجم الملف يجب أن لا يتجاوز 5MB",
                "danger"
                );


            }


        }
    );


}



/* =========================================================
   VALIDATION
   ========================================================= */


function validateForm(){


    const required =
    document.querySelectorAll(
        "[required]"
    );


    let valid=true;



    required.forEach(
        field=>{


            if(
                !field.value.trim()
            ){


                field.classList.add(
                    "is-invalid"
                );


                valid=false;


            }
            else{


                field.classList.remove(
                    "is-invalid"
                );


                field.classList.add(
                    "is-valid"
                );


            }


        }
    );


    return valid;


}




/* =========================================================
   BUTTON CONTROL
   ========================================================= */


function disableButton(){


    submitButton.disabled=true;


    submitButton.innerHTML =
    `
    <span class="spinner-border spinner-border-sm"></span>
    جاري الإرسال...
    `;


}



function enableButton(){


    submitButton.disabled=false;


    submitButton.innerHTML =
    `
    <i class="bi bi-send me-2"></i>
    تأكيد الطلب
    `;


}



/* =========================================================
   MESSAGES
   ========================================================= */


function showMessage(
    message,
    type
){


    const css =
    type==="success"
    ?
    "alert-success"
    :
    "alert-danger";



    messageDiv.innerHTML =
    `
    <div class="alert ${css}">
        ${message}
    </div>
    `;


}



function clearMessage(){

    messageDiv.innerHTML="";

}



/* =========================================================
   MOBILE IMPROVEMENTS
   ========================================================= */


function setupMobileBehavior(){


    if(!isMobile)
        return;



    document
    .querySelectorAll(
        "input,select"
    )
    .forEach(
        element=>{


            element.addEventListener(
                "focus",
                ()=>{
                    element.style.fontSize="16px";
                }
            );


        }
    );


}
