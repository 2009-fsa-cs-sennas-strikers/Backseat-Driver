import React, { useState, useEffect } from "react";



const useAudio = url => {
  const [audio] = useState(new Audio('./music/ryan_andersen_synthwave.mp3'));
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },
  [playing]
  );
  audio.loop = true;
  audio.volume= 0.5;

  useEffect(() => {
    audio.addEventListener('load', ()=>setPlaying(true));
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);
  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div id="audio-player">
      <button id="audio-button" onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      {playing && (<div id="song-info"><h4>Now Playing</h4>
      <h3>Ryan Andersen - Synthwave</h3></div>)}
    </div>
  );
};

export default Player;
