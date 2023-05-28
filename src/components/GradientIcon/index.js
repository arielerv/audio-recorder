import {IconContext} from 'react-icons';

const GradientIcon = ({icon: Icon}) => (
  <svg width="20" height="20">
    <defs>
      <linearGradient id="gradient-icon" gradientTransform="rotate(75)">
        <stop offset="50%" stopColor="#0000003D" />
        <stop offset="50%" stopColor="grey" />
      </linearGradient>
    </defs>
    <IconContext.Provider value={{attr: {fill: "url('#gradient-icon')"}}}>
      <Icon />
    </IconContext.Provider>
  </svg>
);

export default GradientIcon;
