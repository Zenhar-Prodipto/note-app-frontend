import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import NoteListPage from './pages/NoteListPage';
import NotePage from './pages/NotePage';

function App() {
  return (
    <Router>
      <div className='container dark'>
        <div className='App'>
          <Header />
          <Route path='/' exact component={NoteListPage} />
          <Route path='/note/:id' component={NotePage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
