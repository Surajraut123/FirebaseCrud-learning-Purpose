import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth"
import { db } from './config/firebase'
import { getDocs, collection } from "firebase/firestore";
function App () {

    //If we created a database in production mode in the firebase then in the rules section we have make true to allow read and write.
    // rules_version = '2';
    // service cloud.firestore {
    // match /databases/{database}/documents {
    //     match /{document=**} {
    //     allow read, write: if true;
    //     }
    // }
    // }


    const [movieList, setMovieList] = useState([]);
    const moviesCollection = collection(db, "movies");
    useEffect(() =>{
        const getMovieList = async () =>{
            try {
                const data = await getDocs(moviesCollection)
                const filteredData = data.docs.map((doc) =>({
                    ...doc.data(), id: doc.id
                }))
                // console.log({filteredData})
                setMovieList(filteredData)
            } catch (error) {
                console.error(error);
            }
        }

        getMovieList();
    }, []);

    return (
        <div className="App">
            <Auth/>

            <div>
                {movieList.map((movie) => (
                    <div>
                        <h1 style={{color: movie.receivedOnOscar ? "green" : "grey"}}>{movie.title}</h1>
                        <p>Date : {movie.releaseDate}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default App;