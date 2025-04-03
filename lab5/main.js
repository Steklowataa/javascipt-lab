const asyncAdd = async (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!');
  }
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(a + b);
      }, 100);
  });
};


let nieparzyste = [];
let parzyste = [];
for (let i = 1; i <= 100; i += 2) {
  nieparzyste.push(i);
}
for (let i = 0; i <= 100; i += 2) {
  parzyste.push(i);
}


async function sumArray(numbers) {
  return numbers.slice(1).reduce(async (accPromise, num) => {
      const result = await accPromise;
      return asyncAdd(result, num);
  }, Promise.resolve(numbers[0]));
}


async function sumArrayParallel(numbers) {
  const chunkSize = 10;
  const chunks = [];
  for (let i = 0; i < numbers.length; i += chunkSize) {
      chunks.push(numbers.slice(i, i + chunkSize));
  }
  const chunkSums = await Promise.all(
      chunks.map(chunk => sumArray(chunk))
  );
  const finalSum = await sumArray(chunkSums);
  return finalSum;
}

async function addNum() {
  console.time("label");
  const [parz, nieparz] = await Promise.all([
          sumArrayParallel(parzyste),
          sumArrayParallel(nieparzyste)
      ]);
      const total = await asyncAdd(parz, nieparz);
      console.log(`Wynik ${total}`);
      console.timeEnd("label");
}

addNum();