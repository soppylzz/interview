var str1 = 'str';
var str2 = new String('str');
var str3 = String('str');

console.log(typeof str1); // string
console.log(typeof str2); // object
console.log(typeof str3); // string

console.log(str1 instanceof String); // false
console.log(str2 instanceof String); // true

console.log(str1 == str2); // true
console.log(str1 === str2); // false
console.log(str1 === str3) // true