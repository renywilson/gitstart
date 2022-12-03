console.log('person1: show ticket');
console.log('person2: show ticket');
const wifebringingticket=new Promise((resolve,reject)=>{
    setTimeout(() =>{
        resolve('ticket');
    },3000)
})
const getpopcorn=wifebringingticket.then((t) =>{
    console.log('husband: got the ticket we should go in');
    console.log('wife: no iam hungry');
    return new Promise((resolve,reject) => resolve(`${t} popcorn`));
})
const getbutter=getpopcorn.then((t) =>{
    console.log('husband: got popcorn we should go in');
    console.log('wife:i need butter on mypopcorn');
    return new Promise((resolve,reject) => resolve(`${t} butter`))
});
const getColdDrinks=getbutter.then((t)=> {
    console.log('husband:got butter we should go in');
console.log('wife:i need colddrinks');
return new Promise((resolve,reject) => resolve(`${t} colddrinks`))});
getColdDrinks.then((t) => console.log(t));

console.log('person4: show ticket');
console.log('person5: show ticket');