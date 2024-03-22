import json from './data.json';

const listOfValues = json.map(item => item.typequipement);

const uniqueListOfValues = [...new Set(listOfValues)];

console.log(uniqueListOfValues);
