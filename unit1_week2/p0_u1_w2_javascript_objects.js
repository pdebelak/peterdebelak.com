// I worked by myself on this challenge.
 
 
 
 
// Pseudocode
// Make variable secretNumber and set it equal to a number.
// The number that secretNumber is equal to should be 7.
// Make variable password and set it to a string.
// The string that password is equal to is "just open the door".
// Make variable allowedIn and set it to true or false.
// allowedIn should be false.
// Make variable members and make it an array.
// The first value in members should be John.
// The fourth value in members should be Mary.
// Make regular expression and store it in codeVerifier.
// codeVerifier should look for words starting with a, b, or c, followed by
//    at least one character, then k, then two characters, and ending with a y.
 
 
// __________________________________________
// Write your code below.
var secretNumber = 7;
var password = "just open the door";
var allowedIn = false;
var members = ["John", "Cats!", "More cats!", "Mary"];
var codeVerifier = /^[abc]..*k..y$/;
 
 
 
 
// __________________________________________
// Refactored Code: Include a refactored version (or justification of your original code) here. 
var secretNumber = 7;
var password = "just open the door";
var allowedIn = false;
var members = ["John", "Cats!", "More cats!", "Mary"];
var codeVerifier = /^[abc].+k..y$/;
// I believe my code is as concise as I can make it. Each variable is named as the tests instructed
// and the code seems readable (or as readable as regex can get). After initally writing this I realized 
// that I could remove one character from codeVerifier by changing ..* to .+ so I did so.
 
 
// __________________________________________
// Reflection: Use the reflection guidelines to write a reflection here. 
// I found test driven development very satisfying. I can sometimes get overwhelmed with all the 
// things I have to do and only being able to focus on passing one test at a time is very relaxing.
// I had to do a fair amount of Googling to do the regular expression part, but I am becoming more
// comfortable with it now. I found myself Googling specific things (like the symbol for start and
// end of the line) rather than needing to read about how regex works in general. That is progress.
// 
 
 
// __________________________________________
// Driver Code:  Do not alter code below this line.
 
function assert(test, message, test_number) {
  if (!test) {
    console.log(test_number + "false");
    throw "ERROR: " + message;
  }
  console.log(test_number + "true");
  return true;
}
 
assert(
  (typeof secretNumber === 'number'),
  "The value of secretNumber should be a number.",
  "1. "
)
 
assert(
  secretNumber === 7,
  "The value of secretNumber should be 7.",
  "2. "
)
 
assert(
  typeof password === 'string',
  "The value of password should be a string.",
  "3. "
)
 
assert(
  password === "just open the door",
  "The value of password should be 'just open the door'.",
  "4. "
)
 
assert(
  typeof allowedIn === 'boolean',
  "The value of allowedIn should be a boolean.",
  "5. "
)
 
assert(
  allowedIn === false,
  "The value of allowedIn should be false.",
  "6. "
)
 
assert(
  members instanceof Array,
  "The value of members should be an array",
  "7. "
)
 
assert(
  members[0] === "John",
  "The first element in the value of members should be 'John'.",
  "8. "
)
 
assert(
  members[3] === "Mary",
  "The fourth element in the value of members should be 'Mary'.",
  "9. "
)
 
assert(
  codeVerifier instanceof RegExp,
  "The value of codeVerifier should be a regular expression.",
  "10. "
)
 
assert(
  codeVerifier.test("axxkxxy") === true
  && codeVerifier.test("bxxkxxy") === true
  && codeVerifier.test("cxxkxxy") === true
  && codeVerifier.test("cxxkxx") === false
  && codeVerifier.test("xxkxxy") === false
  && codeVerifier.test("wcxxkxxy") === false
  && codeVerifier.test("cxxkxxyw") === false
  && codeVerifier.test("bkaay") === false
  && codeVerifier.test("raakaay") === false
  && codeVerifier.test("aakay") === false
  && codeVerifier.test("wcxxvxxy") === false,
  "The value of codeVerifier should detect whether or not a string begins with an 'a','b', or 'c', followed by at least one of any character, followed by a 'k', followed by two of any character, followed by a 'y' that ends the string.",
  "11. "
)