import { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import "../../App.css";
import { Link } from "react-router-dom";

interface Data {
  id: number;
  imageUrl: string;
  name: string;
}

const CreatePlaylist = () => {
  const [playlistData, setPlaylistData] = useState<Data[]>([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("playlist") || "[]");
    setPlaylistData(storedData);
  }, []);

  const handleRemoveSong = (id: number) => {
    const updatedPlaylist = playlistData.filter((item) => item.id !== id);
    setPlaylistData(updatedPlaylist);
    localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));
    alert("Remove song successfully");
  };

  return (
    <>
      <div className="create-container">
        <div className="heading">My Playlist</div>
        {playlistData.map((item: Data) => (
          <div key={item.id} className="create-image">
            <Link to={`/musicplay/${item.id}`}>
              <img src={item.imageUrl} alt="album cover" />
              <h3>{item.name}</h3>
            </Link>
            <button
              className="remove-song"
              onClick={() => handleRemoveSong(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <Navbar />
    </>
  );
};

export default CreatePlaylist;
