import React from "react";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";

interface AudioControlsProps {
  onPrevious: () => void;
  onPlay: () => void;
  onNext: () => void;
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onMuteUnmute: () => void;
  isMuted: boolean; 
}

const AudioControls: React.FC<AudioControlsProps> = ({
  onPrevious,
  onPlay,
  onNext,
  isPlaying,
  volume,
  onVolumeChange,
  onMuteUnmute,
  isMuted,
}) => {
  return (
    <>
      <div className="music-handler">
        <div className="handle">
          <button onClick={onPrevious}>
            <SkipPreviousRoundedIcon />
          </button>
          <button onClick={onPlay}>
            {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
          </button>
          <button onClick={onNext}>
            <SkipNextRoundedIcon />
          </button>
        </div>
        <div className="volume-handle">
          <button onClick={onMuteUnmute}> 
            {isMuted ? <MdVolumeOff size={20} /> : <MdVolumeUp size={20} />} 
          </button>
          <input
            aria-label="volume"
            name="volume"
            type="range"
            min={0}
            step={0.05}
            max={1}
            value={volume}
            className="w-[70px] m-1 h-3 rounded-full accent-cyan-600 bg-gray-700 appearance-none cursor-pointer"
            onChange={(e) => {
              onVolumeChange(e.currentTarget.valueAsNumber);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AudioControls;
