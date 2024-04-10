import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth"
import { db, auth, storage } from './config/firebase'
import { getDocs, collection , addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { ref, uploadBytes} from "firebase/storage";
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

    //New Movie States
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [movieReleaseDate, setMovieReleaseDate] = useState(0);
    const [receivedOscar, setOscar] = useState(false); 


    //Update Title State
    const [updateTitle, setUpdateTitle] = useState("");

    //File Upload State
    const [fileUpload, setFileUpload] = useState(null);
    const moviesCollection = collection(db, "movies");
    const getMovieList = async () =>{
        try {
            const data = await getDocs(moviesCollection)
            const filteredData = data.docs.map((doc) =>({
                ...doc.data(), id: doc.id
            }))
            // console.log("data : ", data);
            setMovieList(filteredData)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() =>{
        getMovieList();
    }, []);


    const onSubmitMovie = async () =>{
        try {
            await addDoc(moviesCollection, {title: newMovieTitle, releaseDate: movieReleaseDate, receivedOnOscar: receivedOscar, userId: auth?.currentUser?.uid});
            getMovieList();
        } catch (error) {
            console.error(error)
        }
    }   

    const deleteMovie = async (id) =>{
        try {
            //which document you want to delete
            const movieDoc = doc(db, "movies", id);
            await deleteDoc(movieDoc)
            getMovieList();
        } catch (error) {
            console.error(error);
        }
    }
    const updateMovieTitle = async (id) =>{
        try {
            //which document you want to delete
            const movieDoc = doc(db, "movies", id);
            await updateDoc(movieDoc, {title: updateTitle})
            getMovieList();
        } catch (error) {
            console.error(error);
        }
    }

    const uploadFile = async () =>{
        if(!fileUpload){
            return;
        }
        const fileFolderRef = ref(storage, `ProjectFiles/${fileUpload.name}`);
        try {
            await uploadBytes(fileFolderRef, fileUpload)
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="App">
            <Auth/>
            <div>
                <input type="text" placeholder="Movie title ... " onChange={(e) => setNewMovieTitle(e.target.value)} />
                <input type="number" placeholder="Release Date ... " onChange={(e)=> setMovieReleaseDate(Number(e.target.value))}/>
                <input type="checkbox" name="check" id="check" checked={receivedOscar} onChange={(e)=> setOscar(e.target.checked) }/> Received an Oscar
                <button onClick={onSubmitMovie}>Submit Movie</button>
            </div>
            <div>
                {movieList.map((movie) => (
                    <div>
                        <h1 style={{color: movie.receivedOnOscar ? "green" : "grey"}}>{movie.title}</h1>
                        <p>Date : {movie.releaseDate}</p>
                        <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
                        <input type="text" placeholder="New Title...." onChange={(e) => setUpdateTitle(e.target.value)}/>
                        <button onClick={() => updateMovieTitle(movie.id)}> Update Title</button>
                    </div>
                ))}
            </div>

            <div>
                <input type="file" onChange={(e) =>setFileUpload(e.target.files[0])}/>
                <button onClick={uploadFile}> Upload File</button>
            </div>
        </div>
    )
}
export default App;