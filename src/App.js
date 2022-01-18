import Axios from 'axios';
import { useState, useEffect } from 'react'
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent.js";
import MovieInfoComponent from './components/MovieInfoComponent.js'


export const apikey = '2610afcc'

const Container = styled.div `
display: flex;
flex-direction: column;
`;
const Header = styled.div`
display: flex;
flex-direction: row;
background-color: black;
justify-content: space-between;
align-items: center;
color: white;
padding; 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

// const SearchIcon = styled.img`
//   width: 32px;
//   height: 32px;
// `;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App()  {
const [searchQuery, updateSearchQuery] = useState('')
const [timeoutId, updateTimeoutId] = useState()
const [movieList, updateMovieList] = useState([])
const [selectedMovie, onMovieSelect] = useState()

const fetchData = async (searchString) => {
	const response = await Axios.get(`https://omdbapi.com/?s=${searchString}&apikey=${apikey}`)
	// console.log(response)
	updateMovieList(response.data.Search)
}
const onTextChange = (e) => {
	clearTimeout(timeoutId)
	updateSearchQuery(e.target.value)
	const timeout = setTimeout(() => fetchData(e.target.value), 500)
	updateTimeoutId(timeout)
};

  return (
    <Container>
		<Header>
			<AppName>React Movie App</AppName>
			<SearchBox>
				<SearchInput placeholder='Search Movie' value={searchQuery} onChange={onTextChange}/>
			</SearchBox>
			</Header>
			{selectedMovie && (
			<MovieInfoComponent 
			selectedMovie={selectedMovie} 
			onMovieSelect={onMovieSelect}
			/>
			)}
      <MovieListContainer>
		{movieList?.length ? movieList.map((movie, index) => <MovieComponent 
		key={index} 
		movie={movie} 
		onMovieSelect={onMovieSelect}
		/>): (
			<Placeholder src="/react-movie-app/movie-icon.svg" />
		  )}
	  </MovieListContainer>
    </Container>
  );
}

export default App;
