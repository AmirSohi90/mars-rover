const COMMANDS = ["F", "R", "L"];

const AVAILABLE_DIRECTIONS = {
  N: { R: "E", L: "W" },
  E: { R: "S", L: "N" },
  S: { R: "W", L: "E" },
  W: { R: "N", L: "S" }
};

const splitInput = input => input.split(" ").map(Number);

const getGridSize = gridSizeInput => {
  const grid = Boolean(gridSizeInput) ? splitInput(gridSizeInput) : [50, 50];

  const x = Boolean(grid) && grid[0] < 51 && grid[0] >= 0 ? grid[0] : 50;
  const y = Boolean(grid) && grid[1] < 51 && grid[1] >= 0 ? grid[1] : 50;

  return {
    x,
    y
  };
};

const getStartingPosition = (startingPositionInput, startingGridSize) => {
  const roverStartingPosition = Boolean(startingPositionInput)
    ? splitInput(startingPositionInput).slice(0, 2)
    : [0, 0];

  return {
    x:
      Boolean(roverStartingPosition) &&
      roverStartingPosition[0] <= startingGridSize.x &&
      roverStartingPosition[0] >= 0
        ? roverStartingPosition[0]
        : 0,
    y:
      Boolean(roverStartingPosition) &&
      roverStartingPosition[1] <= startingGridSize.y &&
      roverStartingPosition[1] >= 0
        ? roverStartingPosition[1]
        : 0
  };
};

const getStartingDirection = startingDirectionInput => {
  const direction = Boolean(startingDirectionInput)
    ? startingDirectionInput
        .slice(startingDirectionInput.length - 1)
        .toUpperCase()
    : "N";

  return Object.keys(AVAILABLE_DIRECTIONS).includes(direction)
    ? direction
    : "N";
};

const getCommands = commandsInput =>
  Boolean(commandsInput)
    ? commandsInput
        .toUpperCase()
        .split("")
        .filter(command => COMMANDS.includes(command))
    : [];

window.addEventListener("load", () => {
  const gridSizeInput = document.getElementById("grid-size");
  const startingPositionInput = document.getElementById("starting-position");
  const commandsInputTest = document.getElementById("commands");
  const button = document.getElementById("submit-button");
  const roverPosition = document.getElementById("rover-position");

  button.addEventListener("click", () => {
    const gridSize = getGridSize(gridSizeInput.value);

    const dronePosition = getStartingPosition(
      startingPositionInput.value,
      gridSize
    );

    const droneDirection = getStartingDirection(startingPositionInput.value);

    const commandsInput = getCommands(commandsInputTest.value);

    console.log("GRID SIZE", gridSize);
    console.log("DRONE POSITION", dronePosition);
    console.log("DRONE DIRECTION", droneDirection);
    console.log("COMMANDS INPUT", commandsInput);
    console.log("ROVER POSITION", roverPosition);
  });
});

module.exports = {
  splitInput,
  getGridSize,
  getStartingPosition,
  getStartingDirection,
  getCommands
};
