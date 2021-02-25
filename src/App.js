import { useEffect, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

// components
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import DetailPage from "./components/DetailPage";

// hooks
import useFetch from "./hooks/useFetch";

// themes

const light = {
  backgroundColor: "#FAFAFA",
  headerBackground: "#FFFFFF",
  mainTextColor: "#111517",
};

const dark = {
  backgroundColor: "#202C36",
  headerBackground: "#2B3844",
  mainTextColor: "#FFFFFF",
};

// styles

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    font-family: 'Nunito Sans', sans-serif;
  }
`;

function App() {
  const [theme, setTheme] = useState(light);
  const { data, loading, error } = useFetch();

  const toggleThemesHandler = () => {
    theme === light ? setTheme(dark) : setTheme(light);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header setTheme={toggleThemesHandler} />
      <Router>
        <Switch>
          <Route exact path="/" render={() => <MainPage countries={data} />} />
          <Route path="/:id" render={() => <DetailPage countries={data} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
