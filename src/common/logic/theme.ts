import { Map } from 'immutable';

export interface ThemeColors {
  primary: string;
  secondary: string;
}

export const baseTheme: ThemeColors = {
  primary: 'hsl(0, 0%, 10%)',
  secondary: 'hsl(0, 0%, 90%)',
};
const defaultThemeConf = {
  darkLines: {
    primary: 'hsl(0, 0%, 10%)',
    secondary: 'hsl(0, 0%, 90%)',
  },
  yellow: {
    primary: 'hsl(45, 100%, 50%)',
    secondary: 'hsl(0, 0%, 15%)',
  },
  circles: {
    primary: 'hsl(330, 100%, 45%)',
    secondary: 'hsl(0, 0%, 15%)',
  },
  waves: {
    primary: 'hsl(65, 100%, 55%)',
    secondary: 'hsl(220, 100%, 55%)',
  },
  bullets: {
    primary: 'hsl(240, 100%, 30%)',
    secondary: 'hsl(0, 0%, 100%)',
  },
  solar: {
    primary: 'hsl(0, 100%, 60%)',
    secondary: 'hsl(200, 50%, 30%)',
  },
  cubes: {
    primary: 'hsl(140, 100%, 17%)',
    secondary: 'hsl(0, 0%, 10%)',
  },
};

export type ThemeName = keyof typeof defaultThemeConf;
export const themeKeys = Object.keys(defaultThemeConf) as ThemeName[];

type ThemeEntry = [ThemeName, ThemeColors];
const themesConfig = Map<ThemeName, ThemeColors>(
  Object.entries(defaultThemeConf) as ThemeEntry[]
);

export interface Theme {
  name: ThemeName;
  config: ThemeColors;
}
export function selectTheme(name?: ThemeName): Theme {
  if (name && themesConfig.has(name)) {
    return {
      name,
      config: themesConfig.get(name, baseTheme),
    };
  }

  const randomName =
    themeKeys[Math.floor(Math.random() * (themeKeys.length - 1))];

  return {
    name: randomName,
    config: themesConfig.get(randomName, baseTheme),
  };
}

export function nextTheme(currentName: ThemeName): Theme {
  const keys = themesConfig.keySeq();
  const size = keys.size || 0;
  const currentIndex = keys.indexOf(currentName);
  const nextIndex = currentIndex >= size - 1 ? 0 : currentIndex + 1;

  return selectTheme(keys.get(nextIndex));
}
