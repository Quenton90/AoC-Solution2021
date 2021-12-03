import fs from "fs";

const binary: number[][] = fs
    .readFileSync(`${__dirname}/inputAoC.txt`, "utf-8")
    .trim()
    .split("\n")
    .map(info => info.split("").filter(info => info === '0' || info === '1').map(info => Number.parseInt(info)));

/**
 * Day 1
 */
const test = binary.reduce((bit, measure) => {
  for (let i = 0; i < measure.length; i++){
    bit[i] = (bit[i] ? bit[i] : 0) + (measure[i] === 1 ? 1 : -1);
  }
  return bit;
}, []).map(counter => counter > 0).reverse()
    .reduce((accu, current, index) => {
      return [accu[0] + (current ? (Math.pow(2, index)) : 0), accu[1] + (!current ? (Math.pow(2, index)) : 0)];
    }, [0, 0]);
console.log(test[0] * test[1])

/**
 * Day 2
 */

let oxy = binary;
let cotwo = binary;

function counting(list: Array<Array<number>>, position: number): number {
  return list.reduce((accu, info) => info[position] ? accu + 1 : accu - 1, 0);
}

function filtering(filter: 0 | 1, position: number) {
  return (info: Array<number>) => {
    return info[position] === filter
  };
}

function air(list: number[][], bigger: boolean) {
  const length = list[0].length;
  for (let i = 0; i < length; i++) {
    const counter = counting(list, i);
    list = list.filter(filtering(bigger ? (counter >= 0 ? 1 : 0) : (counter >= 0 ? 0 : 1), i));
    if (list.length === 1)
      break;
  }
  return list;
}

function binTwoDec(list: Array<number>):number {
  return list.reverse().reduce((accu, current, index) => {
    return accu + (current ? Math.pow(2, index) : 0);
  }, 0)
}

const oxyNumber = binTwoDec(air(oxy, true)[0]);
const coTwoNumber = binTwoDec(air(cotwo, false)[0]);
console.log(oxyNumber * coTwoNumber);