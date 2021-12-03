import fs from "fs";

type Command = [string, number];

const instructions: Array<Command> = fs
  .readFileSync(`${__dirname}/inputAoC.txt`, "utf-8")
  .trim()
  .split("\n")
  .map((e) => e.split(" "))
  .map((e) => [e[0], Number(e[1])]);

/**
 * Day 1
 */
console.log(
    instructions.filter(([direction, _]): boolean => direction === 'forward')
        .reduce((cu, [_, counter]) => cu + counter, 0) *
    instructions.filter(([direction, _]): boolean => direction !== 'forward')
        .reduce((cu, [direction, counter]) => (direction === 'up' ? cu - counter : cu + counter), 0));

/**
 * Day 2
 */
console.log(instructions.reduce(([depth, forward, aim], [direction, steps]) => {
  switch (direction) {
    case 'up': return [depth, forward, aim - steps];
    case 'down': return [depth, forward, aim + steps];
    default: return [depth + (aim * steps), forward + steps, aim];
  }
}, [0, 0, 0]).slice(0, 2).reduce((count, cu) => count * cu, 1));
