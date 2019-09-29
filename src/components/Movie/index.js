import React, { Component } from 'react';
import axios from 'axios';

import { abbrevateGender, heightInMetrics } from '../../utils';
import Loader from '../Loader';
import "./movie.scss";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      characterList: [],
      order: 'asc',
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
        return order === 'asc' ? a.name.localeCompare(b.name) : 
        b.name.localeCompare(a.name);
      }),
      order: order === 'asc' ? 'desc' : 'asc'
    });
  }

  render() {
    const { movie } = this.props;
    const { characterList, loading, order } = this.state;

    return(
      <div className="movie">
        <div className="movie__crawl">
          <p>{movie.opening_crawl}</p>
        </div>
        {
          loading ? <Loader /> : (
            <table className="movie__table">
              <button onClick={() => this.sortCharacters(order)}> 
                <thead>
                  <tr style={{ background: '#fff' }}>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Height</th>
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
          )
        }
      </div>
    );
  }
}

export default Movie;