import { useEffect, useState } from "react";
import { fetchMedia } from "../api/mediaApi";
import styles from "./Page.module.css";
import LoginModal from "../components/Login/Login.jsx";
import AddMediaModal from "../components/AddMedia/AddMedia.jsx"

// assume these already exist
// import LoginModal from "./LoginModal";
// import AddMediaModal from "./AddMediaModal";

function Media() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔐 auth + modal state
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddMedia, setShowAddMedia] = useState(false);

  useEffect(() => {
    fetchMedia()
      .then(data => {
        setMovies(data.filter(m => m.type === "MOVIE"));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>⏳ Loading movies...</p>;
  if (error) return <p style={{ color: "red" }}>❌ Error: {error}</p>;

  return (
    <div className={styles.page}>

      {/* 🔘 HEADER BAR */}
      <div className={styles.headerBar}>
        <h2>🎬 Movies</h2>

        <div className={styles.actions}>
          <button onClick={() => setShowLogin(true)}>
            {token ? "Logged In" : "Login"}
          </button>

          <button
            disabled={!token}
            onClick={() => setShowAddMedia(true)}
          >
            + Add Media
          </button>
        </div>
      </div>

      {/* 📋 TABLE */}
      {movies.length === 0 && (
        <p className={styles.empty}>No movies found.</p>
      )}

      <table
        className={styles.table}
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse" }}
      >
        <thead style={{ backgroundColor: "#f5f5f5" }}>
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
                  ? new Date(movie.releaseDate).toLocaleDateString()
                  : "Not released"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🪟 POPUPS */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={setToken}
        />
      )}

      {showAddMedia && (
        <AddMediaModal
          token={token}
          onClose={() => setShowAddMedia(false)}
        />
      )}
    </div>
  );
}

export default Media;
