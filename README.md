## Backseat Driver

A voice command driven 3D interactive simulation

- Screenshot of gameplay here

A live version of this app is available at https://backseat-driver-dbc21.web.app/

## Gameplay Mechanics

Backseat driver is a 3D driving simulation in which the player's movement is controlled
not by keyboard commands, but by voice commands. The player's goal is to navigate through a
3D representation of a city to a predetermined area. The voice recognition model accepts 
several concise commands [stop, go, left, right, up, down] to traverse the world. Course completion 
is timed and saved when player has reached the goal.

## Technologies

Backseat Driver is developed with Node.JS, React-three-fiber for 3D world rendering, Cannon.JS for a physics engine, TenserFlow.JS for voice recognition
Firebase as a database and deployment provider, React for modular front end rendering, Redux for application and game state management.

--insert picture of all technologies web--

## How to Play

Use the following voice commands to move your car

Go: Gas (set to first gear)
Stop: Stop
Right: Turn 90 degrees right
Left: Turn 90 degrees left
Up: Speed up
Down: Slow down

Make it to the yellow goal zone

## Installation

To install Backseat Driver, you will need to be running Node.JS with NPM
Install all dependencies with

### `npm install`

Then start the app with the command

### `npm start`

The game will be available at http://localhost:8080

## Credits

Ryan Andeerson - Synthwave
kingman257 - McClaren Car 3D Model
