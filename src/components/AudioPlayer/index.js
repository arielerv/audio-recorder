import {Controls, DisplayTrack} from 'components';
import tracksData from 'data/tracks';
import {useRecorder} from 'hooks';
import {useEffect, useRef, useState} from 'react';
import './styles.css';

const AudioPlayer = () => {
  const [tracks, setTracks] = useState(tracksData);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressRef = useRef();
  const recorder = useRecorder();

  useEffect(() => {
    if (recorder.data.audio) {
      const newRecording = {
        key: tracks.length + 1,
        src: recorder.data.audio,
        duration: recorder.data.recording,
      };
      setTracks([...tracks, newRecording]);
      recorder.stop();
    }
  }, [recorder, tracks]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex(trackIndex + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <>
      <div className="audio-player">
        <DisplayTrack
          {...{
            currentTrack,
            audioRef,
            setDuration,
            progressRef,
            handleNext,
          }}
        />
        <Controls
          {...{
            audioRef,
            progressRef,
            duration,
            tracks,
            trackIndex,
            setTrackIndex,
            setCurrentTrack,
            handleNext,
            recorder,
          }}
        />
      </div>
    </>
  );
};

export default AudioPlayer;
