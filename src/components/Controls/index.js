import {GradientIcon, ProgressBar} from 'components';
import {MAX_RECORDER_TIME} from 'constant';
import {useBoolean, useTimer} from 'hooks';
import {useEffect} from 'react';
import {
  IoEllipse,
  IoPauseSharp,
  IoPlaySharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoStop,
} from 'react-icons/io5';
import './styles.css';

const Controls = ({
  audioRef,
  progressRef,
  duration,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
  recorder,
}) => {
  const [isPlaying, setIsPlaying] = useBoolean(false);
  const [timer, handlers] = useTimer(0);
  const isRecording = recorder.data.isRecording;

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex(prev => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  const handleInitial = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying.off();
    handlers.clear();
  };

  const handleStop = () => {
    handleInitial();
    recorder.cancel();
    setCurrentTrack(tracks[0]);
  };

  const handleRecord = () => {
    handleInitial();
    return isRecording ? recorder.save() : recorder.start();
  };

  useEffect(() => {
    handleInitial();
  }, [trackIndex]);

  useEffect(() => {
    if (isPlaying || isRecording) {
      handlers.on();
    } else {
      handlers.off();
    }
  }, [isPlaying, isRecording, handlers]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <div className="track-indicator">
          {trackIndex + 1} - {tracks.length}
        </div>
        <button onClick={setIsPlaying.toggle} disabled={isRecording}>
          {isPlaying ? <GradientIcon icon={IoPauseSharp} /> : <GradientIcon icon={IoPlaySharp} />}
        </button>
        <button onClick={handleStop}>
          <GradientIcon icon={IoStop} />
        </button>
        <button onClick={handlePrevious} disabled={isRecording}>
          <GradientIcon icon={IoPlaySkipBackSharp} />
        </button>
        <button onClick={handleNext} disabled={isRecording}>
          <GradientIcon icon={IoPlaySkipForwardSharp} />
        </button>
        <button onClick={handleRecord} style={{background: isRecording ? 'darkred' : undefined}}>
          <IoEllipse color={isRecording ? 'white' : 'darkred'} />
        </button>
        <ProgressBar
          duration={isRecording ? MAX_RECORDER_TIME : duration}
          setValue={handlers.setTimer}
          value={timer}
          innerRef={progressRef}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
};

export default Controls;
