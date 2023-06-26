import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Home } from './components/home';
import { Category} from './components/category';


function App() {


  return (
    <Router>
      <Routes>
        
          <Route path='/' element={<Home />}/>
          <Route path='/category/:categoryName' element={<Category />}/>
        
      </Routes>
    </Router>
  )
}

export default App
