function saveToLocalStorage(event)

{
    event.preventDefault();
    const name=event.target.username.value;
    const email=event.target.emailid.value;
    const phonenumber=event.target.phonenumber.value;
    const obj={
        name,  
        email,
        phonenumber

    };

localStorage.setItem(obj.email,JSON.stringify(obj));
//const obj1=JSON.parse(localStorage.getItem());
//console.log(obj1);
shownNewUserOnScreen(obj);
}
function shownNewUserOnScreen(user)
{
    const parentNode=document.getElementById('listOfUsers');
    const childHTML=`<li>${user.name}- ${user.email}<li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}
