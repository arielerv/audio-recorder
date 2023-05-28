const DisplayTrack = ({currentTrack, audioRef, setDuration, progressRef, handleNext}) => {
  const onLoadedMetadata = () => {
    const seconds = currentTrack.duration || audioRef.current.duration;
    setDuration(seconds);
    progressRef.current.max = seconds;
  };

  return (
    <audio
      src={currentTrack.src}
      ref={audioRef}
      onLoadedMetadata={onLoadedMetadata}
      onEnded={handleNext}
    />
  );
};

export default DisplayTrack;
