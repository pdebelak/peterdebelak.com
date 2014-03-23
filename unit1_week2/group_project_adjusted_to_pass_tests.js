//Find sum, mean, and median of the number set:
 
//Create sum_array method
  // Takes an array of numbers and returns the sum
function sum(user_nums) {
  var runningSum = 0;
  for (var i = 0; i < user_nums.length; i++) {
    runningSum = runningSum + user_nums[i];
  }
  return runningSum;
}
 
//Create mean_of_array
function mean (user_nums) {
  var runningSum = 0;
  for (var i = 0; i < user_nums.length; i++) {
    runningSum = runningSum + user_nums[i];
  }
  var mean=runningSum/user_nums.length;
  return mean;
}
 
//Create median_of_array
function median(user_nums){
  var array = user_nums.sort(function(a,b){return a - b;});
  function isEven (number){
    if (number % 2 == 0) {
      return true;
    }
    else if (number % 2 !==0) {
      return false;
    }
  }
  if (isEven(array.length)) {
  var median = ((array[array.length/2-1]) + (array[array.length/2]))/2;
  }
  else {
  median = array[array.length/2 - .5];
  }
  return median;
}
 
//Output sum, mean, and median of the number set
/*sum_array();
mean_of_array();
median_of_array();
*/ 
/* User stories:
As a user, I want to be able to type in a list of numbers (as many as I want) 
and find the sum, mean, and median of that list.
*/

// __________________________________________
// Tests:  Do not alter code below this line.
 
 
oddLengthArray  = [1, 2, 3, 4, 5, 5, 7]
evenLengthArray = [4, 4, 5, 5, 6, 6, 6, 7]
 
 
function assert(test, message, test_number) {
  if (!test) {
    console.log(test_number + "false");
    throw "ERROR: " + message;
  }
  console.log(test_number + "true");
  return true;
}
 
// tests for sum
assert(
  (sum instanceof Function),
  "sum should be a Function.",
  "1. "
)
 
assert(
  sum(oddLengthArray) === 27,
  "sum should return the sum of all elements in an array with an odd length.",
  "2. "
)
 
assert(
  sum(evenLengthArray) === 43,
  "sum should return the sum of all elements in an array with an even length.",
  "3. "
)
 
// tests for mean
assert(
  (mean instanceof Function),
  "mean should be a Function.",
  "4. "
)
 
assert(
  mean(oddLengthArray) === 3.857142857142857,
  "mean should return the average of all elements in an array with an odd length.",
  "5. "
)
 
assert(
  mean(evenLengthArray) === 5.375,
  "mean should return the average of all elements in an array with an even length.",
  "6. "
)
 
// tests for median
assert(
  (median instanceof Function),
  "median should be a Function.",
  "7. "
)
 
assert(
  median(oddLengthArray) === 4,
  "median should return the median value of all elements in an array with an odd length.",
  "8. "
)
 
assert(
  median(evenLengthArray) === 5.5,
  "median should return the median value of all elements in an array with an even length.",
  "9. "
)