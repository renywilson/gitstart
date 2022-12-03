console.log('person1: show ticket');
console.log('person2: show ticket');
const premovie= async () => {
const wifebringingticket=new Promise((resolve,reject)=>{
    setTimeout(() =>{
        resolve('ticket');
    },3000)
})      
const getpopcorn=new Promise((resolve,reject)=>resolve('popcorn'))
const getbutter=new Promise((resolve,reject)=> resolve('butter'))
const getColddrinks=new Promise((resolve,reject) =>resolve('colddrinks'))
let ticket= await wifebringingticket;
    console.log(`husband: got the ${ticket} we should go in`);
    console.log('wife: no iam hungry');
let popcorn=await getpopcorn;
console.log(`husband: got ${popcorn} we should go in`);
    console.log('wife:i need butter on mypopcorn');
let butter=await getbutter;
    console.log(`husband: got ${butter} we should go in`);
let colddrinks=await getColddrinks;

console.log(`husband:got ${colddrinks} we should go in`);
console.log('wife:yes')
return ticket;                                                                   
}    
premovie().then((m) =>{console.log(`person3: show ${m}`)});
console.log('person4: show ticket');
console.log('person5: show ticket');
