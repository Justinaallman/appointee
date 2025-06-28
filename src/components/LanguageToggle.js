import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import useFontDirection from '@/hooks/useFontDirection';

const FlagSwitch = styled(Switch)(({ language }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('/images/USA.svg')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#fff',
    width: 32,
    height: 32,
    position: 'relative',
    borderRadius: '50%',
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: `url('${language === 'fa' ? '/images/iran.svg' : '/images/USA.svg'}')`,
      borderRadius: '50%',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 30,
  },
}));

export default function LanguageToggle({ value, onChange }) {
  const [language, setLanguage] = useState(value || 'fa');

  useFontDirection(language);

  const handleChange = (event) => {
    const newLang = event.target.checked ? 'en' : 'fa';
    setLanguage(newLang);
    if (onChange) onChange(newLang);
  };

  useEffect(() => {
    setLanguage(value);
  }, [value]);

  return (
    <FlagSwitch
      checked={language === 'en'}
      onChange={handleChange}
      language={language}
      inputProps={{ 'aria-label': 'language switch' }}
    />
  );
}