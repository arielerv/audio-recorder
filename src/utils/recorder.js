export const start = async setRecorder => {
  const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  setRecorder({isRecording: true, stream});
};

export const save = media => {
  if (media?.state !== 'inactive') {
    media?.stop();
  }
};

export default {start, save};
