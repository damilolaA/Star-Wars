import { CHARACTER_LIST } from './constants';

export const abbrevateGender = (gender) => {
  if(gender === 'n/a') return gender;
  if(gender === 'none') return gender;
  return gender.split(' ')[0].slice(0, 1);
}

const totalHeightInCM = (characterList) => {
  return characterList.filter((character) => character.height !== "unknown")
    .reduce((acc, character) => acc + parseInt(character.height), 0);
}

const convertHeightToFeet = (heightInCm) => {
  let inches = (heightInCm * 0.393700787).toFixed(2);
  const feet = Math.floor(inches / 12);
  const newInches = (inches %= 12).toFixed(2);
  return `${feet}ft/${newInches}in`;
}

export const heightInMetrics = (characterList) => {
  const value = totalHeightInCM(characterList);
  const heightInFeet = convertHeightToFeet(value);
  return `${value} cm (${heightInFeet})`;
}

export const saveCharacterList = (characterList) => {
  const stringList = JSON.stringify(characterList);
  localStorage.setItem(CHARACTER_LIST, stringList);
}

export const getCharacterList = () => {
  const characterList = localStorage.getItem(CHARACTER_LIST);
  return JSON.parse(characterList);
}