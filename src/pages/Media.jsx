import { useEffect, useState } from "react";
import { fetchMedia } from "../api/mediaApi";

function Media(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMedia()
        .then(data => {
            // filter only movies if API later includes SERIES
            const onlyMovies = data.filter(m => m.type === "MOVIE");
            setMovies(onlyMovies);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: "20px" }}>
        <h2>🎬 Movies</h2>

        {movies.length === 0 && <p>No movies found.</p>}

        <table border="1" cellPadding="10">
            <thead>
            <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Release Date</th>
            </tr>
            </thead>
            <tbody>
            {movies.map(movie => (
                <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.type}</td>
                <td>
                    {movie.releaseDate
                    ? movie.releaseDate
                    : "Not released"}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
export default Media;