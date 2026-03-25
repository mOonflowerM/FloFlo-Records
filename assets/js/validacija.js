
$(document).ready(function(){

 let selectElement = document.querySelector("#ddlSubject");
 if(selectElement){
    displaySelect(selectElement);
 }

//newsletter na index.html
let newsLetterForm=document.querySelector("#formNewsletter");
let regexEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if(newsLetterForm){
    newsLetterForm.addEventListener('submit',function(e){
    e.preventDefault();
    
    let email=document.querySelector("#emailform");
    let emailError=document.querySelector("#emailError");
    emailError.textContent="";
    let isEmailValid=checkInput(email,regexEmail,emailError,"Invalid email format.");



    if (isEmailValid) {
        let newsLetter = document.querySelector("#successNewsLetter");
        newsLetter.textContent = "Your message has been sent. We look forward to hearing more from you!";
        newsLetterForm.reset();
        email.classList.remove('is-valid');
    }
})

 }



//  contact.html forma
let regexFullName=/^[A-Z][a-z]{2,10}(\s[A-Z][a-z]{2,10})+$/;
let regexEmail2=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let contactForm=document.querySelector("#formaColorVal");
if(contactForm){
    contactForm.addEventListener('submit',function(e){
        e.preventDefault();
        let mistakes=0;
        let nameForm=document.getElementById("nameForm");
        let nameError=document.querySelector("#nameError");
      let isNameValid=checkInput(nameForm,regexFullName,nameError,"Full name is not in the right format");
        let emailFormContact=document.getElementById("emailFormContact");
        let emailErrorContact=document.getElementById("emailErrorContact");
    let emailFromContactIsValid = checkInput(emailForm, regexEmail2, emailErrorContact, "Email is not in the right format.");


    let selectForm = document.getElementById("ddlSubject");
    let selectError = document.getElementById("ddlSubjectError");
    let selected = 0;
        if (selectForm.value !== "0") {
                selected=1;
                selectForm.classList.remove("is-invalid");
                selectForm.classList.add("is-valid");
                selectError.textContent = "";
            } else {
            selected=0;
                selectForm.classList.add("is-invalid");
                selectError.textContent = "Pick a subject.";
            }

    let chkBox=document.querySelector('#checkRules');
    let chkError=document.querySelector("#chkError");
    let checkedBox=0;
    if(chkBox.checked){
        checkedBox=1;
        chkError.textContent='';
    }else{
        checkedBox=0;
        chkError.textContent='You must accept the terms!';
    }
    let sendText=document.querySelector("#sendText");
    let textErr=document.querySelector("#textErr");
    let textCheck=0;
    if(sendText.value.trim().length<15){
        textErr.textContent="A message needs to be longer than 15 characters";
        textCheck=0;
        sendText.classList.add("is-invalid");
        sendText.classList.remove("is-valid");
    }else {
    textCheck=1;
    sendText.classList.remove("is-invalid");
    sendText.classList.add("is-valid");
    textErr.textContent = "";
}


    if(isNameValid && emailFromContactIsValid && checkedBox && selected && textCheck){
        let succesForm=document.getElementById("successContactForm");
        if(succesForm) {
              succesForm.textContent="You have succesfuly sent a message!";
               
            }
       contactForm.reset();
    nameForm.classList.remove('is-valid');
    emailForm.classList.remove('is-valid');
    selectForm.classList.remove('is-valid');
    sendText.classList.remove('is-valid');
    }


    })
}

})




function checkInput(input,regEx,errElement,errMess){
    let val=input.value;
    if(val==''){
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        errElement.textContent = "This field cannot be empty!"; 
        return false;
    }
    if(regEx.test(val)){
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        errElement.textContent = ""; 
        return true;
    }else{ 
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        errElement.textContent = errMess; 
        return false;
    }
}



function displaySelect(mySelect) {
let subjects = [
    { val: "0", text: "Choose subject..." },
    { val: "1", text: "Vinyl Inquiry" },
    { val: "2", text: "Shipping & Returns" },
    { val: "3", text: "Sell your Records" },
    { val: "4", text: "Other" }
];

   
    for (let obj of subjects) {
       let op=document.createElement('option');
       op.setAttribute('value',obj.val);
       op.textContent=obj.text;
       mySelect.appendChild(op);
    }

    
}