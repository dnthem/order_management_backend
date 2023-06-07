import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const updateValue = (newValue) => {
    setValue((pre) => (typeof newValue === 'function' ? newValue(pre) : newValue));
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
};

export default useLocalStorage;