import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "@/store";

type Theme = "light" | "dark";
interface ThemeState {
    theme: Theme;
}

const initialState: ThemeState = { theme: "light" };


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
        state.theme = action.payload;
        const newTheme = action.payload;
        applyThemeToDOM(newTheme);
    },
  },
});

const applyThemeToDOM = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");

  root.classList.add(theme);
};

export const toggleTheme = () => {
    return (dispatch: AppDispatch, getState: () => { theme: ThemeState }) => {
        const currentTheme = getState().theme.theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        dispatch(setTheme(newTheme));
    };
};

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
