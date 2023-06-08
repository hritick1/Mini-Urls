import './App.css';
import Analytics from './components/Analytics';
import Home from './components/Home';
import { BrowserRouter as Router , Route,Routes} from 'react-router-dom/dist';

function App() {
  return (
 <>
<Router>
  <Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/analytics' element={<Analytics/>}></Route>
  </Routes>
 
 </Router>
 </>
  );
}

export default App;
