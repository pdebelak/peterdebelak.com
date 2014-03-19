// I worked on this challenge by myself

// For each mission, write the title as a comment. (Shown here). Also include pseudocode as a comment. 
// Note: to make commenting easier, you can highlight the section you want to comment and hold 
// command + / This will comment the line. 

// RESCUE MISSION

// Move down 2, move right 1, move up 2, move right 2, move down, attack!
this.moveDown();
this.moveDown();
this.moveRight();
this.moveUp();
this.moveUp();
this.moveRight();
this.moveRight();
this.moveDown();
this.attackNearbyEnemy();

// GRAB THE MUSHROOM

//Move up 1, move right 1 (grab the mushroom), move left 1, move up 1, attack!
this.moveUp();
this.moveRight();
this.moveLeft();
this.moveUp();
this.attackNearbyEnemy();

// DRINK ME

// attack, move right 1, move down 1, move up 1, move right 1, attack!
this.attackNearbyEnemy();
this.moveRight();
this.moveDown();
this.moveUp();
this.moveRight();
this.attackNearbyEnemy();

// TAUNT THE GUARDS

// move right 1, break down door, move right 1, get guard's attention, move left 2, 
// ask Phoebe to attack, move right 1, get Phoebe to follow, move right 2, move up 1,
// move right 1, move down 1, move right 1, get guards' attention, move left 1,
// ask Phoebe to attack twice, get Phoebe to follow, move right 1, move up 1, move right 1
this.moveRight();
this.bustDownDoor();
this.moveRight();
this.say("Hey there!");
this.moveLeft();
this.moveLeft();
this.say("Attack!");
this.moveRight();
this.say("Follow me.");
this.moveRight();
this.moveRight();
this.moveUp();
this.moveRight();
this.moveDown();
this.moveRight();
this.say("Hey there!");
this.moveLeft();
this.say("Attack");
this.say("Attack");
this.say("Follow me.")
this.moveRight();
this.moveUp();
this.moveRight();

// IT'S A TRAP!

// move down 2, get Ogre's attention, move up 2, ask archers to attack
this.moveDown();
this.moveDown();
this.say("Hey there!");
this.moveUp();
this.moveUp();
this.say("Attack");

// BREAK THE PRISON

// Friends: Phoebe, Gordon, Lucas, Marcus, Robert, William
// Foes: Brack, Gort, Grul'thock, Krogg
if(name === "William")
  return true;
if(name === "Krogg")
  return false;
if(name === "Phoebe")
  return true;
if(name === "Gordon")
  return true;
if(name === "Lucas")
  return true;
if(name === "Marcus")
  return true;
if(name === "Robert")
  return true;

// TAUNT

// just say anything 4 times
this.say("Hey!");
this.say("You!");
this.say("That's right!");
this.say("The big ogre");

// COWARDLY TAUNT

// move out to where the ogres can hear you, say "Hey", and then move back to the safe zone
this.moveXY(50, 16);
this.moveXY(63, 20);
this.moveXY(70, 10);
this.say("I can lure them in here.");
this.moveXY(50, 16);
this.say("Hey!");
this.moveXY(70, 10);

// COMMANDING FOLLOWERS

// move to army, greet them, get them to follow, move towards the ogres, say attack, move away
this.moveXY(49, 66);
this.moveXY(60, 63);
this.moveXY(75, 63);
this.say("Hail, friends!");
this.say("Follow me!");
this.moveXY(60, 45);
this.say("Attack");
this.moveXY(75, 63);

// MOBILE ARTILLERY

// move a bit east and fire at the coordinates of the group of ogres to the right. Fire again 
// slightly closer to kill the big ogre.
// move a little northwet and first at the final group of ogres. Fire again slightly closer to kill
// the big ogre.
this.moveXY(30,26);
this.attackXY(46, 5);
this.moveXY(63, 55);
this.attackXY(67, 55);
this.attackXY(67, 45);
this.moveXY(52, 39);
this.attackXY(50, 68);
this.attackXY(50, 58);

// Questions:
// What is 'this' referring to? - When you create an object in Javascript and add methods you need a way to
// refer to 'whatever object is performing the method.' That's what 'this' means.
// What does the () do in Javascript - Those parentheses are where you put your function's parameters. Using
// empty parentheses means that the function doesn't require input.
// What is the point of semicolons? - Semicolons mark the end of a programming thought in Javascript.

// Reflection:
// Write your reflection here.
// This challenge was infuriating! I spent almost 10 minutes waiting for each game level to load and I felt
// that the way the game worked was very unintuitive as it would load and do something every time I typed
// in a new line even if I didn't want the game to. This hugely slowed down the process. I also don't 
// understand what programming concepts I was supposed to have learned. I would definitely not recommend 
// Code Combat to a friend trying to learn programming.