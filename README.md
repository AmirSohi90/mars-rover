# mars-rover

# Set up

The pdf document said to not have crazy steps to run code so hopefully the below does not count as that
<br>

I used the latest version of node for this
<br><br>
In CLI install depencies with npm/yarn
<br><br>
To start type in CLI npm run start or yarn start
<br><br>
To run tests type in CLI npm run start or yarn start
<br><br>
Please note that I didn't include webpack/babel in this so it's best to run via Chrome

# Comments on Code

I believe I have finished the task that is required. I made the assumption that if the user doesn't input the grid size the default is [50, 50]. The same for the starting position and direction. If there is no input the default starting position is [0, 0] and the direction they're facing is N.<br><br>
I also took into consideration if the user inputs a value too low or high for the grid size and starting position.
<br><br>
All functions that I wrote are tested.
<br><br>
The reason for putting in the available directions in an object is that if it ever needs updating with directions like NE, NW, SE and SW the object can be updated with the new directions it'd face when rotating. I also put in the increment value just in case that would be changed in the future.
<br><br>
I believe the rest is readable code to a JS developer however any feedback would be appreciated.
