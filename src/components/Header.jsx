import React from "react";
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from './ThemeContext';
import "./Header.scss";

export default function Header() {
  const { darkTheme, toggleTheme } = useTheme();
  return (
    <header className={`${darkTheme ? 'darkTheme' : ''}`}>
        <span className={`${darkTheme ? 'darkThemeText' : ''}`}>Where in the world?</span>
        <div className={`switch_wrap ${darkTheme ? 'darkThemeText darkThemeSvg' : ''}`} onClick={toggleTheme} >
            <IoMoonOutline />
            {darkTheme ? "Light Mode" : "Dark Mode"}
        </div>
    </header>
  )
}
