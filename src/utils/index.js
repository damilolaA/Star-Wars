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
  var inches = (heightInCm * 0.393700787).toFixed(2);
  var feet = Math.floor(inches / 12);
  var newInches = (inches %= 12).toFixed(2);
  return `${feet}ft/${newInches}in`;
}

export const heightInMetrics = (characterList) => {
  const value = totalHeightInCM(characterList);
  const heightInFeet = convertHeightToFeet(value);
  return `${value}cm (${heightInFeet})`;
}