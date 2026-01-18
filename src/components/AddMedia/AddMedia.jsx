function AddMedia({ token, onClose }) {
  const [type, setType] = useState("MOVIE");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [seasonNumber, setSeasonNumber] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");

  const handleSubmit = async () => {
    const body = {
      title,
      type,
      releaseDate,
      seasonNumber: type === "SERIES_EPISODE" ? seasonNumber : null,
      episodeNumber: type === "SERIES_EPISODE" ? episodeNumber : null
    };

    await fetch(`${subtitle_url}/api/media`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    onClose();
  };

  return (
    <div className="modal">
      <h3>Add Media</h3>

      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="MOVIE">Movie</option>
        <option value="SERIES_EPISODE">Series Episode</option>
      </select>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={releaseDate}
        onChange={e => setReleaseDate(e.target.value)}
      />

      {type === "SERIES_EPISODE" && (
        <>
          <input
            placeholder="Season Number"
            value={seasonNumber}
            onChange={e => setSeasonNumber(e.target.value)}
          />
          <input
            placeholder="Episode Number"
            value={episodeNumber}
            onChange={e => setEpisodeNumber(e.target.value)}
          />
        </>
      )}

      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default AddMedia;