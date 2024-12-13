import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButtons,
  IonButton,
  IonRow,
  IonGrid,
  IonCol
} from '@ionic/react';
import { language, cart, shieldCheckmark, colorPalette, mail, star, shareSocial, personCircleOutline, logOut, logOutOutline } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import './Settings.css'
import React, { useEffect, useState } from 'react';
import { getTafsirs } from '../../services/services';
import { getMe } from '../../services/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


interface Tafsir {
  language_name: string;
  name: string;
  selected: number;
}

const Settings: React.FC = () => {
  const history = useHistory();
  const [tafsirsTick, setTafsirsTick] = useState<Tafsir[]>([]);
  const [getme, setGetme] = useState<any>();
  useEffect(() => {
    const initGoogleAuth = async () => {
    try {
        await GoogleAuth.initialize();
    } catch (error) {
        console.error('Error initializing GoogleAuth: ', error);
    }
    };

    initGoogleAuth();
}, []);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const getToken = localStorage.getItem('token');
        if (getToken) {
          const me = await getMe(getToken)
          setGetme(me)
        }
        const dataTafsir = await getTafsirs();
        if (dataTafsir.length > 0) {
          const selectedTafsirs = dataTafsir.filter((i: Tafsir) => i.selected === 1);
          setTafsirsTick(selectedTafsirs);
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
        const dataTafsir = await getTafsirs();
        if (dataTafsir.length > 0) {
          const selectedTafsirs = dataTafsir.filter((i: Tafsir) => i.selected === 1);
          setTafsirsTick(selectedTafsirs);
        }
      }
    };

    fetchData();
  }, []);



  const navigateToLanguageSelection = () => {
    history.push('/select-language');
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      await GoogleAuth.signOut(); 
      history.push('/login'); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };  

  return (
    <IonPage>
      <IonGrid className='contentPage' fixed>
        <IonRow className="ion-justify-content-center">
          <IonCol sizeSm="12" sizeMd="8" sizeLg="6" sizeXl="6">
            <IonContent className='settingsPage'>
              <IonRow className='ion-justify-content-between ion-align-items-center'>
                <IonRow className='home-appname ion-justify-content-center ion-align-items-center'>
                <svg width="25" height="25" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.375 1.16671C29.6638 0.627124 27.7829 0.395874 25.9792 0.395874C22.9729 0.395874 19.7354 1.01254 17.5 2.70837C15.2646 1.01254 12.0271 0.395874 9.02084 0.395874C6.01459 0.395874 2.77709 1.01254 0.541672 2.70837V25.2938C0.541672 25.6792 0.927088 26.0646 1.31251 26.0646C1.46667 26.0646 1.54375 25.9875 1.69792 25.9875C3.77917 24.9855 6.78542 24.2917 9.02084 24.2917C12.0271 24.2917 15.2646 24.9084 17.5 26.6042C19.5813 25.2938 23.3583 24.2917 25.9792 24.2917C28.5229 24.2917 31.1438 24.7542 33.3021 25.9105C33.4563 25.9875 33.5333 25.9875 33.6875 25.9875C34.0729 25.9875 34.4583 25.6021 34.4583 25.2167V2.70837C33.5333 2.01462 32.5313 1.55212 31.375 1.16671ZM31.375 21.9792C29.6792 21.4396 27.8292 21.2084 25.9792 21.2084C23.3583 21.2084 19.5813 22.2105 17.5 23.5209V5.79171C19.5813 4.48129 23.3583 3.47921 25.9792 3.47921C27.8292 3.47921 29.6792 3.71046 31.375 4.25004V21.9792Z" fill="#703EFF" />
                    <path d="M25.9792 9.64587C27.3358 9.64587 28.6463 9.78462 29.8333 10.0467V7.70337C28.6154 7.47212 27.305 7.33337 25.9792 7.33337C23.3583 7.33337 20.9842 7.78046 19.0417 8.61296V11.1721C20.7838 10.1855 23.2042 9.64587 25.9792 9.64587Z" fill="#703EFF" />
                    <path d="M19.0417 12.7138V15.273C20.7838 14.2863 23.2042 13.7467 25.9792 13.7467C27.3358 13.7467 28.6463 13.8855 29.8333 14.1475V11.8042C28.6154 11.573 27.305 11.4342 25.9792 11.4342C23.3583 11.4342 20.9842 11.8967 19.0417 12.7138Z" fill="#703EFF" />
                    <path d="M25.9792 15.5505C23.3583 15.5505 20.9842 15.9975 19.0417 16.83V19.3892C20.7838 18.4025 23.2042 17.863 25.9792 17.863C27.3358 17.863 28.6463 18.0017 29.8333 18.2638V15.9205C28.6154 15.6738 27.305 15.5505 25.9792 15.5505Z" fill="#703EFF" />
                  </svg>
                  <p>App name</p>
                </IonRow>
                <IonRow className='trypro ion-justify-content-center ion-align-items-center'>
                  <img src="/Star 15.png" alt="Star Icon" />
                  <div>Try pro</div>
                </IonRow>
              </IonRow>
              <IonList>
                <IonItem button onClick={navigateToLanguageSelection}>
                  <IonIcon className="large-icon" icon={language} slot="start" />
                  <IonLabel>Select Tafsir</IonLabel>
                  {tafsirsTick.length > 0 ? (
                    <IonLabel slot="end">
                      {tafsirsTick[0].language_name} - {tafsirsTick[0].name}
                    </IonLabel>
                  ) : (
                    <IonLabel slot="end">Loading...</IonLabel>
                  )}
                </IonItem>

                <IonItem>
                  <IonIcon className="large-icon" icon={personCircleOutline} slot="start" />
                  <IonLabel>{getme?.email}</IonLabel>
                  <IonLabel slot="end" onClick={handleLogout}>
                    <IonIcon className="large-icon" icon={logOutOutline} slot="start" />
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>Membership & Configuration</IonLabel>
                </IonItem>
                <Link to={'/store'}>
                  <IonItem>
                    <IonIcon className="large-icon" icon={cart} slot="start" />
                    <IonLabel>Store</IonLabel>
                  </IonItem>
                </Link>
                <IonItem>
                  <IonIcon className="large-icon" icon={shieldCheckmark} slot="start" />
                  <IonLabel>GDPR Consent</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon className="large-icon" icon={colorPalette} slot="start" />
                  <IonLabel>Change Icon</IonLabel>
                </IonItem>

                <IonItem lines="none">
                  <IonLabel>Help & Support</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon className="large-icon" icon={mail} slot="start" />
                  <IonLabel>Email Us</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon className="large-icon" icon={star} slot="start" />
                  <IonLabel>Review App</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon className="large-icon" icon={shareSocial} slot="start" />
                  <IonLabel>Share this App</IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  )
};

export default Settings;
