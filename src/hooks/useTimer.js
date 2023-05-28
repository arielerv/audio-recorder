import {useBoolean} from 'hooks';
import {useEffect, useState} from 'react';

const UseTimer = (initialTimer = 0) => {
  const [timer, setTimer] = useState(initialTimer);
  const [pause, setPause] = useBoolean(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pause) {
        setTimer(timer + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const clear = () => {
    setTimer(0);
    setPause.off();
  };

  return [timer, {...setPause, setTimer, clear}];
};

export default UseTimer;
