import { CHARACTER_LIST } from './constants';

export const abbrevateGender = (gender) => {
  return gender.split(' ').map(v => v[0].toUpperCase());
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

export const saveCharacterList = (title, characterList) => {
  const movieData = {"title": title, "data": characterList};
  let currentMovieList = getCharacterList();

  if(currentMovieList == null) {
    let list = [];
    list.push(movieData);
    const movieDataList = JSON.stringify(list);
    localStorage.setItem(CHARACTER_LIST, movieDataList);
  }else {
    const filteredMovie = currentMovieList.filter(movie => movie.title === title);
    
    if(filteredMovie.length > 0) return;
    currentMovieList.push(movieData);
    const movieDataList = JSON.stringify(currentMovieList);
    localStorage.setItem(CHARACTER_LIST, movieDataList); 
  }
}

export const getCharacterList = () => {
  const characterList = localStorage.getItem(CHARACTER_LIST);
  return JSON.parse(characterList);
}