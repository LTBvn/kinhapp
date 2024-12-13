import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Chat.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
const data = [
  {
    "status": "success",
    "timestamp": "2024-09-23T12:00:00Z",
    "request": {
      "user_message": "What is the meaning of life?"
    },
    "response": {
      "text": "The meaning of life is subjective and can vary from person to person. Many people find meaning through relationships, personal growth, and contributing to society. Philosophers and thinkers have debated this topic for centuries."
    },
    "metadata": {
      "model_used": "GPT-4",
      "response_time_ms": 150,
      "confidence_score": 0.95
    }
  }
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([]);
  // Lấy dữ liệu từ Redux store
  const tabCustomState = useSelector((state: RootState) => state.tabCustom);

  // Log dữ liệu ra console
  console.log('Tab Custom State:', tabCustomState);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid className='contentPage' fixed>
          <IonRow className="ion-justify-content-center ">
            <IonCol sizeSm="12" sizeMd="8" sizeLg="6" sizeXl="6">
              <IonRow className='ion-justify-content-between ion-align-items-center'>
                <IonRow className='home-appname ion-justify-content-center ion-align-items-center'>
                  <svg width="25" height="25" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.375 1.16671C29.6638 0.627124 27.7829 0.395874 25.9792 0.395874C22.9729 0.395874 19.7354 1.01254 17.5 2.70837C15.2646 1.01254 12.0271 0.395874 9.02084 0.395874C6.01459 0.395874 2.77709 1.01254 0.541672 2.70837V25.2938C0.541672 25.6792 0.927088 26.0646 1.31251 26.0646C1.46667 26.0646 1.54375 25.9875 1.69792 25.9875C3.77917 24.9855 6.78542 24.2917 9.02084 24.2917C12.0271 24.2917 15.2646 24.9084 17.5 26.6042C19.5813 25.2938 23.3583 24.2917 25.9792 24.2917C28.5229 24.2917 31.1438 24.7542 33.3021 25.9105C33.4563 25.9875 33.5333 25.9875 33.6875 25.9875C34.0729 25.9875 34.4583 25.6021 34.4583 25.2167V2.70837C33.5333 2.01462 32.5313 1.55212 31.375 1.16671ZM31.375 21.9792C29.6792 21.4396 27.8292 21.2084 25.9792 21.2084C23.3583 21.2084 19.5813 22.2105 17.5 23.5209V5.79171C19.5813 4.48129 23.3583 3.47921 25.9792 3.47921C27.8292 3.47921 29.6792 3.71046 31.375 4.25004V21.9792Z" fill="#703EFF" />
                    <path d="M25.9792 9.64587C27.3358 9.64587 28.6463 9.78462 29.8333 10.0467V7.70337C28.6154 7.47212 27.305 7.33337 25.9792 7.33337C23.3583 7.33337 20.9842 7.78046 19.0417 8.61296V11.1721C20.7838 10.1855 23.2042 9.64587 25.9792 9.64587Z" fill="#703EFF" />
                    <path d="M19.0417 12.7138V15.273C20.7838 14.2863 23.2042 13.7467 25.9792 13.7467C27.3358 13.7467 28.6463 13.8855 29.8333 14.1475V11.8042C28.6154 11.573 27.305 11.4342 25.9792 11.4342C23.3583 11.4342 20.9842 11.8967 19.0417 12.7138Z" fill="#703EFF" />
                    <path d="M25.9792 15.5505C23.3583 15.5505 20.9842 15.9975 19.0417 16.83V19.3892C20.7838 18.4025 23.2042 17.863 25.9792 17.863C27.3358 17.863 28.6463 18.0017 29.8333 18.2638V15.9205C28.6154 15.6738 27.305 15.5505 25.9792 15.5505Z" fill="#703EFF" />
                  </svg>
                  <p>App name</p></IonRow>
                <IonRow className='trypro ion-justify-content-center ion-align-items-center'>
                  <img src="/Star 15.png" alt="" /> <div className=''>Try pro</div>
                </IonRow>
              </IonRow>
              <div className='content-chat'>
                <div >
                  <div className="chat-bubble quran-verse">
                    <h2>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h2>
                    <p>In the name of Allah, the Most Gracious, the Most Merciful</p>
                    <small>(Quran 16:128)</small>
                  </div>
                  {/* MessageUser */}
                  <div className="chat-bubble user-message">
                    <p>
                      Ut sit sit turpis arcu felis cursus nullam. Fringilla amet turpis ut augue tellus imperdiet.
                    </p>
                  </div>
                  <div className="chat-bubble quran-verse">
                    <h2>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h2>
                    <p>In the name of Allah, the Most Gracious, the Most Merciful</p>
                    <small>(Quran 16:128)</small>
                  </div>
                  <div className="chat-bubble user-message">
                    <p>
                      Ut sit sit turpis
                    </p>
                  </div>
                  <div className="chat-bubble quran-verse">
                    {/* <h2>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h2> */}
                    <p>
                      In the name of Allah, the Most Gracious, the Most Merciful In the name of Allah, the Most Gracious, the Most Merciful In the name of Allah, the Most Gracious, the Most Merciful
                    </p>
                    {/* <small>(Quran 16:128)</small> */}
                    <IonRow>
                      <button className="quran-verse-btn">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.8475 11.0279C20.2675 10.4891 20.5 9.82897 20.5 9.14217C20.5 8.05249 19.8725 7.02107 18.8625 6.44589C18.6025 6.29784 18.3064 6.21992 18.005 6.22019H12.01L12.16 3.23755C12.195 2.51676 11.9325 1.83238 11.4225 1.3106C11.1722 1.05342 10.8703 0.848793 10.5353 0.709374C10.2003 0.569955 9.83946 0.498702 9.475 0.500018C8.175 0.500018 7.025 1.34943 6.68 2.5653L4.5325 10.1129H1.3C0.8575 10.1129 0.5 10.46 0.5 10.8895V19.7234C0.5 20.153 0.8575 20.5 1.3 20.5H16.3325C16.5625 20.5 16.7875 20.4563 16.995 20.3689C18.185 19.8763 18.9525 18.7478 18.9525 17.4955C18.9525 17.1897 18.9075 16.8888 18.8175 16.5976C19.2375 16.0588 19.47 15.3987 19.47 14.7119C19.47 14.4061 19.425 14.1052 19.335 13.8139C19.755 13.2752 19.9875 12.615 19.9875 11.9282C19.9825 11.6224 19.9375 11.3191 19.8475 11.0279ZM2.3 18.7526V11.8603H4.325V18.7526H2.3ZM18.21 10.1857L17.6625 10.6468L18.01 11.2633C18.1245 11.4663 18.1838 11.6943 18.1825 11.9258C18.1825 12.3262 18.0025 12.7073 17.6925 12.9694L17.145 13.4305L17.4925 14.0469C17.607 14.25 17.6663 14.478 17.665 14.7094C17.665 15.1099 17.485 15.4909 17.175 15.753L16.6275 16.2141L16.975 16.8305C17.0895 17.0336 17.1488 17.2616 17.1475 17.4931C17.1475 18.0367 16.8175 18.5269 16.3075 18.7502H5.925V11.7826L8.4125 3.03369C8.47664 2.80945 8.61433 2.61161 8.80471 2.47016C8.99508 2.3287 9.22777 2.25135 9.4675 2.2498C9.6575 2.2498 9.845 2.3032 9.995 2.41241C10.2425 2.592 10.375 2.86381 10.36 3.15261L10.12 7.96755H17.98C18.425 8.23208 18.7 8.67863 18.7 9.14217C18.7 9.5426 18.52 9.9212 18.21 10.1857Z" fill="black" />
                        </svg>
                      </button>
                      <button className="quran-verse-btn">
                        <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.5 0.5H2.5C1.4 0.5 0.5 1.4 0.5 2.5V18.5L7.5 15.5L14.5 18.5V2.5C14.5 1.4 13.6 0.5 12.5 0.5Z" fill="black" />
                        </svg>
                      </button>
                      <button className="quran-verse-btn">
                        <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 8.5H8L4 4.5L0 8.5H3C3 12.92 6.58 16.5 11 16.5C12.57 16.5 14.03 16.04 15.26 15.26L13.8 13.8C12.97 14.25 12.01 14.5 11 14.5C7.69 14.5 5 11.81 5 8.5ZM6.74 1.74L8.2 3.2C9.04 2.76 9.99 2.5 11 2.5C14.31 2.5 17 5.19 17 8.5H14L18 12.5L22 8.5L19 8.5C19 4.08 15.42 0.5 11 0.5C9.43 0.5 7.97 0.96 6.74 1.74Z" fill="black">
                          </path>
                        </svg>
                      </button>
                    </IonRow>
                  </div>

                </div>
                <footer className='footerInput'>
                  <IonRow className='inputText'>
                    <IonInput
                      placeholder="Ask something"
                      className="inputText-handle"
                    />
                    <IonRow className='ion-justify-content-center ion-align-items-center'>
                      <button className='btns-send'>
                        <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24.6654 11.5L5.06907 11.502M1.33506 0.61332L24.5212 11.0656C24.6051 11.1031 24.6764 11.1641 24.7264 11.2411C24.7763 11.3182 24.8029 11.4081 24.8029 11.5C24.8029 11.5919 24.7763 11.6818 24.7263 11.7589C24.6763 11.836 24.6051 11.897 24.5212 11.9344L1.3329 22.3914C1.2437 22.4299 1.14483 22.4403 1.04959 22.421C0.954354 22.4017 0.867316 22.3537 0.800183 22.2834C0.73305 22.2132 0.689042 22.124 0.674078 22.028C0.659114 21.932 0.673913 21.8337 0.716481 21.7463L4.86759 11.9271C4.93354 11.7951 4.96788 11.6496 4.9679 11.502C4.96791 11.3544 4.9336 11.2089 4.86768 11.0768L0.715987 1.26099C0.672091 1.1733 0.656365 1.07419 0.670963 0.977213C0.685561 0.880236 0.729769 0.790134 0.797537 0.719236C0.865304 0.648338 0.953321 0.60011 1.04954 0.58115C1.14576 0.562191 1.24548 0.573426 1.33506 0.61332Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>
                    </IonRow>
                  </IonRow>
                </footer>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};

export default Chat;
