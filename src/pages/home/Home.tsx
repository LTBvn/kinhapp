import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonNavLink,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonCheckbox,
  IonLabel
} from '@ionic/react';
import './Home.css';
import React, { useEffect, useRef, useState } from 'react';
// import Slider from '../../components/silder/Slider';
import { Link } from 'react-router-dom';
import { getVerses, getChaptersId, getTafsirsIdverse, getVerse } from '../../services/services';
import { availableTimes } from './availableTimes';
import { getData, saveData } from '../../utils/storage';
import { Share } from '@capacitor/share';

interface HomeProps {
  onIntroSeen: (seen: boolean) => void;
}

type Verse = {
  created_at: string | number | Date;
  id: string;
  text: string;
  translation?: string;
  content?: string;
  chapter_id?: string;
  verse_number?: number;
  read?: boolean;
};

type SelectedVerses = {
  [key: string]: Verse;
};

const Home: React.FC = () => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [versesNew, setVersesNew] = useState<Verse[]>([]);
  const [verseswithTime, setVerseswithTime] = useState<any>([]);
  const [chapterId, setChapterId] = useState<any>(null);
  const [tafsir, setTafsir] = useState<any>([]);
  const [localTafsir, setLocalTafsir] = useState<any>();
  const [verseRandom, setVerseRandom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [effectText, setEffectText] = useState(true);
  const [selectedVerses, setSelectedVerses] = useState<SelectedVerses>({});
  const [availableCheckboxes, setAvailableCheckboxes] = useState<string[]>([]);


  const modal = useRef<HTMLIonModalElement>(null);
  const modal2 = useRef<HTMLIonModalElement>(null);

  // lấy time hiện tại
  const getCurrentTime = () => {
    return new Date();
  };

  // hàm check thời gian hiện tại và nếu có trùng vứi thời gian set mặc định thì sẽ trả về true >>> xử lý tiếp
  const updateAvailableCheckboxes = () => {
    const currentTime = getCurrentTime();
    const updatedAvailable = availableTimes
      .filter((time) => {
        const timeDate = new Date();
        timeDate.setHours(time.hour, time.minute, 0, 0);
        return timeDate <= currentTime;
      })
      .map((time) => time.value);

    setAvailableCheckboxes(updatedAvailable);
  };

  // hàm lưu local và lưu vào stored
  const loadStoredData = async () => {
    try {
      const storedValue = await getData('selectedVerses');
      if (storedValue) {
        const storedData: SelectedVerses = JSON.parse(storedValue);
        // Initialize read status if not present
        Object.keys(storedData).forEach((key) => {
          if (storedData[key].read === undefined) {
            storedData[key].read = false;
          }
        });
        setSelectedVerses(storedData);

        const selectedVerseIds = Object.values(storedData).map((v) => v.id);
        const remainingVerses = verses.filter((v) => !selectedVerseIds.includes(v.id));
        setVersesNew(remainingVerses);
      } else {
        setVersesNew(verses);
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };


  // hành động check xử lý dữ liệu 
  const handleCheckboxChange = async (timeValue: string) => {
    const updatedSelectedVerses = { ...selectedVerses };
    if (updatedSelectedVerses[timeValue]) {
      // Toggle the read status
      updatedSelectedVerses[timeValue].read = !updatedSelectedVerses[timeValue].read;
    } else {
      // If the verse isn't selected yet, select a random verse and mark as read
      const verse = getRandomVerse();
      if (verse) {
        updatedSelectedVerses[timeValue] = { ...verse, read: true };
        setVersesNew((prev) => prev.filter((v) => v.id !== verse.id));
      }
    }

    setSelectedVerses(updatedSelectedVerses);
    await saveData('selectedVerses', JSON.stringify(updatedSelectedVerses));

  };


  // Hàm lập lịch chọn verse tại các thời gian đã định
  const scheduleVerseSelection = async () => {
    const now = new Date();
    const resetTime = new Date();
    resetTime.setHours(0, 0, 0, 0);

    if (now >= resetTime && now.getHours() === 0) {
      await saveData('selectedVerses', JSON.stringify({}));
      setSelectedVerses({});
      console.log('Selected verses have been reset at 00:00.');
      return;
    }

    for (const time of availableTimes) {
      const timeDate = new Date();
      timeDate.setHours(time.hour, time.minute, 0, 0);

      // If the time has passed and no verse is selected for this time
      if (timeDate <= now) {
        const storedValue = await getData('selectedVerses');
        const parsedData: SelectedVerses = storedValue ? JSON.parse(storedValue) : {};

        if (!parsedData[time.value]) {
          const verse = getRandomVerse();
          if (verse) {
            parsedData[time.value] = { ...verse, read: false };
            await saveData('selectedVerses', JSON.stringify(parsedData));
            setSelectedVerses(parsedData);
            setVersesNew((prev) => prev.filter((v) => v.id !== verse.id));

            // console.log(`Selected verse for time ${time.value}:`, verse);
          }
        }
      }
    }
  };



  // hàm random verse
  const getRandomVerse = (): Verse | null => {
    const randomIndex = Math.floor(Math.random() * versesNew.length);
    return versesNew[randomIndex];
  };

  const showVerseWithTime = async (time: string) => {
    try {
      const dataTime = await getData('selectedVerses');
      if (dataTime) {
        const parsedData: SelectedVerses = JSON.parse(dataTime);
        const dataFind = parsedData[time];
        if (dataFind) {
          setVerseswithTime(dataFind);
        } else {
          console.log(`Không tìm thấy verse cho thời gian: ${time}`);
          setVerseswithTime(null);
        }
      } else {
        console.log('Không có dữ liệu selectedVerses trong localStorage');
        setVerseswithTime(null);
      }
    } catch (error) {
      console.error('Lỗi khi lấy verse từ localStorage:', error);
      setVerseswithTime(null);
    }
  };
  const showVerseWithTimeNow = async () => {
    try {
      const dataTime = await getData('selectedVerses');
      const parsedData: SelectedVerses = dataTime ? JSON.parse(dataTime) : null;

      if (!parsedData) {
        console.log('Không có dữ liệu selectedVerses');
        setVerseswithTime(null);
        return;
      }

      const latestVerse = Object.values(parsedData).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];

      setVerseswithTime(latestVerse || null);
    } catch (error) {
      console.error('Lỗi khi lấy verse từ localStorage:', error);
      setVerseswithTime(null);
    }
  };

  // start chức năng random verse
  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (verseRandom) {
        try {
          const fetchedChapterId = await getChaptersId(verseRandom.chapter_id);
          setChapterId(fetchedChapterId);
          const fetchedTafsir = await getTafsirsIdverse(verseRandom.chapter_id);
          setTafsir(fetchedTafsir);
        } catch (error) {
          console.error('Error fetching additional data:', error);
        }
      }
    };

    fetchAdditionalData();
  }, [verseRandom]);
  // scheduleVerseSelection();
  // Utility function to get random element
  const getRandomElement = (array: any) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  // Initial data fetch and load stored data
  const fetchData = async () => {

    try {
      const fetchedVerses = await getVerses();
      setVerses(fetchedVerses);
      setVersesNew(fetchedVerses);
      if (fetchedVerses.length > 0) {
        setVerseRandom(getRandomElement(fetchedVerses));
        const fetchedChapterId = await getChaptersId(getRandomElement(fetchedVerses)?.chapter_id);
        setChapterId(fetchedChapterId);
        const fetchedTafsir = await getTafsirsIdverse(getRandomElement(fetchedVerses)?.chapter_id);
        setTafsir(fetchedTafsir);
      }
    } catch (error) {
      const fetchedVerses = await getVerses();
      setVerses(fetchedVerses);
      if (fetchedVerses.length > 0) {
        setVerseRandom(getRandomElement(fetchedVerses));
        const fetchedChapterId = await getChaptersId(getRandomElement(fetchedVerses)?.chapter_id);
        setChapterId(fetchedChapterId);
        const fetchedTafsir = await getTafsirsIdverse(getRandomElement(fetchedVerses)?.chapter_id);
        setTafsir(fetchedTafsir);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    showVerseWithTimeNow();
    fetchData();
  }, []);

  // Load stored data once verses are fetched
  useEffect(() => {
    if (!loading && verses.length > 0) {
      loadStoredData();
      scheduleVerseSelection();
      updateAvailableCheckboxes();

      const interval = setInterval(() => {

        updateAvailableCheckboxes();
        scheduleVerseSelection();
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [loading, verses]);

  // scheduleVerseSelection(); 

  // Ensure a random verse is selected if not already
  useEffect(() => {
    if (!loading && !verseRandom) {
      if (versesNew.length > 0) {
        setVerseRandom(getRandomVerse());
      } else {
        fetchData();
      }
    }
  }, [loading, verseRandom, versesNew]);

  // Handle random button click
  const clickRandomHam = () => {
    const dataRandom = getRandomElement(versesNew);
    setVerseRandom(dataRandom);
    setVersesNew((prev) => prev.filter((v) => v.id !== dataRandom.id));
    setSelectedVerses({});
    setEffectText(false);
    setTimeout(() => {
      setEffectText(true);
    }, 250);
  };

  // Helper to count sentence characters (optional utility)
  const sentenceCount = (text: string): number => {
    return text.length;
  };

  // Destructure text for display
  const textTranslateEn = verseRandom?.translation || '____________________';
  const textcontent = verseRandom?.content || '____________________';
  const ChapterVerse = verseRandom
    ? `${chapterId?.name || "__"} ${chapterId?.chapter_number || "__"} : ${verseRandom?.verse_number || "__"}`
    : "__ __ :__";
  const localVerse = async (idChapter: any, idVerse: any) => {
    const fetchedChapterId = await getChaptersId(idChapter);
    return `${fetchedChapterId.name || "__"} ${idChapter || "__"} : ${idVerse || "__"}`
  }

  const handleOpenModal = async (id: any) => {
    try {
      // Fetch the verse and tafsir data
      const fetchData = await getVerse(id);
      const fetchTafir = await getTafsirsIdverse(id);
      const localVerseNew = localVerse(fetchData.chapter_id, id);

      // Check if tafsir data is present before using it
      if (fetchTafir?.tafsirs?.length) {
        const tafir = fetchTafir.tafsirs[0];
        const contentTafsir = tafir?.pivot?.content;

        if (contentTafsir) {
          // Update DOM with tafsir content
          tafsirDocument(contentTafsir);
        } else {
          console.warn("No content available in tafsir");
        }
      } else {
        console.warn("No tafsir data found");
      }

      // Process the local verse asynchronously
      localVerseNew
        .then(result => {
          setLocalTafsir(result);
        })
        .catch(error => {
          console.error("Error while processing local verse:", error);
        });

    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Present the modal
    modal2.current?.present();
  };

  const tafsirDocument = (contentTafsir: any) => {
    if (contentTafsir) {
      try {
        const observer = new MutationObserver(() => {
          const element = document.querySelector<HTMLElement>('#content_tafsir');
          if (element) {
            element.innerHTML = contentTafsir;
            observer.disconnect();
          }
        });

        // Start observing changes to the DOM
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      } catch (error) {
        // Fallback in case MutationObserver fails
        const element = document.querySelector<HTMLElement>('#content_tafsir');
        if (element) {
          element.innerHTML = contentTafsir;
        }
      }
    }
  };

  const clickShareVerse = async (localChapter: any, verse: string, translate: any) => {
    try {
      await Share.share({
        title: 'Chia sẻ Câu Kinh',
        text:  `${localChapter}\n\nVerse: ${verse}\n\nTranslate: ${translate}`,
        dialogTitle: 'Chia sẻ câu kinh',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };



  return (
    <IonPage>
      <IonContent fullscreen >
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
                <Link to={'/login'} className='trypro ion-justify-content-center ion-align-items-center'>
                  <img src="/Star 15.png" alt="" /> <div className=''>Try pro</div>
                </Link>
              </IonRow>
              <IonRow className='btnAiYellow ion-justify-content-around ion-align-items-center'>
                <div className='divIconChat'>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.66666 1.66671H14.3333V11.1667H2.59291L1.66666 12.093V1.66671ZM1.66666 0.083374C0.795828 0.083374 0.0912449 0.795874 0.0912449 1.66671L0.0833282 15.9167L3.24999 12.75H14.3333C15.2042 12.75 15.9167 12.0375 15.9167 11.1667V1.66671C15.9167 0.795874 15.2042 0.083374 14.3333 0.083374H1.66666ZM3.24999 8.00004H12.75V9.58337H3.24999V8.00004ZM3.24999 5.62504H12.75V7.20837H3.24999V5.62504ZM3.24999 3.25004H12.75V4.83337H3.24999V3.25004Z" fill="white" />
                  </svg>
                </div>
                <p>Chat anything with AI / get islamic guidance</p>
              </IonRow>
              {/* <IonContent id="open-modal" expand="block"> */}
              <div className='Popup-verse'>
                <IonRow id="open-modal">
                  <IonRow className='ion-align-items-end'>
                    <div>
                      <div>Verse of day </div>
                      <div>{ChapterVerse}</div>
                    </div>
                    <div className='divImageBook'><img src="/book.png" alt="" /></div>
                  </IonRow>
                  <div className='verse-notifi'>
                    {textcontent}
                  </div>
                  <div
                    className='text-translate-EN-bla-bla typewriter'
                    id='text-translate-EN'
                    style={effectText ? { animation: `typing 3.5s steps(${sentenceCount(textTranslateEn)}, end), blink-caret .75s step-end infinite` } : {}}
                  >
                    {textTranslateEn}
                  </div>
                </IonRow>
                <IonRow className='verse-under ion-justify-content-start'>
                  <button className='popup-verse-btn' onClick={clickRandomHam}>
                    <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 8.5H8L4 4.5L0 8.5H3C3 12.92 6.58 16.5 11 16.5C12.57 16.5 14.03 16.04 15.26 15.26L13.8 13.8C12.97 14.25 12.01 14.5 11 14.5C7.69 14.5 5 11.81 5 8.5ZM6.74 1.74L8.2 3.2C9.04 2.76 9.99 2.5 11 2.5C14.31 2.5 17 5.19 17 8.5H14L18 12.5L22 8.5L19 8.5C19 4.08 15.42 0.5 11 0.5C9.43 0.5 7.97 0.96 6.74 1.74Z" fill="black" />
                    </svg>
                  </button>
                  <button className='popup-verse-btn' onClick={() => clickShareVerse(ChapterVerse, textcontent, textTranslateEn)}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.5 16.12C17.74 16.12 17.06 16.42 16.54 16.89L9.41 12.74C9.46 12.51 9.5 12.28 9.5 12.04C9.5 11.8 9.46 11.57 9.41 11.34L16.46 7.23004C17 7.73004 17.71 8.04004 18.5 8.04004C20.16 8.04004 21.5 6.70004 21.5 5.04004C21.5 3.38004 20.16 2.04004 18.5 2.04004C16.84 2.04004 15.5 3.38004 15.5 5.04004C15.5 5.28004 15.54 5.51004 15.59 5.74004L8.54 9.85004C8 9.35004 7.29 9.04004 6.5 9.04004C4.84 9.04004 3.5 10.38 3.5 12.04C3.5 13.7 4.84 15.04 6.5 15.04C7.29 15.04 8 14.73 8.54 14.23L15.66 18.39C15.61 18.6 15.58 18.82 15.58 19.04C15.58 20.65 16.89 21.96 18.5 21.96C20.11 21.96 21.42 20.65 21.42 19.04C21.42 17.43 20.11 16.12 18.5 16.12ZM18.5 4.04004C19.05 4.04004 19.5 4.49004 19.5 5.04004C19.5 5.59004 19.05 6.04004 18.5 6.04004C17.95 6.04004 17.5 5.59004 17.5 5.04004C17.5 4.49004 17.95 4.04004 18.5 4.04004ZM6.5 13.04C5.95 13.04 5.5 12.59 5.5 12.04C5.5 11.49 5.95 11.04 6.5 11.04C7.05 11.04 7.5 11.49 7.5 12.04C7.5 12.59 7.05 13.04 6.5 13.04ZM18.5 20.06C17.95 20.06 17.5 19.61 17.5 19.06C17.5 18.51 17.95 18.06 18.5 18.06C19.05 18.06 19.5 18.51 19.5 19.06C19.5 19.61 19.05 20.06 18.5 20.06Z" fill="black" />
                    </svg>
                  </button>
                </IonRow>
              </div>
              {/* </IonContent> */}
              <div className='Popup-Salah-Recitations'>
                <IonRow className='ion-align-items-end'>
                  <div>
                    <div className='text-bold'>Salah Recitations</div>
                  </div>
                  <div className='divImagehand'><img src="/hand.png" alt="" /></div>
                </IonRow>
                <IonRow className='content-Salah-Recitation'>
                  <div className='TimeParent'>
                    {availableTimes.map(time => (
                      <div key={time.value} className='input-time' onClick={() => showVerseWithTime(time.value)}>
                        <IonLabel className='numberTime'>{time.label}</IonLabel>
                        <IonCheckbox
                          slot="start"
                          className='radio-icon'
                          checked={selectedVerses[time.value]?.read || false}
                          onIonChange={() => handleCheckboxChange(time.value)}
                          disabled={!availableCheckboxes.includes(time.value)}
                        />
                      </div>
                    ))}
                  </div>
                  {verseswithTime ?
                    <>
                      <button className='Salah-Recitation-btnRead' onClick={() => handleOpenModal(verseswithTime.id)}>
                        <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.625 1C21.3762 0.60625 20.0037 0.4375 18.6875 0.4375C16.4937 0.4375 14.1313 0.8875 12.5 2.125C10.8687 0.8875 8.50625 0.4375 6.3125 0.4375C4.11875 0.4375 1.75625 0.8875 0.125 2.125V18.6062C0.125 18.8875 0.40625 19.1687 0.6875 19.1687C0.8 19.1687 0.85625 19.1125 0.96875 19.1125C2.4875 18.3813 4.68125 17.875 6.3125 17.875C8.50625 17.875 10.8687 18.325 12.5 19.5625C14.0188 18.6062 16.775 17.875 18.6875 17.875C20.5437 17.875 22.4563 18.2125 24.0312 19.0562C24.1438 19.1125 24.2 19.1125 24.3125 19.1125C24.5938 19.1125 24.875 18.8313 24.875 18.55V2.125C24.2 1.61875 23.4688 1.28125 22.625 1ZM22.625 16.1875C21.3875 15.7938 20.0375 15.625 18.6875 15.625C16.775 15.625 14.0188 16.3562 12.5 17.3125V4.375C14.0188 3.41875 16.775 2.6875 18.6875 2.6875C20.0375 2.6875 21.3875 2.85625 22.625 3.25V16.1875Z" fill="black" />
                          <path d="M18.6875 7.1875C19.6775 7.1875 20.6338 7.28875 21.5 7.48V5.77C20.6112 5.60125 19.655 5.5 18.6875 5.5C16.775 5.5 15.0425 5.82625 13.625 6.43375V8.30125C14.8962 7.58125 16.6625 7.1875 18.6875 7.1875Z" fill="black" />
                          <path d="M13.625 9.42625V11.2937C14.8962 10.5737 16.6625 10.18 18.6875 10.18C19.6775 10.18 20.6338 10.2813 21.5 10.4725V8.7625C20.6112 8.59375 19.655 8.4925 18.6875 8.4925C16.775 8.4925 15.0425 8.83 13.625 9.42625Z" fill="black" />
                          <path d="M18.6875 11.4962C16.775 11.4962 15.0425 11.8225 13.625 12.43V14.2975C14.8962 13.5775 16.6625 13.1837 18.6875 13.1837C19.6775 13.1837 20.6338 13.285 21.5 13.4763V11.7662C20.6112 11.5862 19.655 11.4962 18.6875 11.4962Z" fill="black" />
                        </svg>
                        <p className='re-schedule Start-Compass'>re-schedule</p>
                      </button>

                      <div className='verse-notifi'>
                        {verseswithTime?.content}
                      </div>
                      <div className='text-translate-EN'>
                        {verseswithTime?.translation}
                      </div>
                    </>
                    : ""}
                </IonRow>
              </div>
              <div className='popup-Qibla-Compass'>
                <IonRow className='ion-align-items-end'>
                  <div>
                    <div className='text-bold'>Qibla Compass</div>
                    <div className='Compass-textsm'>Get Qibla location</div>
                  </div>
                  <div className='divImagecompass'><img src="/compasshome.png" alt="" /></div>
                </IonRow>
                <Link to={'/compass'} className='Salah-btnStart-Compass'>
                  <p className='re-schedule Start-Compass'>Start Compass</p>
                </Link>
              </div>

              <IonModal ref={modal} trigger="open-modal" initialBreakpoint={1} breakpoints={[0, 1]}>
                <div className="block">
                  <IonContent fullscreen>
                    <IonRow className='Blockcontent ion-justify-content-center ion-align-items-center'>
                      <div className='content-main'>
                        <div className='content-main-quran'>
                          <h1>{textcontent}</h1>
                        </div>
                        <div className='content-main-en'>
                          {textTranslateEn}
                        </div>
                        <div className='content-main-cate'>
                          {ChapterVerse}
                        </div>
                      </div>
                    </IonRow>
                  </IonContent>
                  <IonFooter className='ion-padding-vertical'>
                    <IonRow className='ion-justify-content-around'>
                      <button className='content-main-btnshare' >
                        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.5 14.62C14.74 14.62 14.06 14.92 13.54 15.39L6.41 11.24C6.46 11.01 6.5 10.78 6.5 10.54C6.5 10.3 6.46 10.07 6.41 9.84004L13.46 5.73004C14 6.23004 14.71 6.54004 15.5 6.54004C17.16 6.54004 18.5 5.20004 18.5 3.54004C18.5 1.88004 17.16 0.540039 15.5 0.540039C13.84 0.540039 12.5 1.88004 12.5 3.54004C12.5 3.78004 12.54 4.01004 12.59 4.24004L5.54 8.35004C5 7.85004 4.29 7.54004 3.5 7.54004C1.84 7.54004 0.5 8.88004 0.5 10.54C0.5 12.2 1.84 13.54 3.5 13.54C4.29 13.54 5 13.23 5.54 12.73L12.66 16.89C12.61 17.1 12.58 17.32 12.58 17.54C12.58 19.15 13.89 20.46 15.5 20.46C17.11 20.46 18.42 19.15 18.42 17.54C18.42 15.93 17.11 14.62 15.5 14.62ZM15.5 2.54004C16.05 2.54004 16.5 2.99004 16.5 3.54004C16.5 4.09004 16.05 4.54004 15.5 4.54004C14.95 4.54004 14.5 4.09004 14.5 3.54004C14.5 2.99004 14.95 2.54004 15.5 2.54004ZM3.5 11.54C2.95 11.54 2.5 11.09 2.5 10.54C2.5 9.99004 2.95 9.54004 3.5 9.54004C4.05 9.54004 4.5 9.99004 4.5 10.54C4.5 11.09 4.05 11.54 3.5 11.54ZM15.5 18.56C14.95 18.56 14.5 18.11 14.5 17.56C14.5 17.01 14.95 16.56 15.5 16.56C16.05 16.56 16.5 17.01 16.5 17.56C16.5 18.11 16.05 18.56 15.5 18.56Z" fill="black" />
                        </svg>
                      </button>
                      <button className='content-main-btnchat'>
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.16667 2.16659H15.5V13.1666H3.14167L2.16667 14.2391V2.16659ZM2.16667 0.333252C1.25 0.333252 0.508337 1.15825 0.508337 2.16659L0.500004 18.6666L3.83334 14.9999H15.5C16.4167 14.9999 17.1667 14.1749 17.1667 13.1666V2.16659C17.1667 1.15825 16.4167 0.333252 15.5 0.333252H2.16667ZM3.83334 9.49992H10.5V11.3333H3.83334V9.49992ZM3.83334 6.74992H13.8333V8.58325H3.83334V6.74992ZM3.83334 3.99992H13.8333V5.83325H3.83334V3.99992Z" fill="white" />
                        </svg>
                        Ask AI
                      </button>
                      <div className='content-main-cate'>
                        <div className='content-main-cate'>

                        </div>
                      </div>
                      <button className='content-main-btnread'>
                        Tafsir
                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.4167 0.5C14.5842 0.2375 13.6692 0.125 12.7917 0.125C11.3292 0.125 9.75417 0.425 8.66667 1.25C7.57917 0.425 6.00417 0.125 4.54167 0.125C3.07917 0.125 1.50417 0.425 0.416672 1.25V12.2375C0.416672 12.425 0.604172 12.6125 0.791672 12.6125C0.866672 12.6125 0.904172 12.575 0.979172 12.575C1.99167 12.0875 3.45417 11.75 4.54167 11.75C6.00417 11.75 7.57917 12.05 8.66667 12.875C9.67917 12.2375 11.5167 11.75 12.7917 11.75C14.0292 11.75 15.3042 11.975 16.3542 12.5375C16.4292 12.575 16.4667 12.575 16.5417 12.575C16.7292 12.575 16.9167 12.3875 16.9167 12.2V1.25C16.4667 0.9125 15.9792 0.6875 15.4167 0.5ZM15.4167 10.625C14.5917 10.3625 13.6917 10.25 12.7917 10.25C11.5167 10.25 9.67917 10.7375 8.66667 11.375V2.75C9.67917 2.1125 11.5167 1.625 12.7917 1.625C13.6917 1.625 14.5917 1.7375 15.4167 2V10.625Z" fill="black" />
                          <path d="M12.7917 4.625C13.4517 4.625 14.0892 4.6925 14.6667 4.82V3.68C14.0742 3.5675 13.4367 3.5 12.7917 3.5C11.5167 3.5 10.3617 3.7175 9.41667 4.1225V5.3675C10.2642 4.8875 11.4417 4.625 12.7917 4.625Z" fill="black" />
                          <path d="M9.41667 6.1175V7.3625C10.2642 6.8825 11.4417 6.62 12.7917 6.62C13.4517 6.62 14.0892 6.6875 14.6667 6.815V5.675C14.0742 5.5625 13.4367 5.495 12.7917 5.495C11.5167 5.495 10.3617 5.72 9.41667 6.1175Z" fill="black" />
                          <path d="M12.7917 7.4975C11.5167 7.4975 10.3617 7.715 9.41667 8.12V9.365C10.2642 8.885 11.4417 8.6225 12.7917 8.6225C13.4517 8.6225 14.0892 8.69 14.6667 8.8175V7.6775C14.0742 7.5575 13.4367 7.4975 12.7917 7.4975Z" fill="black" />
                        </svg>
                      </button>
                      <button className='content-main-btnshare'>
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 5.5C2.25 2.73857 4.48858 0.5 7.25 0.5H15C17.7614 0.5 20 2.73858 20 5.5V13.5C20 16.2614 17.7614 18.5 15 18.5H1C0.632506 18.5 0.29462 18.2984 0.120042 17.975C-0.0545365 17.6517 -0.0376755 17.2586 0.163953 16.9513L1.75815 14.5221C2.07904 14.0331 2.25 13.461 2.25 12.8761V5.5ZM7.25 2.5C5.59315 2.5 4.25 3.84314 4.25 5.5V12.8761C4.25 13.8509 3.96506 14.8044 3.43024 15.6194L2.85235 16.5H15C16.6569 16.5 18 15.1569 18 13.5V5.5C18 3.84315 16.6569 2.5 15 2.5H7.25Z" fill="black" />
                        </svg>
                      </button>
                    </IonRow>
                  </IonFooter>
                </div>
              </IonModal>

              <IonModal ref={modal2} trigger="open-modal2" initialBreakpoint={1} breakpoints={[0, 1]}>
                <div className="block">
                  <IonContent fullscreen>
                    <IonRow className='Blockcontent ion-justify-content-center ion-align-items-center'>
                      <div className='content-main'>
                        <div className='content-main-quran'>
                          {verseswithTime?.content}
                        </div>
                        <div className='content-main-en'>
                          {verseswithTime?.translation}
                        </div>
                        <div className='content-main-en'>
                          {localTafsir}
                        </div>
                        Tafsir
                        <div className='content-main-en' id='content_tafsir'>
                        </div>
                      </div>
                    </IonRow>
                  </IonContent>
                  <IonFooter className='ion-padding-vertical'>
                    <IonRow className='ion-justify-content-around'>
                      {/* Buttons for sharing, chatting, etc. */}
                      {/* Keep your existing buttons here */}
                    </IonRow>
                  </IonFooter>
                </div>
              </IonModal>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  )
};

export default Home;
