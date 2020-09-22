import React, { useContext, useState } from 'react';
import './App.css';
import Chat from './Chat/Chat';
import Sidebar from './Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { DataLayerContext } from './store/Context';
import Login from './Login/Login';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showChat, setShowChat] = useState(isMobile ? false : true);
  const [{ user }] = useContext(DataLayerContext);

  const switchToSidebarMode = () => {
    if (!isMobile) return;
    setShowSidebar(true);
    setShowChat(false);
  }

  const switchToChatMode = () => {
    if (!isMobile) return;
    setShowChat(true);
    setShowSidebar(false);
  }

  return (
    <div className="app">
      <div className="app__body">
        {!user ? <Login /> :
          <Router>
            {showSidebar && <Sidebar switchToChatMode={switchToChatMode} />}
            <Switch>
              <Route path='/chats/:id'>
                {showChat && <Chat switchToSidebarMode={switchToSidebarMode} />}
              </Route>
              {/* <Route path='/'>
                <h1>I am homescreen</h1>
              </Route> */}
            </Switch>
          </Router>
        }
      </div>
    </div>
  );
}

export default App;
