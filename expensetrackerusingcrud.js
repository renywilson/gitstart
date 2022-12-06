document.addEventListener('DOMContentLoaded',() =>{
    axios.get("https://crudcrud.com/api/8dfc6c20de2c4410bb3ece8b5bda30ee/details")
    .then((res) =>{
        console.log(res.data);
        for(var i=0;i<res.data.length;i++){
            createlist(res.data[i]);
        }
    }).catch((err) =>{
        alert('something went wrong');
        console.log(err);
    })
})
var form=document.querySelector('#myform');
var list=document.querySelector('.expense_details');
form.addEventListener('submit',onsubmit);
function onsubmit(e){
e.preventDefault();
const expensesum=e.target.expensesum.value;
const descript=e.target.description.value;
const category=e.target.category.value;
const obj={
    expensesum,
    descript,
    category
}
axios.post("https://crudcrud.com/api/8dfc6c20de2c4410bb3ece8b5bda30ee/details",obj)
.then((res) =>{
    createlist(res.data);
    console.log(res.data);
}).catch((err)=>{alert("something went wrong");
 console.log(err);})

}
function createlist(objun){
  var li=document.createElement('li');
  li.className='expensedtls';
  li.appendChild(document.createTextNode(`${objun.expensesum}  `));
  li.appendChild(document.createTextNode(`${objun.descript}   `));
  li.appendChild(document.createTextNode(`${objun.category}   `));
  var editbutton=document.createElement('button');
  editbutton.className='edtbtn';
  editbutton.appendChild(document.createTextNode('Edit Expense'));
  li.appendChild(editbutton);
  editbutton.addEventListener('click',() =>{
    document.getElementById('expensesum').value=objun.expensesum;
    document.getElementById('description').value=objun.descript;
    document.getElementById('category').value=objun.category;
  
    axios.delete(`https://crudcrud.com/api/8dfc6c20de2c4410bb3ece8b5bda30ee/details/${objun._id}`)
    .then(()=>{
        li.remove();
    }).catch((err)=>{
        alert("something went wrong");
console.log(err)
    })
  })
  var deletebutton=document.createElement('button');
  deletebutton.appendChild(document.createTextNode('Delete Expense'));
 li.appendChild(deletebutton);
  deletebutton.addEventListener('click',() =>{
    if(confirm('Are you sure you want to delete?')){
  axios.delete(`https://crudcrud.com/api/8dfc6c20de2c4410bb3ece8b5bda30ee/details/${objun._id}`)
    .then(()=>{
        li.remove();
    }).catch((err)=>{
        alert("something went wrong");
      console.log(err)
    })
}
  })
  list.appendChild(li);
  document.getElementById('expensesum').value='';
   document.getElementById('description').value='';
   document.getElementById('category').value='';

}