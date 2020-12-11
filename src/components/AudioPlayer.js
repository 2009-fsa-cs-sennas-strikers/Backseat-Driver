import React, { useState, useEffect } from "react";

const useAudio = url => {
  const [audio] = useState(new Audio('./music/ryan_andersen_synthwave.mp3'));
  const [playing, setPlaying] = useState(true);

  audio.autoplay = true;
  audio.play();
  //




  const toggle = () => setPlaying(!playing);
  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },
  [playing]
  );


  useEffect(() => {
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