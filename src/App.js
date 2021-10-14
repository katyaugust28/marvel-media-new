import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { RegistrationView } from './registration-view/registration-view';
import { LoginView } from "./login-view/login-view"
import { MainView } from "./main-view/main-view"
import { MovieView } from './movie-view/movie-view';

function App() {
  return (
    <BrowserRouter>
      <Route exact={true} path="/">
        <LoginView />
      </Route>
      <Route path="/register" exact={true} >
        <RegistrationView />
      </Route>
      <Route path="/movies" exact={true} >
        <MainView></MainView>
      </Route>
      <Route path="/movie-view/:id" exact={true} >
        <MovieView></MovieView>
      </Route>
    </BrowserRouter>
  );
}

export default App;
