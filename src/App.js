import React , {useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import {getAuth , createUserWithEmailAndPassword} from 'firebase/auth'
import { useStateValue } from './StateProvider';

function App() {
  const [{}, dispatch] = useStateValue();
  const auth = getAuth();
  useEffect(() =>{
    auth.onAuthStateChanged(authUser =>{
      console.log('user is ' , authUser);

      if(authUser){
        // user has logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        // user has logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  } , [])

  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path='/login' element={<>
            <Login/>
        </>} />
        <Route path='/checkout' element={<>
            <Header/>
            <Checkout/>
          </>} />
          <Route path='/' element={<>
            <Header/>
            <Home/>
          </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
