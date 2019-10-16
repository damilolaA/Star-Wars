import React, { useState, useEffect, useRef, useContext } from 'react';

import GenderFilter from '../GenderFilter';
import {
  abbrevateGender,
  heightInMetrics,
  saveCharacterList,
  getCharacterList
} from '../../utils';
import { ASC, DESC, ALL, CHARACTER_ERROR, ASCENDING, DESCENDING } from '../../utils/constants';
import Loader from '../Loader';
import "./movie.scss";
import { ToastContext } from '../../providers/toast.provider';

const getCharactersFromApi = async (movie, setMovieState, toast) => {
  try{
    const characterResponse = movie.characters.map(async (url) => {
      return await fetch(url);
    });
    const res = await Promise.all(characterResponse);
  
    if (res.length > 0) {
      const data = [];
      for(const item of res) {
        const itemData = await item.json();
        data.push(itemData);
      }
  
      saveCharacterList(movie.title, data);
      setMovieState(prevState => {
        return{
          ...prevState,
          characterList: data
        }
      });
    }else {
      return toast.current.showToast('5', CHARACTER_ERROR);
    }
  }catch(error) {
    return toast.current.showToast('5', CHARACTER_ERROR);    
  }finally {
    setMovieState(prevState => {
      return{
        ...prevState,
        loading: false,
      }
    });
  }
}

const fetchCharacters = async (props, toast, setMovieState) => {
  const { movie } = props;
  
  const cachedCharacterList = getCharacterList();
  if(cachedCharacterList != null && cachedCharacterList.length > 0) {
    const filteredMovie = cachedCharacterList.filter(movieItem => movieItem.title === movie.title);
    if(filteredMovie.length > 0) {
      setMovieState(prevState => {
        return{
          ...prevState,
          loading: false,
          characterList: filteredMovie[0].data
        }
      });
    }else {
      return getCharactersFromApi(movie, setMovieState, toast);
    }
  }else {
    return getCharactersFromApi(movie, setMovieState, toast);      
  }
}

const sortCharacters = (state, setMovieState) => {
  const { characterList, order } = state;
  const sortedList = characterList.sort((a, b) =>
    order === ASC ? b.name.localeCompare(a.name) :
      a.name.localeCompare(b.name)
  );

  setMovieState(prevState => {
    return{
      ...prevState,
      characterList: sortedList,
      order: order === ASC ? DESC : ASC,
      sortTypeNum: 1,
    }
  });
}

const sortCharacterGender = (state, setMovieState) => {
  const { characterList, genderOrder } = state;
  const sortedList = characterList.sort((a, b) => 
    genderOrder === ASC ? b.gender.localeCompare(a.gender) : 
      a.gender.localeCompare(b.gender)
  );
  setMovieState(prevState => {
    return {
      ...prevState,
      characterList: sortedList,
      genderOrder: genderOrder === ASC ? DESC : ASC,
      sortTypeNum: 2,
    }
  });
}

const sortCharacterHeight = (state, setMovieState) => {
  const { characterList, heightOrder } = state;
  const sortedList = characterList.sort((a, b) => 
    heightOrder === ASC ?  b.height - a.height : 
      a.height - b.height
  );
  setMovieState(prevState => {
    return {
      ...prevState,
      characterList: sortedList,
      heightOrder: heightOrder === ASC ? DESC : ASC,
      sortTypeNum: 3,
    }
  });
}

function Movie(props) {

  const [ state, setMovieState ] = useState({
    loading: true,
    characterList: [],
    order: ASC,
    genderOrder: ASC,
    heightOrder: ASC,
    filterName: "",
    sortTypeNum: 0
  });

  const toastData = useRef(useContext(ToastContext));

  useEffect(() => {
    fetchCharacters(props, toastData, setMovieState);
  }, [props]);

  const handleFilter = (e) => {
    const filterValue = e.value;
    const characters = getCharacterList();
    
    const filteredMovie = characters.filter(movieItem => movieItem.title === props.movie.title);
    
    if (filterValue === ALL) {
      return setMovieState(prevState => {
        return{
          ...prevState,
          characterList: filteredMovie[0].data,
          filterName: filterValue,
          sortTypeNum: 0
        }
      });
    }
    const genderFilter = filteredMovie[0].data.map(item => item).filter(character => character.gender === filterValue);
    
    setMovieState(prevState => {
      return{
        ...prevState,
        characterList: genderFilter,
        filterName: filterValue,
        sortTypeNum: 0
      }
    });
  }

  const { movie } = props;
  const { loading, characterList, order, genderOrder, heightOrder, sortTypeNum, filterName } = state;

  return(
    <div className="movie">
      <div className="movie__crawl">
        <h2>{movie.title}</h2>
        <p className="animated-text">{movie.opening_crawl}</p>
      </div>
      {
        loading ? <Loader /> : (
          <>
            <div className="movie__filter">
              <GenderFilter handleFilter={handleFilter} filterName={filterName} />
            </div>
            <section
              className="movie__section"
            >
              <table className="movie__section__table">
                <thead>
                  <tr 
                    onClick={() => sortCharacters(state, setMovieState)}
                  >
                    <th 
                      onDoubleClick={() => sortCharacters(state, setMovieState)}
                    >
                      Name
                      <p>{sortTypeNum === 1 && (order === ASC ? ASCENDING : DESCENDING)}</p>
                  </th>
                    <th 
                      onDoubleClick={() => sortCharacterGender(state, setMovieState)}
                    >
                      Gender
                      <p>{sortTypeNum === 2 && (genderOrder === ASC ? ASCENDING : DESCENDING)}</p>
                  </th>
                    <th 
                      onDoubleClick={() => sortCharacterHeight(state, setMovieState)}
                    >
                      {"Height In Cm & Feet"}
                      {" = "}
                      <b>{(heightInMetrics(characterList))}</b>
                      <p>{sortTypeNum === 3 && (heightOrder === ASC ? ASCENDING : DESCENDING)}</p>
                  </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    characterList && characterList.length > 0 && characterList.map((character) => (
                      <tr key={character.name}>
                        <td>{character.name}</td>
                        <td>{abbrevateGender(character.gender)}</td>
                        <td>{character.height}</td>
                      </tr>
                    ))
                  }
                  <tr>
                    <td className="movie__section__table-data">
                      <span><p>Total Characters</p></span>
                      {characterList.length > 0 && characterList.length}
                    </td>
                    <td>{}</td>
                    <td className="movie__section__table-data">
                      <span><p>Total Characters Height</p></span>
                      {heightInMetrics(characterList)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        )
      }
    </div>
  );
}

export default Movie;