// I worked by myself on this challenge
 
// Your mission description:
// You need to get through a big wall in order to join the rest of your troops. You have an artillery cannon.
// The wall has a weak spot that you can break through, but you cannot get through the strong parts. To succeed,
// you must get into range of a weak spot, fire on it, then go through.
 
// Pseudocode
// Create an object for your avatar that has a location plus moveXY and attackXY methods.
// Create a weak spot location that can be destroyed if fired at. The wall is located vertically at x coordinate 60.
// The player must not be able to move through the wall and may only move through the weak area after it is destroyed.
// 
// 
 
// Initial Code
var wall_destroyed = false;
function player(startX, startY) {
  this.locationX = startX;
  this.locationY = startY;
  this.moveXY = function(x, y) {
    if (Math.abs(60-x) <= 5 && Math.abs(40-y) <= 5 && wall_destroyed === true) {
      console.log("You move through the wall and join your troops. Congratulations!");
    } else if (x >= 60) {
      console.log("The wall is in the way.");
    } else {
      this.locationX = x;
      this.locationY = y;
    }
  }
  this.attackXY = function(x, y) {
    if (Math.abs(x - this.locationX) > 10 || Math.abs(y - this.locationY) > 10) {
      console.log("You are too far away.")
    } else if (Math.abs(60-x) <= 5 && Math.abs(40-y) <= 5) {
      wall_destroyed = true;
      console.log("You destroyed the weak spot in the wall! Move to x=60 and y=40 to join your troops!")
    }
    else {
      console.log("Your attack has no effect.")
    }
  }
};
// This code is used for testing to see if everything is working properly.
player1 = new player(20, 20);
player1.moveXY(61, 20);
player1.attackXY(64, 36);
player1.attackXY(29, 29);
player1.moveXY(60, 40);
player1.moveXY(55, 35);
player1.attackXY(64, 36);
player1.moveXY(60, 40);
 
 
 
 
// Refactored Code
// I don't see a way to really refactor my code except to collapse some of the statements into single lines
// (i.e. else { console.log("Your attack has no effect.") }) but I think that reduces readability enough to
// not be worth it. I also don't see any significant repetition except for the bit of code I use twice to see
// if the weak spot in the wall is less than 5 coordinates away on each axis.
 
 
// Reflection
// I thought this challenge was fun. I had to look up how object constructors work in Javascript because I had
// forgotten. I also had to look up a lot of the syntax/punctuation. Ruby really spoils you with that stuff!
// I continue to have trouble doing pseudocode in a way that I find useful. I feel like the pseudocode I wrote
// is too general, but if I make it more step by step then I'm just thinking in code and converting the code
// out of code into pseudocode, which seems like a waste of time. I hope to improve on this with time.
// 
// 
// 