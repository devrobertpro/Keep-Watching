 /* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState} from "react"

//  importing component
import Navigation from "../components/Navigation/Navigation"
import MovieInfo from "../components/MovieInfo/MovieInfo"
import MovieInfoBar from "../components/MovieInfoBar/MovieInfoBar"
import Grid from "../components/Grid/Grid"
import Spinner from "../components/Spinner/Spinner"
import Actor from "../components/Actor/Actor"
import Rating from "../components/Rating/Rating"
import Review from "../components/Review/reviews"
import Selections from "../components/selections/selections"
import ShowReviews from "../components/ShowReviews/ShowReviews"

//  importing custom hook
import useMovieFetch from "../hooks/useMovieFetch"

// importing context 
import AuthContext from "../../context/Authentication/authenticationContext"

const Movie = (props) =>{     
    const authContext = useContext(AuthContext)
    const {isAuthenticated, loadUser, user} = authContext
    useEffect(()=>{
        loadUser()
        // eslint-disable-next-line
    }, [isAuthenticated])
    const [selection, setSelection] = useState("Actors")
    
    const movieId = props.match.params.movieId
    const [movie, loading, error] = useMovieFetch(movieId)
    // console.log("MOVIE  = ", movie)
    // console.log("movie= ",movie)

    if (error) return <div>Something went wrong</div>
    if (loading) return <Spinner />

    const handelClick = (event) => {
        setSelection(event.target.value)
    }
    return(
        <>
            <Navigation movie={movie.original_title} />
            <MovieInfo movie={ movie }/>
            <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>
            <Rating movieID={movie.id} />
             <Review movieID={movie.id}/>
             <Selections handelClick={handelClick} collections={["Actors", "Reviews"]}/>
            {selection==="Actors" &&<Grid header="Actors">
                {
                    movie.actors.map( actor => (
                        <Actor key={actor.credit_id} actor={actor} />
                    ))
                }
            </Grid>}
            {
                selection==="Reviews" && <ShowReviews movieID={movieId}/>
            }
        </>
    )
}

export default Movie