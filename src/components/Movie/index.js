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
        characterList: characters        
      })
    }

    const genderFilter = characters.filter((character) => 
      character.gender === filterValue
    );

    this.setState({
      characterList: genderFilter
    });
  }

  render() {
    const { movie } = this.props;
    const { characterList, loading, order, genderOrder, heightOrder } = this.state;

    return(
      <div className="movie">
        {/* <div className="movie__crawl">
          <p className="animated fadeInUp">{movie.opening_crawl}</p>
        </div> */}
        {
          loading ? <Loader /> : (
            <>
             <div className="movie__crawl">
              <p className="animated fadeInUp">{movie.opening_crawl}</p>
            </div>
            <GenderFilter handleFilter={this.handleFilter} />
            <table className="movie__table">
              <button onClick={() => this.sortCharacters(order)}> 
                <thead>
                  <tr style={{ background: '#fff' }}>
                    <button onDoubleClick={() => this.sortCharacters(order)}>
                      <th>Name</th>
                    </button>
                    <button onDoubleClick={() => this.sortCharacterGender(genderOrder)}>
                      <th>Gender</th>
                    </button>
                    <button onDoubleClick={() => this.sortCharacterHeight(heightOrder)}>
                      <th>Height</th>
                    </button>
                  </tr>
                </thead>
              </button>
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
            </>
          )
        }
      </div>
    );
  }
}

export default Movie;