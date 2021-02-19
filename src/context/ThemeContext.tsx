import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  nextTheme,
  selectTheme,
  Theme,
  ThemeName,
} from '../common/logic/theme';

export const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

interface ThemeContextValue {
  setTheme: (name: ThemeName) => void;
  next: () => void;
  theme: Theme;
}
export const ThemeContext = createContext<ThemeContextValue>({
  setTheme: (n: ThemeName) => {
    throw new Error('No Context provider found');
  },
  next: () => {
    throw new Error('No Context provider found');
  },
  theme: selectTheme('darkLines'),
});

export const ThemeContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const query = useQuery();
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    selectTheme(query.get('theme') as ThemeName)
  );
  const updateTheme = useCallback(
    (name: ThemeName) => setCurrentTheme(selectTheme(name)),
    []
  );

  const next = useCallback(() => {
    return setCurrentTheme(nextTheme(currentTheme.name));
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme: updateTheme,
        theme: currentTheme,
        next,
      }}
      children={children}
    />
  );
};

export const useThemes = () => useContext(ThemeContext);
