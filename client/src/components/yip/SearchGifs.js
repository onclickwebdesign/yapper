import React, { Component } from 'react';
import styled from 'styled-components';
import { BackgroundFade, RemoveIcon } from '../styled';
import { yipApi } from '../../util';

const GifContainer = styled.section`
  position: absolute;
  left: 0;
  right: 0;
  width: 90%;
  max-width: 650px;
  margin: 2rem auto 0;
  height: 90%;
  border-radius: 10px;
  background-color: rgb(30, 35, 38);
`;

const SearchContainer = styled.div`
  padding: 10px 10px 10px 65px;
  display: flex;
  justify-content: space-between;
`;

const GifsResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: calc(100% - 85px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const TextInput = styled.input`
  flex-grow: 1;
  color: #fff;
  margin-right: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #fff;
  background: rgb(21, 32, 43);
  &:focus {
    background: #000;
    border-color: #0062cc;
  }
`;


export default class SearchGifs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      query: ''
    };
  }

  async componentDidMount() {
    this.searchGifs();
  }

  searchGifs = async () => {
    let url = '/api/yip/gif/searchgifs?limit=25';
    if (this.state.query) url += `&search=${this.state.query}`;
    const result = await yipApi.getGifs(url, { 'Content-Type': 'application/json' });
    const gifs = await result.json();
    this.setState({ gifs: gifs.data });
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSelectGif = (id, url, height, width) => {
    this.props.selectGif({ id, url, height, width });
    this.props.closeGifsSearch();
  }

  render() {
    return(
      <BackgroundFade>
        <GifContainer>
          <RemoveIcon onClick={this.props.closeGifsSearch} style={{left:15}}>&times;</RemoveIcon>
          <SearchContainer>
            <TextInput type="text" name="query" value={this.state.query} onChange={this.handleInput} />
            <button className="yapper-btn-primary btn btn-primary" onClick={this.searchGifs} disabled={!this.state.query ? true : false}>Search</button>
          </SearchContainer>
          <GifsResults>
            {this.state.gifs.length && this.state.gifs.map((gif, i) => 
              <img key={gif.id} style={{width:'32%', marginBottom:'10px', cursor: 'pointer'}} onClick={() => this.onSelectGif(gif.id, gif.images.original_mp4.mp4, gif.images.original_mp4.height, gif.images.original_mp4.width)} src={gif.images.fixed_height.url} alt="Giphy Gif" />)}
          </GifsResults>
        </GifContainer>
      </BackgroundFade>
    )
  }
}