/// <reference path="utility-functions.ts" />

const num = Utility.maxBooksAllowed(20);
console.log(num);

import util = Utility.Fees;

let fee = util.calculateLateFee(10);
console.log(`Fee: ${fee}`);
