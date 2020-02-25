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
