import {formatTime} from 'utils';
import './progress-bar.css';
import './styles.css';

const ProgressBar = ({innerRef, audioRef, duration, value, setValue}) => {
  const handleChange = e => {
    setValue(Number(e.target.value));
    audioRef.current.currentTime = e.target.value;
  };

  return (
    <div className="progress">
      <input type="range" ref={innerRef} value={value} onChange={handleChange} />
      <div className="time-wrapper">
        <span className="time">{formatTime(value)}</span>
        <span>/</span>
        <span className="time">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
