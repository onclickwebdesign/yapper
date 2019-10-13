import React, { Component } from 'react';
import styled from 'styled-components';
import { BackgroundFade, RemoveIcon } from '../styled';

const GifContainer = styled.section`
  position: absolute;
  left: 0;
  right: 0;
  width: 90%;
  margin: 2rem auto 0;
  height: 90%;
  border-radius: 10px;
  background-color: rgb(30, 35, 38);
`;

const SearchContainer = styled.div`
  height: 75px;
  padding: 10px;
`;

const GifsResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: calc(100% - 85px);
  overflow-y: auto;
  overflow-x: hidden;
`;


export default class SearchGifs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: []
    };
  }

  async componentDidMount() {
    const result = await fetch('/api/yip/searchgifs', { 
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const gifs = await result.json();
    console.log('gifs: ', gifs.gifs.data);
    this.setState({ gifs: gifs.gifs.data });
  }

  render() {
    console.log(this.state);
    return(
      <BackgroundFade>
        <GifContainer>
          <RemoveIcon onClick={this.props.closeGifsSearch}>&times;</RemoveIcon>
          <SearchContainer>

          </SearchContainer>
          <GifsResults>
            {this.state.gifs.length && this.state.gifs.map((gif, i) => 
              <img key={gif.id} style={{width:'24%', margin:'5px 0'}} src={gif.images.fixed_height.url} alt="Giphy Gif" />)}
          </GifsResults>
        </GifContainer>
      </BackgroundFade>
    )
  }
}