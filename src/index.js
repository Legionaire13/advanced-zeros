module.exports = function getZerosCount(number, base) {
  // Раскладываем base на простые множители, сохраняем в массив factorizedBase
  let factorizedBase = [];
  let objectPower = {};
  let zeroesCount;

  function getAllFactorsFor(base) {

    for (let i = 2; i <= base; i++) {

      while ((base % i) === 0) {
        factorizedBase.push(i);
        base /= i;
      }

    }

    return factorizedBase;
  }

  getAllFactorsFor(base);

  // если у всех множителей степень = 1, то вычисляем больший множитель
  //  проверяем наличие степеней, результат сохраняем в объект
  function getPow(arr) {

    for (let i = 0; i < arr.length; i++) {
      let num = arr[i];
      objectPower[num] = objectPower[num] ? objectPower[num] + 1 : 1;
    }

    return objectPower;
  }

  getPow(factorizedBase);

  // ищем максимальную степень
  function checkMaxPow(objPow) {
    let objPows = Object.values(objPow);
    let maxPow = parseInt(objPows.sort((a, b) => (a - b))[objPows.length - 1], 10); // выбираем максимальное в конце сортированного массива
    return maxPow;
  }

  let maxPower = checkMaxPow(objectPower);

  // поиск количества совпадений
  function getZeros(number, factor) {
    let result = 0;

    for (let i = factor; number / i >= 1; i *= factor) {
      result += Math.floor(number / i);
    }

    return result;
  }

  // если степеней > 1 нет
  // берем больший множитель, считаем number / i, вычисляем число нулей
  let maxFactor = factorizedBase.sort((a, b) => (a - b))[factorizedBase.length - 1];
  let possiblezeroesCount;
  zeroesCount = getZeros(number, maxFactor);
  if (maxPower == 1) {
    return zeroesCount;
  } else {
    // если есть степень то проверяем еще множитель со степенью
    //  находим множитель со степенью
    let maxPowerNumber;

    function getNumWithMaxPower(obj) {
      for (let prop in obj) {
        if (obj[prop] == maxPower) {
          return prop;
        }
      }
    }
    // делим number / i (числа со степенью)
    // делим на степень полученное число
    // сравниваем с числом множителя без степени 
    maxPowerNumber = getNumWithMaxPower(objectPower);
    possiblezeroesCount = getZeros(number, maxPowerNumber) / maxPower;
    zeroesCount = [zeroesCount, possiblezeroesCount].sort((a, b) => (a - b))[0];

    return Math.floor(zeroesCount);
  }





}