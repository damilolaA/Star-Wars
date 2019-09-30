import React, { Component } from 'react';
import axios from 'axios';

import GenderFilter from '../GenderFilter';
import { 
  abbrevateGender, 
  heightInMetrics, 
  saveCharacterList,
  getCharacterList
} from '../../utils';
import { ASC, DESC, ALL } from '../../constants';
import Loader from '../Loader';
import "./movie.scss";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      characterList: [],
      order: ASC,
      genderOrder: ASC,
      heightOrder: ASC,
      filterName: ""
    }
  } 

  componentDidMount() {
    this.fetchCharacters();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.movie !== this.props.movie) {
      this.setState({
        loading: true
      });
      return this.fetchCharacters();
    }
  }

  fetchCharacters = async() => {
    const { movie } = this.props;
    try{
      const characterResponse = movie.characters.map(url => {
        return axios.get(url);
      });
      const res = await Promise.all(characterResponse);
      if(res.length > 0) {
        const data = res.map(data => data.data);
        saveCharacterList(data);
        this.setState({
          characterList: data,
          loading: false
        });
      }
    }catch(error) {
      this.setState({
        loading: false
      });
      window.showToast('5', "An error occurred");
    }
  }

  sortCharacters = (order) => {
    const { characterList } = this.state;
    this.setState({
      characterList: characterList.sort((a, b) => {
        return order === ASC ? a.name.localeCompare(b.name) : 
        b.name.localeCompare(a.name);
      }),
      order: order === ASC ? DESC : ASC
    });
  }

  sortCharacterGender = (genderOrder) => {
    const { characterList } = this.state;
    this.setState({
      characterList: characterList.sort((a, b) => {
        return genderOrder === ASC ? a.gender.localeCompare(b.gender) : 
        b.gender.localeCompare(a.gender);
      }),
      genderOrder: genderOrder === ASC ? DESC : ASC
    });
  }

  sortCharacterHeight = (heightOrder) => {
    const { characterList } = this.state;
    this.setState({
      characterList: characterList.sort((a, b) => {
        return heightOrder === ASC ? a.height - b.height : 
        b.height - a.height
      }),
      heightOrder: heightOrder === ASC ? DESC : ASC
    });
  }

  handleFilter = (e) => {
    const filterValue = e.target.value;
    const characters = getCharacterList();
    
    if(filterValue === ALL) {
      return this.setState({
        characterList: characters,
        filterName: filterValue        
      })
    }

    const genderFilter = characters.filter((character) => 
      character.gender === filterValue
    );

    this.setState({
      characterList: genderFilter,
      filterName: filterValue        
    });
  }

  render() {
    const { movie } = this.props;
    const { characterList, loading, order, genderOrder, heightOrder, filterName } = this.state;

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
              <GenderFilter handleFilter={this.handleFilter} filterName={filterName} />
            </div>
            <section 
              style={{
                background: `#fff`,
                padding: `20px`,
                borderRadius: `10px`,
                maxHeight: `450px`,
                overflowY: `scroll`
              }}
            >
              <table className="movie__table">
                <thead>
                  <tr onClick={() => this.sortCharacters(order)}>
                    <th onDoubleClick={() => this.sortCharacters(order)}>
                      Name
                    </th>
                    <th onDoubleClick={() => this.sortCharacterGender(genderOrder)}>
                      Gender
                    </th>
                    <th onDoubleClick={() => this.sortCharacterHeight(heightOrder)}>
                      Height
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    characterList.length > 0 && characterList.map((character) => (
                      <tr key={character.name}>
                        <td>{character.name}</td>
                        <td>{abbrevateGender(character.gender)}</td>
                        <td>{character.height}</td>
                      </tr>
                    ))
                  }
                  <tr>
                    <td>{characterList.length > 0 &&  characterList.length}</td>
                    <td>{}</td>
                    <td>{heightInMetrics(characterList)}</td>
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
}

export default Movie;