import { useState, useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchPlaylistData } from "../../slice/musicSlice";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import AudioControls from "./AudioControls";
import AudioProgressBar from "./AudioProgressBar";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [volume, setVolume] = useState<number>(0.2);
  const [duration, setDuration] = useState<number>(0);
  
  const [currrentProgress, setCurrrentProgress] = useState<number>(0);
  
  const [buffered, setBuffered] = useState<number>(0);
  
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef(new Audio());
  const dispatch = useAppDispatch();
  const track = useAppSelector((state) => state.music.data);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPlaylistData());
  }, [dispatch]);

  useEffect(() => {
    if (track.length > 0) {
      setCurrentTrackIndex(0);
      setAudioSrc(track[0]?.track.preview_url);
    }
  }, [track]);

  useEffect(() => {
    const currentIndex = track.findIndex((item) => item.track.id === id);
    if (currentIndex !== -1) {
      setCurrentTrackIndex(currentIndex);
      setAudioSrc(track[currentIndex]?.track.preview_url);
    }
  }, [track, id]);

  useEffect(() => {
    if (audioSrc !== "") {
      audioRef.current.src = audioSrc;
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioSrc, isPlaying, volume]);

  const handlePrevious = () => {
    const prevIndex =
      currentTrackIndex === 0 ? track.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setAudioSrc(track[prevIndex]?.track.preview_url);
  };

  const handleNext = useCallback(() => {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= track.length) {
      nextIndex = 0;
    }
    setCurrentTrackIndex(nextIndex);
    setAudioSrc(track[nextIndex]?.track.preview_url);
  }, [currentTrackIndex, track]);

  const handlePlay = () => {
    if (!isPlaying) {
      audioRef.current.currentTime = currrentProgress;
      audioRef.current.play();
    } else {
      setCurrrentProgress(audioRef.current.currentTime);
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMuteUnmute = () => {
    if (!audioRef.current) return;
    const newVolume = isMuted ? 0.2 : 0;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setCurrrentProgress(newProgress);
    audioRef.current.currentTime = newProgress;
  };

  const currentTrack = track[currentTrackIndex];

  useEffect(() => {
    const handleNextSong = () => {
      handleNext();
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("ended", handleNextSong);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleNextSong);
      }
    };
  }, [audioRef, handleNext]);

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
    e
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  return (
    <>
      <div className="music-container">
        <div className="music-contained">
          <div className="music-image">
            <img
              src={currentTrack?.track.album.images[0].url}
              alt="Album cover"
            />
          </div>
          <div className="music-detail">
            <p className="music-p">Song</p>
            <h1 className="music-h1">{currentTrack?.track.name}...</h1>
            <p className="artist-name">
              Artist :- {currentTrack?.track.artists[0].name}.
              {currentTrack?.track.album.release_date}
            </p>
          </div>
        </div>
        <div className="audio-music">
          <div>
            <audio
              ref={audioRef}
              preload="metadata"
              onDurationChange={(e) => setDuration(e.currentTarget.duration)}
              onCanPlay={(e) => {
                e.currentTarget.volume = volume;
              }}
              onTimeUpdate={(e) => {
                if (isPlaying) {
                  setCurrrentProgress(e.currentTarget.currentTime);
                  handleBufferProgress(e);
                }
              }}
              onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
            >
              <source type="audio/mpeg" src={currentTrack?.track.preview_url} />
            </audio>
            <AudioProgressBar
              duration={duration}
              currentProgress={currrentProgress}
              buffered={buffered}
              onChange={handleProgressChange}
            />
          </div>
          <div className="music-handler">
            <AudioControls
              onPrevious={handlePrevious}
              onPlay={handlePlay}
              onNext={handleNext}
              isPlaying={isPlaying}
              volume={volume}
              onVolumeChange={handleVolume}
              onMuteUnmute={handleMuteUnmute}
              isMuted={isMuted}
            />
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Home;
