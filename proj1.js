function saveToLocalStorage(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const  category= event.target.category.value;
    const description= event.target.description.value;
    
    const obj = {
        amount,
        description,
        category
    }
    localStorage.setItem(obj.category, JSON.stringify(obj))
    showNewUserOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys  = Object.keys(localStorageObj)

    for(var i =0; i< localstoragekeys.length; i++){
        const key = localstoragekeys[i]
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        showNewUserOnScreen(userDetailsObj)
    }
})

function showNewUserOnScreen(user){
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value ='';
    // console.log(localStorage.getItem(user.emailId))
   if(localStorage.getItem(user.category) !== (null || undefined)){
  removeUserFromScreen(user.category)
  }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user.category}>${user.category}- ${user.amount} - ${user.description}
                            <button onclick=deleteUser('${user.category}')> Delete User </button>
                            <button onclick=editUserDetails('${user.category}','${user.amount}','${user.description}')>Edit User </button>
                         </li>`

 parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User

function editUserDetails(amount, category, description){

    document.getElementById('amount').value = amount;
    document.getElementById('category').value = category;
    document.getElementById('description').value =description;

    deleteUser(category)
 }

// deleteUser('abc@gmail.com')

function deleteUser(category){
    console.log(category)
    localStorage.removeItem(category);
    removeUserFromScreen(category);

}

function removeUserFromScreen(category){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(category);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}





