import fs from "fs";

const depthMeasurements: number[] = fs
  .readFileSync(`${__dirname}/inputAoC.txt`, "utf-8")
  .trim()
  .split("\n")
  .map(Number);

/**
 * Part 1
 */
function increasesReducer(counter: number, current: number, index: number, list: Array<number>) {
  if (current > list?.[index - 1])
    return counter + 1;
  return counter;
}

console.log('Part 1: ' + depthMeasurements.reduce(increasesReducer, 0));

/**
 * Part 2
 */
function increasesWithoutNoise(counter: number, current: number, index: number, list: Array<number>) {
  if (index > 2 && (list[index - 3] + list[index - 2] + list[index - 1]) < (list[index - 2] + list[index - 1] + list[index]))
    return counter+1;
  return counter;
}

console.log('Part 2: ' + depthMeasurements.reduce(increasesWithoutNoise, 0));

