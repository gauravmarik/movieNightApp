import axios from 'axios';
import { useState } from 'react'
import styled from "styled-components";
import DisplayMovies from "./components/DisplayMovies.js";
import MoviesInfo from './components/MoviesInfo.js'
 

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
font-size: 45px;
font-weight: bold;
font-family: 'Creepster', sans-serif;
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
  font-family: 'Dosis', sans-serif;
  font-size: 20px;
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
  font-family: 'Dosis', sans-serif;
`;

// const Placeholder = styled.img`
//   width: 120px;
//   height: 120px;
//   margin: 150px;
//   opacity: 50%;
// `;

function App()  {
const [searchQuery, setSearchQuery] = useState('')
const [timeoutId, setTimeoutId] = useState()
const [movieList, setMovieList] = useState([])
const [selectedMovie, onMovieSelect] = useState()

const moviesFetch = async (searchString) => {
	const response = await axios.get(`https://omdbapi.com/?s=${searchString}&apikey=${apikey}`)
	// console.log(response)
	setMovieList(response.data.Search)
}
const onTextChange = (e) => {
	clearTimeout(timeoutId)
	setSearchQuery(e.target.value)
	const timeout = setTimeout(() => moviesFetch(e.target.value), 500)
	setTimeoutId(timeout)
};

  return (
    <Container>
		<Header>
			<AppName> Movie Night </AppName>

			<SearchBox>
				<SearchInput placeholder='Search Movie' value={searchQuery} onChange={onTextChange}/>
			</SearchBox>
				
			</Header>
			{selectedMovie && (
			<MoviesInfo 
			selectedMovie={selectedMovie} 
			onMovieSelect={onMovieSelect}
			/>
			)}
      <MovieListContainer>
		{movieList?.length ? (
			movieList.map((movie, index) => (
		<DisplayMovies 
		key={index} 
		movie={movie} 
		onMovieSelect={onMovieSelect}
		/>
		))
		) : (
			// <Placeholder src="movieBackground.jpeg" />
			// 'no movie here'
			<img src="./movieBackground.jpeg" alt="" />
		  )}
	  </MovieListContainer>
    </Container>
  );
}

export default App;
