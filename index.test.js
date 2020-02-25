const index = require("./index");

describe("splitInput", () => {
  it("should split the text input and convert them to numbers", () => {
    expect(index.splitInput("50 21")).toEqual([50, 21]);
    expect(index.splitInput("50 21 W")).toEqual([50, 21, NaN]);
  });
});

describe("getGridSize", () => {
  it("should return the grid size", () => {
    expect(index.getGridSize("20 20")).toEqual({ x: 20, y: 20 });
  });

  it("should return the correct grid size if no value was found", () => {
    expect(index.getGridSize()).toEqual({ x: 50, y: 50 });
  });

  it("should change x value to 50", () => {
    expect(index.getGridSize("70 40")).toEqual({ x: 50, y: 40 });
    expect(index.getGridSize("-70 30")).toEqual({ x: 50, y: 30 });
  });

  it("should change y value to 50", () => {
    expect(index.getGridSize("30 70")).toEqual({ x: 30, y: 50 });
    expect(index.getGridSize("40 -30")).toEqual({ x: 40, y: 50 });
  });
});

describe("getStartingPosition", () => {
  it("should return the starting position", () => {
    expect(index.getStartingPosition("10 10 W", { x: 20, y: 20 })).toEqual({
      x: 10,
      y: 10
    });
  });

  it("should return the correct starting position if no value was found", () => {
    expect(index.getStartingPosition(undefined, { x: 10, y: 10 })).toEqual({
      x: 0,
      y: 0
    });
  });

  it("should change x value to 0", () => {
    expect(index.getStartingPosition);
    expect(index.getStartingPosition("20 10 W", { x: 10, y: 10 })).toEqual({
      x: 0,
      y: 10
    });
    expect(index.getStartingPosition("-10 10 W", { x: 10, y: 10 })).toEqual({
      x: 0,
      y: 10
    });
  });

  it("should change y value to 0", () => {
    expect(index.getStartingPosition);
    expect(index.getStartingPosition("10 20 W", { x: 10, y: 10 })).toEqual({
      x: 10,
      y: 0
    });
    expect(index.getStartingPosition("5 -10 W", { x: 10, y: 10 })).toEqual({
      x: 5,
      y: 0
    });
  });
});

describe("getStartingDirection", () => {
  it("should return the correct starting direction", () => {
    expect(index.getStartingDirection("20 20 W")).toBe("W");
    expect(index.getStartingDirection("20 20 e")).toBe("E");
  });

  it("should return the N by default", () => {
    expect(index.getStartingDirection()).toBe("N");
    expect(index.getStartingDirection("20 20 F")).toBe("N");
    expect(index.getStartingDirection("20 20 a")).toBe("N");
  });
});

describe("getCommands", () => {
  it("should return the commands input", () => {
    expect(index.getCommands("RJAIOFJILAF")).toEqual(["R", "F", "L", "F"]);
  });

  it("should return an empty array", () => {
    expect(index.getCommands()).toEqual([]);
  });
});

describe("getDroneStatus", () => {
  it("should return the correct drone status", () => {
    expect(index.getDroneStatus(20, 30)).toBe("");
    expect(index.getDroneStatus(20, 20)).toBe("LOST");
  });
});

describe("getDroneCoordinate", () => {
  it("should return the correct drone coordinate", () => {
    expect(index.getDroneCoordinate(20, 21, 1)).toBe(21);
    expect(index.getDroneCoordinate(20, 20, 1)).toBe(20);
    expect(index.getDroneCoordinate(18, 19, -1)).toBe(17);
    expect(index.getDroneCoordinate(19, 19, -1)).toBe(19);
  });
});

describe("moveDroneForward", () => {
  it("should return the correct position and status", () => {
    expect(
      index.moveDroneForward("N", { x: 2, y: 5 }, { x: 6, y: 6 })
    ).toEqual({ x: 2, y: 6, status: "" });
    expect(
      index.moveDroneForward("N", { x: 2, y: 5 }, { x: 6, y: 5 })
    ).toEqual({ x: 2, y: 5, status: "LOST" });

    expect(
      index.moveDroneForward("E", { x: 2, y: 5 }, { x: 3, y: 5 })
    ).toEqual({ x: 3, y: 5, status: "" });
    expect(
      index.moveDroneForward("E", { x: 2, y: 5 }, { x: 2, y: 5 })
    ).toEqual({ x: 2, y: 5, status: "LOST" });

    expect(
      index.moveDroneForward("S", { x: 2, y: 5 }, { x: 2, y: 6 })
    ).toEqual({ x: 2, y: 4, status: "" });
    expect(
      index.moveDroneForward("S", { x: 2, y: 0 }, { x: 2, y: 6 })
    ).toEqual({ x: 2, y: 0, status: "LOST" });

    expect(
      index.moveDroneForward("W", { x: 2, y: 5 }, { X: 5, Y: 5 })
    ).toEqual({ x: 1, y: 5, status: "" });
    expect(
      index.moveDroneForward("W", { x: 0, y: 5 }, { X: 5, Y: 5 })
    ).toEqual({ x: 0, y: 5, status: "LOST" });
  });
});

describe("rotateDrone", () => {
  it("should get the correct direction when rotating left", () => {
    expect(index.rotateDrone("L", "N")).toBe("W");
    expect(index.rotateDrone("L", "E")).toBe("N");
    expect(index.rotateDrone("L", "S")).toBe("E");
    expect(index.rotateDrone("L", "W")).toBe("S");
  });

  it("should get the correct direction when rotating right", () => {
    expect(index.rotateDrone("R", "N")).toBe("E");
    expect(index.rotateDrone("R", "E")).toBe("S");
    expect(index.rotateDrone("R", "S")).toBe("W");
    expect(index.rotateDrone("R", "W")).toBe("N");
  });
});

describe("moveDrone", () => {
  it("should output the right coordinates and the status if lost", () => {
    expect(
      index.moveDrone(
        ["R", "F", "R", "F", "R", "F", "R", "F"],
        { x: 1, y: 1 },
        "E",
        { x: 5, y: 3 }
      )
    ).toBe("1 1 E");
    expect(
      index.moveDrone(
        ["F", "R", "R", "F", "L", "L", "F", "F", "R", "R", "F", "L", "L"],
        { x: 3, y: 2 },
        "N",
        { x: 50, y: 50 }
      )
    ).toBe("3 3 N");
    expect(
      index.moveDrone(
        ["L", "L", "F", "F", "F", "L", "F", "L", "F", "L"],
        { x: 0, y: 3 },
        "W",
        { x: 50, y: 50 }
      )
    ).toBe("2 4 S");
  });
});
