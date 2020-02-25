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

module.exports = {
  splitInput,
  getGridSize,
  getStartingPosition,
  getStartingDirection,
  getCommands
};
