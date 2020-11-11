

## Heroku Link

https://cs5610assignment2.herokuapp.com/



## Writeup

**What were some challenges you faced while making this app?**

1. How to identify at least 2 state update actions with state management tools. 

We identified the obvious action for passing the size from the home component to the board component, but we took a while to figure out that frequency form can be separated from the board component, in this way, we pass the data from child (frequency) to parent (board).

2. How to display the heatmap.

It was a challenge for us to visualize the heatmap. Based on the fact that the cells change color as they age, we have initiated an array of colors, by looping over the board. As for the cell, we designed a class for it to record its living status and the turns since its last living status. We calculated the turns according to the change of grid in every generation and display it. We offered the user a chance to switch from black-white display to heatmap display with a button.

 

**Given more time, what additional features, functional or design changes would you make?**

Additional features we could consider include:

1. User can set a color them from different color shades for the heatmap;

2. User’s option to save the result of the display when they pause the game;

3.   User’s option to set the size of the cells;

4.   User can go forward and backward in the game.
5.   User can change the initial living rate because 5% is too low for many cases.

 

**What assumptions did you make while working on this assignment?**

1.   100 * 100 is the maximum size we make the board before the game slows down;

2. The random generation of cells stops at the edges.
3. In heatmap display,  the dead cells are set to die for 10 iteration at the beginning.

 

**How long did this assignment take to complete?**

   15 – 17 hours