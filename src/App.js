import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import TodoTasks from './components/TodoTasks';
import FinishedTasks from './components/FinishedTasks';
import Lists from './components/Lists';
import { CssBaseline, Container } from '@material-ui/core';
import { connect } from 'react-redux';


function App() {
  return (
    <div>
      <BrowserRouter>
      
        <div style={{float: 'left', 'width':"30%"}}>
          <Header />
        </div>
      
        <div style={{float: 'left', marginTop: '50px', padding: '30px'}}>
          <CssBaseline />
          <Container maxWidth="sm">
            <Lists />
              <Switch>
                <Route path='/todotasks' component={TodoTasks}/>
                <Route path='/finishedTasks' component={FinishedTasks}/>
              </Switch>                
          </Container>
        </div>

      </BrowserRouter>
    </div>
  );
}

function Header (props){

  const [isOpened, setIsOpened] = useState(false); 

  return(
      <nav>
          <div className="menuToggle">
              <input type="checkbox"   onClick={()=>setIsOpened(!isOpened)}/>
              
              <span className={isOpened?'isOpened first':'first'}></span>
              <span className={isOpened?'isOpened second':'second'} id='second'></span>
              <span className={isOpened?'isOpened third':'third'} id='third'></span>
              
                <ul className="menu">
                  <li><Link to='/todotasks'  onClick={()=>setIsOpened(!isOpened)}>TODO tasks</Link></li>
                  <li><Link to='/finishedTasks'  onClick={()=>setIsOpened(!isOpened)}>Finished tasks</Link></li>
                </ul>
          </div>
      </nav>
      );
}
export default connect(
  state => ({
    todolists: state.todolists
  }),
  dispatch => ({
    addList: list => {
      dispatch({ type: "ADD_LIST", data: list });
    }
  }))(App);
