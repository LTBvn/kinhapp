import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { RootState } from './redux/store';

import Home from './pages/home/Home';
import Chat from './pages/chat/Chat';
import Chapters from './pages/chapters/Chapters';
import Read from './pages/read/Read';
import Settings from './pages/settings/Settings';
import Compass from './pages/compass/Compass';
import LanguagePage from './pages/Languagepage/language';
import Login from './pages/Login/Login';
import Store from './pages/store/store';
import Verse from './pages/verse/verse';
import Register from './pages/Register/Register';
import dataIcon from './components/dataIcon';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import store from './redux/store';


setupIonicReact();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [introSeen, setIntroSeen] = useState(true);

  const clicActive = (href: string) => {
    setActiveTab(href);
  };


  // Callback function để nhận dữ liệu từ component Home
  const handleIntroSeen = (seen: boolean) => {
    setIntroSeen(seen);
  };
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter >
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" >
                <Home />
              </Route>
              <Route exact path="/chat">
                <Chat />
              </Route>
              <Route exact path="/read/:idchapters/:id">
                <Read />
              </Route>
              <Route exact path="/chapters">
                <Chapters />
              </Route>
              <Route exact path="/store">
                <Store />
              </Route>
              <Route exact path="/verse/:id">
                <Verse />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route exact path="/compass">
                <Compass />
              </Route>
              <Route exact path="/login">
                <Login onIntroSeen={handleIntroSeen} />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/select-language">
                <LanguagePage />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom" className='tabbar'>
              <IonTabButton tab="home" href="/home" onClick={() => clicActive('home')}
                className={activeTab === 'home' ? 'activeTabbar' : ''}>
                <div
                  className="IconTabbar"
                  dangerouslySetInnerHTML={{
                    __html: activeTab === dataIcon[0].href ? dataIcon[0].svgActive : dataIcon[0].svg
                  }}
                />
                <IonLabel className='TextIcon'>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="chat" href="/chat" onClick={() => clicActive('chat')}
                className={activeTab === 'chat' ? 'activeTabbar' : ''}>
                <div
                  className="IconTabbar"
                  dangerouslySetInnerHTML={{
                    __html: activeTab === dataIcon[1].href ? dataIcon[1].svgActive : dataIcon[1].svg
                  }}
                />
                <IonLabel className='TextIcon'>Chat</IonLabel>
              </IonTabButton>
              <IonTabButton tab="read" href="/read/verses/all" onClick={() => clicActive('read')}
                className={activeTab === 'read' ? 'activeTabbar' : ''}>
                <div
                  className="IconTabbar"
                  dangerouslySetInnerHTML={{
                    __html: activeTab === dataIcon[2].href ? dataIcon[2].svgActive : dataIcon[2].svg
                  }}
                />
                <IonLabel className='TextIcon'>Read</IonLabel>
              </IonTabButton>
              <IonTabButton tab="settings" href="/settings" onClick={() => clicActive('settings')}
                className={activeTab === 'settings' ? 'activeTabbar' : ''}>
                <div
                  className="IconTabbar"
                  dangerouslySetInnerHTML={{
                    __html: activeTab === dataIcon[3].href ? dataIcon[3].svgActive : dataIcon[3].svg
                  }}
                />
                <IonLabel className='TextIcon'>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </Provider >
  );
};

export default App;