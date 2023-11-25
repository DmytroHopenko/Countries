import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Main from "./components/Main";
import { ThemeProvider } from "./components/ThemeContext";
import Country from "./components/Country";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Header />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/:alpha3Code" element={<Country />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
