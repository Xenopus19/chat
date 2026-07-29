import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "@/store";

type Theme = "light" | "dark";
interface ThemeState {
    theme: Theme;
}

const isTheme = (value: unknown): value is Theme => {
  return value === "light" || value === "dark";
};

const applyThemeToDOM = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");

  root.classList.add(theme);
};

const getInitialState = (): ThemeState => {
  const storageItem = localStorage.getItem('theme');
  const theme = storageItem && isTheme(storageItem) ? storageItem : "light";
  applyThemeToDOM(theme);
  return { theme};
}

const initialState: ThemeState = getInitialState();


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
        state.theme = action.payload;
        const newTheme = action.payload;
        localStorage.setItem("theme", newTheme);
        applyThemeToDOM(newTheme);
    },
  },
});

export const toggleTheme = () => {
    return (dispatch: AppDispatch, getState: () => { theme: ThemeState }) => {
        const currentTheme = getState().theme.theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        dispatch(setTheme(newTheme));
    };
};

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
