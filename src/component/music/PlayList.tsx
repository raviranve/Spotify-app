import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchPlaylistData } from "../../slice/musicSlice";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Navbar from "../../Navbar/Navbar";
import "../../App.css";

interface PlaylistTrack {
  id: string;
  name: string;
  imageUrl: string;
}

interface Track {
  track: {
    id: string;
    name: string;
    album: {
      images: { url: string }[];
    };
  };
}

const PlayList = () => {
  const [playlist, setPlaylist] = useState<PlaylistTrack[]>([]);
  const dispatch = useAppDispatch();
  const track = useAppSelector((state) => state.music.data);
  const loading = useAppSelector((state) => state.music.loading);

  useEffect(() => {
    dispatch(fetchPlaylistData());
    const storedPlaylist = JSON.parse(localStorage.getItem("playlist") || "[]");

    setPlaylist(storedPlaylist);
  }, [dispatch]);

  const handleAdd = (track: Track) => {
    if (!playlist.some((item) => item.id === track.track.id)) {
      const newPlaylist = [
        ...playlist,
        {
          id: track.track.id,
          name: track.track.name,
          imageUrl: track.track.album.images[1].url,
        },
      ];
      setPlaylist(newPlaylist);
      localStorage.setItem("playlist", JSON.stringify(newPlaylist));
      alert("Song Added Successfully");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <CircularProgress disableShrink />
      </div>
    );
  }

  return (
    <>
      <div className="play-container">
        {track.map((data) => (
          <div key={`track-${data.track.id}`}>
            <div className="playlist-img">
              <Link to={`/musicplay/${data.track.id}`}>
                <img src={data.track.album.images[1].url} alt="album cover" />
                <h2>{data.track.name}</h2>
              </Link>
              <button
                className="addPlaylist-btn"
                onClick={() => handleAdd(data)}
              >
                Add To Playlist
              </button>
            </div>
          </div>
        ))}
      </div>
      <Navbar />
    </>
  );
};

export default PlayList;
