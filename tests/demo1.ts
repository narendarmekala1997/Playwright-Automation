let message1 :string = "hello";
message1="bye";
console.log(message1);
let age :number=20;
console.log(age);
let isActive:boolean=false;
console.log(isActive);
let numbers1 :number[] =[1,2,4];
console.log(numbers1);
let data : any = "this is data";
data=2;
console.log(data);

function add(a:number,b:number):number
{
    return a+b;
}
add(3,4);
let user:{name:string,age:number} = { name:"Bob",age:34 };
