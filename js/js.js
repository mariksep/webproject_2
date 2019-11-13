function check(form)
{
  if (form.uname.value ==="kokeilu" &&form.psw.value==="123"){
    window.open('./media.html')
  }
  else{
     alert(" the username and pasword you entered dont match " )
  }
}
const modal= document.getElementById('signupModal');
window.onclick= function(event) {
    if (event.target===modal){
      modal.style.display="none";
    }
};

