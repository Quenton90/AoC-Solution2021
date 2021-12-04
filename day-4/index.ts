import fs from "fs";

class BingoSlip {
  private allValue: Array<number> = [];
  private unmarked: Array<number> = [];
  private rows: Array<Array<number>> = [];
  private columns: Array<Array<number>> = [];

  addsRow(row: Array<number>) {
    this.allValue.push(...row);
    this.unmarked.push(...row);
    this.rows.push(row);
    if (this.columns.length === 0) {
      for (let i = 0; i < row.length; i++) {
        this.columns.push([row[i]]);
      }
    } else {
      for (let i = 0; i < row.length; i++) {
        this.columns[i].push(row[i]);
      }
    }
  }

  marks(value: number) {
    const indexOf = this.unmarked.indexOf(value);
    if (indexOf != -1) {
      this.unmarked.splice(indexOf, 1);
      if (BingoSlip.checkExist(this.rows, value))
        return true;
      return BingoSlip.checkExist(this.columns, value);
    }
  }

  sum(): number {
    return this.unmarked.reduce((accu, currentValue) => accu + currentValue, 0);
  }

  private static checkExist(line: Array<Array<number>>, value: number) {
    for (let i = 0; i < line.length; i++) {
      const position = line[i].indexOf(value);
      if (position != -1) {
        line[i].splice(position, 1);
        if (line[i].length == 0) {
          return true;
        }
      }
    }
    return false;
  }

  checkComplete() {
    return this.allValue.length === 25 &&
        this.rows.reduce((accu, row) => accu + row.length, 0) == 25 &&
        this.columns.reduce((accu, row) => accu + row.length, 0) == 25;
  }
}

const bingoSlip: [Array<number>, Array<BingoSlip>, boolean] = fs
    .readFileSync(`${__dirname}/inputAoTTest.txt`, "utf-8")
    .trim()
    .split("\n")
    .reduce((accu, values, index) => {
      if (index === 0) {
        accu[0] = values.split(',').map(value => Number.parseInt(value));
      } else {
        const numbArray = values.split(' ').map(value => Number.parseInt(value)).filter(value => !Number.isNaN(value));
        if (numbArray.length == 0) {
          accu[2] = true;
        } else if (accu[2]) {
          accu[2] = false;
          accu[1].push(new BingoSlip());
          accu[1][accu[1].length - 1].addsRow(numbArray);
        } else {
          accu[1][accu[1].length - 1].addsRow(numbArray);
        }
      }
      return accu;
    }, [[] as Array<number>, [] as Array<BingoSlip>, true as boolean]);

const secondPart: [Array<number>, Array<BingoSlip>, boolean] = fs
    .readFileSync(`${__dirname}/inputAoC.txt`, "utf-8")
    .trim()
    .split("\n")
    .reduce((accu, values, index) => {
      if (index === 0) {
        accu[0] = values.split(',').map(value => Number.parseInt(value));
      } else {
        const numbArray = values.split(' ').map(value => Number.parseInt(value)).filter(value => !Number.isNaN(value));
        if (numbArray.length == 0) {
          accu[2] = true;
        } else if (accu[2]) {
          accu[2] = false;
          accu[1].push(new BingoSlip());
          accu[1][accu[1].length - 1].addsRow(numbArray);
        } else {
          accu[1][accu[1].length - 1].addsRow(numbArray);
        }
      }
      return accu;
    }, [[] as Array<number>, [] as Array<BingoSlip>, true as boolean]);

/**
 * Part 1
 */

let bingo: boolean = false;
let sum: number = -1;
let multi: number = -1;
for (let i = 0; i < bingoSlip[0].length; i++) {
  for (let j = 0; j < bingoSlip[1].length; j++) {
    if (bingoSlip[1][j].marks(bingoSlip[0][i])) {
      sum = bingoSlip[1][j].sum();
      multi = bingoSlip[0][i];
      bingo = true;
      break;
    }
  }
  if (bingo)
    break;
}
console.log(sum * multi);

/**
 * Day 2
 */

let found: boolean = false;
let lastSlip: number = -1;
let lastValue: number = -1;
for (let i = 0; i < secondPart[0].length; i++) {
  console.log(secondPart[0][i])
  for (let j = 0; j < secondPart[1].length; j++) {
    if (secondPart[1][j].marks(secondPart[0][i])) {
      if (secondPart[1].length == 1) {
        lastSlip = secondPart[1][j].sum();
        found = true;
        lastValue = secondPart[0][i];
      } else {
        secondPart[1].splice(j, 1);
        j--;
      }
    }
  }
  if (found)
    break;
}

console.log(lastSlip + ' - ' + lastValue + ' - ' + lastSlip * lastValue);