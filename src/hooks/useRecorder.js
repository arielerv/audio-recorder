import {MAX_RECORDER_TIME} from 'constant';
import {useTimer} from 'hooks';
import {useEffect, useState} from 'react';
import {save, start} from 'utils/recorder';

const initialState = {
  stream: null,
  isRecording: false,
};

const useRecorder = () => {
  const [recorder, setRecorder] = useState(initialState);
  const [audio, setAudio] = useState();
  const [media, setMedia] = useState({});
  const [recording, handlers] = useTimer(0);

  useEffect(() => {
    if (recording === MAX_RECORDER_TIME) {
      if (media?.state !== 'inactive') {
        media?.stop();
      }
    }
  }, [recording]);

  useEffect(() => {
    if (recorder.isRecording) {
      handlers.on();
    } else {
      handlers.off();
    }
  }, [recorder.isRecording, handlers]);

  useEffect(() => {
    if (recorder.stream) {
      const newMedia = new MediaRecorder(recorder.stream);
      setMedia(newMedia);
      let chunks = [];
      newMedia.start();
      newMedia.ondataavailable = e => chunks.push(e.data);
      newMedia.onstop = () => {
        const blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
        chunks = [];
        setAudio(window.URL.createObjectURL(blob));
      };
    }
    return () => recorder?.stream?.getAudioTracks().forEach(track => track.stop());
  }, [recorder.stream]);

  const handleStop = () => {
    setAudio(undefined);
    setMedia(undefined);
    setRecorder(initialState);
  };

  return {
    data: {audio, media, recording, isRecording: recorder.isRecording},
    start: () => start(setRecorder),
    cancel: () => setRecorder({...recorder, isRecording: false}),
    stop: handleStop,
    save: () => save(media),
  };
};

export default useRecorder;
