const COMMANDS = ["F", "R", "L"];

const AVAILABLE_DIRECTIONS = {
  N: { R: "E", L: "W", incrementValue: 1 },
  E: { R: "S", L: "N", incrementValue: 1 },
  S: { R: "W", L: "E", incrementValue: -1 },
  W: { R: "N", L: "S", incrementValue: -1 }
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

const getDroneStatus = (coordinates, gridCondition) =>
  coordinates === gridCondition ? "LOST" : "";

const getDroneCoordinate = (coordinates, gridCondition, numericalIncrement) =>
  coordinates === gridCondition
    ? coordinates
    : coordinates + numericalIncrement;

const moveDroneForward = (droneDirection, droneCoordinates, gridSize) => {
  const initialYCoordinate = droneCoordinates.y;
  const initalXCoordinate = droneCoordinates.x;

  switch (droneDirection) {
    case "N":
      return {
        ...droneCoordinates,
        y: getDroneCoordinate(
          initialYCoordinate,
          gridSize.y,
          AVAILABLE_DIRECTIONS.N.incrementValue
        ),
        status: getDroneStatus(initialYCoordinate, gridSize.y)
      };
    case "E":
      return {
        ...droneCoordinates,
        x: getDroneCoordinate(
          initalXCoordinate,
          gridSize.x,
          AVAILABLE_DIRECTIONS.E.incrementValue
        ),
        status: getDroneStatus(initalXCoordinate, gridSize.x)
      };
    case "S":
      return {
        ...droneCoordinates,
        y: getDroneCoordinate(
          initialYCoordinate,
          0,
          AVAILABLE_DIRECTIONS.S.incrementValue
        ),
        status: getDroneStatus(initialYCoordinate, 0)
      };
    case "W":
      return {
        ...droneCoordinates,
        x: getDroneCoordinate(
          initalXCoordinate,
          0,
          AVAILABLE_DIRECTIONS.W.incrementValue
        ),
        status: getDroneStatus(initalXCoordinate, 0)
      };
  }
};

const rotateDrone = (commandInput, currentDirection) =>
  AVAILABLE_DIRECTIONS[currentDirection][commandInput];

const moveDrone = (commands, startingPositon, startingDirection, gridSize) => {
  const dronePosition = commands.reduce(
    (droneCoordinates, command) => {
      if (status === "LOST") return droneCoordinates;

      return command === "F"
        ? moveDroneForward(
            droneCoordinates.direction,
            droneCoordinates,
            gridSize
          )
        : {
            ...droneCoordinates,
            direction: rotateDrone(command, droneCoordinates.direction)
          };
    },
    {
      x: startingPositon.x,
      y: startingPositon.y,
      direction: startingDirection,
      status: ""
    }
  );

  return `${dronePosition.x} ${dronePosition.y} ${dronePosition.direction}${
    Boolean(dronePosition.status) ? ` ${dronePosition.status}` : ""
  }`;
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

    const output = moveDrone(
      commandsInput,
      dronePosition,
      droneDirection,
      gridSize
    );

    roverPosition.innerHTML = `Rover Position: ${output}`;
  });
});

module.exports = {
  splitInput,
  getGridSize,
  getStartingPosition,
  getStartingDirection,
  getCommands,
  getDroneStatus,
  getDroneCoordinate,
  rotateDrone,
  moveDroneForward,
  moveDrone
};
