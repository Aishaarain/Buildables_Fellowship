
let userName = "John";   
let userAge = 30;        
let isStudent = true;    
let hobbies = ["Coding", "Photography", "Badminton"]; 
let profile = { name: userName, age: userAge, student: isStudent };

console.log("Profile:", profile);

let ageString = String(userAge);  
let ageNumber = Number("25");     
let boolValue = Boolean(0);       

console.log("Converted:", ageString, typeof ageString, ageNumber, typeof ageNumber, boolValue);


let x = 10, y = 3;
console.log("Arithmetic:", x + y, x - y, x * y, x / y, x % y, x ** y);
console.log("Comparison:", x > y, x < y, x >= y, x === y, x !== y);


console.log("'5' == 5:", '5' == 5);   
console.log("'5' === 5:", '5' === 5); 

if (userAge >= 18 && isStudent) {
    console.log(`${userName} is an adult student.`);
} else if (userAge >= 18 && !isStudent) {
    console.log(`${userName} is an adult but not a student.`);
} else {
    console.log(`${userName} is a minor.`);
}


console.log("\n--- Loop example ---");

for (let i = 1; i <= 5; i++) {
    console.log("counting for loop:", i);
}


let count = 3;
while (count > 0) {
    console.log("count while loop:", count);
    count--;
}


for (let hobby of hobbies) {
    console.log("my hobbies:", hobby);
}


function calculateFactorial(n) {
    if (n < 0) return "Not defined"; 
    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact *= i;
    }
    return fact;
}

function greet(user, age) {
    return `Hello ${user}, you are ${age} years old!`;
}

console.log("\n--- functions ---");
console.log("factorial of 5:", calculateFactorial(5));
console.log(greet(userName, userAge));


function checkEligibility(name, age) {
    let convertedAge = Number(age);
    if (isNaN(convertedAge)) return "invalid age input!";
    
    if (convertedAge >= 18) {
        return `${name} is eligible to vote `;
    } else {
        return `${name} is NOT eligible to vote `;
    }
}

console.log("\n--- i do a combine logic exercise ---");
console.log(checkEligibility("ali", "19"));
console.log(checkEligibility("aara", "16"));
console.log(checkEligibility("test", "abc"));
