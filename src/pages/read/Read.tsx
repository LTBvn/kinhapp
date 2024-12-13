import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonLoading, IonModal, IonPage, IonRow, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Read.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getVersesIdchapter, getVerses, getTafsirsIdverse, getVerse, getChaptersId, getBookmarkedVersesByChapter, bookmarks, deleteBookmarks } from '../../services/services';
interface Verse {
  chapter_id: number;
  verse_number: number;
  content: string;
  transcription: string;
  translation: string;
}

interface Verses {
  id: number;
  verse_number: number;
  content: string;
  transcription: string;
  translation: string;
  chapter_id: number;
  created_at: string;
  updated_at: string;
}

const Read: React.FC = () => {

  const { id } = useParams<{ id: any }>();
  const { idchapters } = useParams<{ idchapters: string }>();
  const [verses, setVerses] = useState<any>([]);
  const [verseDetal, setVerse] = useState<any>();
  const [booksmark, setBooksmark] = useState<any>([]);
  const [tafsirIdverse, setTafsirIdverse] = useState<any>([]);
  const [chapter, setChapter] = useState<any>();
  const [chapterMain, setChapterMain] = useState<any>();
  const [contentTafsir, setContentTafsir] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      let hasData = false;

      try {
        while (!hasData) {
          try {
            if (idchapters === 'verses' && id === 'all') {
              const dataVerse = await getVerses();
              if (dataVerse) {
                setVerses(dataVerse);
                setChapterMain([]);
                hasData = true;
              }
            } else {
              const [dataVerse, dataChapterMain] = await Promise.all([
                getVersesIdchapter(idchapters),
                getChaptersId(idchapters),
              ]);

              if (dataVerse && dataChapterMain) {

                setVerses(dataVerse);
                setChapterMain(dataChapterMain);

                const dataBookmark = await getBookmarkedVersesByChapter(idchapters);
                setBooksmark(dataBookmark);

                hasData = true;
              }
            }
          } catch (error) {
            console.error('Error fetching data from API:', error);
            setError('Đã xảy ra lỗi khi tải dữ liệu. Đang thử lại...');

            // Thời gian chờ trước khi thử lại
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 giây
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('Đã xảy ra lỗi không mong muốn.');
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, [id, idchapters]);


  const activeChater = (e: any) => {
    const parentElement = e.currentTarget;
    const children = parentElement.parentElement;

    const headerChildren = children.children;
    headerChildren[0].classList.toggle('hidden');
    headerChildren[1].classList.toggle('hidden');
    headerChildren[1].classList.toggle('contentShowPopup');
  }
  const modal = useRef<HTMLIonModalElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal2 = async (verseNumber: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const dataTafsir = await getTafsirsIdverse(verseNumber);
      setTafsirIdverse(dataTafsir.tafsirs);
      if (!dataTafsir.tafsirs) {
        if (dataTafsir.tafsirs.length > 0) {
          const verseId = dataTafsir.tafsirs[0].pivot.verse_id;
          const content = dataTafsir.tafsirs[0].pivot.content;
          setContentTafsir(content);
          const dataVerse = await getVerse(verseId);
          const dataChaptersId = await getChaptersId(dataVerse.chapter_id);
          setChapter(dataChaptersId);
          setVerse(dataVerse);
        } else {
          setVerse(null);
        }
      } else {
        console.log('Tafsir chưa có dữ liệu');
      }
      setIsModalOpen2(true);
    } catch (error) {
      console.error('Error fetching Tafsir or Verse:', error);
      setError('Đã xảy ra lỗi khi tải dữ liệu.');
    } finally {
      setIsLoading(false);
    }
  };

  const clickBooksmask = async (id: any) => {
    try {
      await bookmarks(id);
      const dataBookmark = await getBookmarkedVersesByChapter(idchapters);
      setBooksmark(dataBookmark);
      setAlertMessage('Bookmarked successfully!');
      setShowAlert(true);
    } catch (error) {
      setAlertMessage('This bookmark already exists.');
      setShowAlert(true);
    }
  };

  const clickDeleteBooksmask = async (id: any) => {
    try {
      await deleteBookmarks(id);
      const updatedBookmarks = await getBookmarkedVersesByChapter(idchapters);
      setBooksmark(updatedBookmarks);
      setAlertMessage('Unbookmarked successfully!');
      setShowAlert(true);
    } catch (error: any) {
      setAlertMessage('try again!!');
    }
  };


  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  if (contentTafsir) {
    try {
      const observer = new MutationObserver(() => {
        const element = document.querySelector<HTMLElement>('#content_tafsir');
        if (element) {
          element.innerHTML = contentTafsir;
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    } catch (error) {
      const element = document.querySelector<HTMLElement>('#content_tafsir');
      if (element) {
        element.innerHTML = contentTafsir;
      }
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid className='contentPage' fixed>
          <IonRow className="ion-justify-content-center ">
            <IonCol sizeSm="12" sizeMd="8" sizeLg="6" sizeXl="6">
              {loading ? (
                <IonLoading isOpen={loading} message={'Loading...'} />
              ) : (
                <>
                  <div className='headerReadParent'>
                    <IonRow className='headerRead ion-justify-content-between ion-align-items-center'>
                      <Link to={'/chapters'}>
                        <IonRow className='h-r-chapters ion-align-items-center'>
                          {chapterMain && chapterMain.name ? (
                            <p>{chapterMain.name}</p>
                          ) : (
                            <p>All verses</p>
                          )}
                          <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0L5 5L0 0L10 0Z" fill="black" />
                          </svg>
                        </IonRow>
                      </Link>
                      <IonRow>
                        <IonRow onClick={openModal} className="h-r-chapters-btn">
                          <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 0.5H2.5C1.4 0.5 0.5 1.4 0.5 2.5V18.5L7.5 15.5L14.5 18.5V2.5C14.5 1.4 13.6 0.5 12.5 0.5Z" fill="black" />
                          </svg>
                        </IonRow>
                        <button className="h-r-chapters-btn-2">
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 0.5L14.8 2.8L11.91 5.67L13.33 7.09L16.2 4.2L18.5 6.5V0.5H12.5ZM0.5 6.5L2.8 4.2L5.67 7.09L7.09 5.67L4.2 2.8L6.5 0.5H0.5V6.5ZM6.5 18.5L4.2 16.2L7.09 13.33L5.67 11.91L2.8 14.8L0.5 12.5V18.5H6.5ZM18.5 12.5L16.2 14.8L13.33 11.91L11.91 13.33L14.8 16.2L12.5 18.5H18.5V12.5Z" fill="black" />
                          </svg>
                        </button>
                      </IonRow>
                    </IonRow>
                  </div>
                  <div className='listContentChapter' >
                    {
                      verses.map((verse: Verses, index: number) => (
                        <div className={`contentchapter ${verse.verse_number == id ? 'activeChapter' : ''}`} >
                          <IonRow className='ion-justify-content-between ion-align-items-center'>
                            <div className='showPopup'>
                              <IonRow onClick={(e) => activeChater(e)} >
                                <button className="h-r-chapters-btn">
                                  <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" fill="black" />
                                  </svg>
                                </button>
                              </IonRow>
                              {/* contentShowPopup */}
                              <IonRow className='contentShowPopupActive hidden' >
                                <button className="h-r-chapters-btn" onClick={() => clickBooksmask(verse.id)}>
                                  <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0.5H2C0.9 0.5 0 1.4 0 2.5V18.5L7 15.5L14 18.5V2.5C14 1.4 13.1 0.5 12 0.5ZM12 15.5L7 13.32L2 15.5V2.5H12V15.5Z" fill="black" />
                                  </svg>
                                </button>
                                <button className="h-r-chapters-btn" onClick={() => openModal2(verse.verse_number)}>
                                  <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.8182 0.558824C20.6073 0.167647 19.2764 0 18 0C15.8727 0 13.5818 0.447059 12 1.67647C10.4182 0.447059 8.12727 0 6 0C3.87273 0 1.58182 0.447059 0 1.67647V18.05C0 18.3294 0.272727 18.6088 0.545455 18.6088C0.654545 18.6088 0.709091 18.5529 0.818182 18.5529C2.29091 17.8265 4.41818 17.3235 6 17.3235C8.12727 17.3235 10.4182 17.7706 12 19C13.4727 18.05 16.1455 17.3235 18 17.3235C19.8 17.3235 21.6545 17.6588 23.1818 18.4971C23.2909 18.5529 23.3455 18.5529 23.4545 18.5529C23.7273 18.5529 24 18.2735 24 17.9941V1.67647C23.3455 1.17353 22.6364 0.838235 21.8182 0.558824ZM21.8182 15.6471C20.6182 15.2559 19.3091 15.0882 18 15.0882C16.1455 15.0882 13.4727 15.8147 12 16.7647V3.91176C13.4727 2.96176 16.1455 2.23529 18 2.23529C19.3091 2.23529 20.6182 2.40294 21.8182 2.79412V15.6471Z" fill="black" />
                                    <path d="M18 6.70588C18.96 6.70588 19.8873 6.80647 20.7273 6.99647V5.29765C19.8655 5.13 18.9382 5.02941 18 5.02941C16.1455 5.02941 14.4655 5.35353 13.0909 5.95706V7.81235C14.3236 7.09706 16.0364 6.70588 18 6.70588Z" fill="black" />
                                    <path d="M13.0909 8.93V10.7853C14.3236 10.07 16.0364 9.67882 18 9.67882C18.96 9.67882 19.8873 9.77941 20.7273 9.96941V8.27059C19.8655 8.10294 18.9382 8.00235 18 8.00235C16.1455 8.00235 14.4655 8.33765 13.0909 8.93Z" fill="black" />
                                    <path d="M18 10.9865C16.1455 10.9865 14.4655 11.3106 13.0909 11.9141V13.7694C14.3236 13.0541 16.0364 12.6629 18 12.6629C18.96 12.6629 19.8873 12.7635 20.7273 12.9535V11.2547C19.8655 11.0759 18.9382 10.9865 18 10.9865Z" fill="black" />
                                  </svg>
                                </button>
                                <button className="h-r-chapters-btn">
                                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 5.5C2.25 2.73857 4.48858 0.5 7.25 0.5H15C17.7614 0.5 20 2.73858 20 5.5V13.5C20 16.2614 17.7614 18.5 15 18.5H1C0.632506 18.5 0.29462 18.2984 0.120042 17.975C-0.0545365 17.6517 -0.0376755 17.2586 0.163953 16.9513L1.75815 14.5221C2.07904 14.0331 2.25 13.461 2.25 12.8761V5.5ZM7.25 2.5C5.59315 2.5 4.25 3.84314 4.25 5.5V12.8761C4.25 13.8509 3.96506 14.8044 3.43024 15.6194L2.85235 16.5H15C16.6569 16.5 18 15.1569 18 13.5V5.5C18 3.84315 16.6569 2.5 15 2.5H7.25Z" fill="black" />
                                  </svg>
                                </button>
                              </IonRow>
                            </div>
                            <button className="h-r-chapters-number">
                              {verse.verse_number}
                            </button>
                          </IonRow>
                          <div className='verse-notifi-chapters'>
                            {verse.content}
                          </div>
                          <div className='text-translate-EN text-translate-EN-chapter1'>
                            {verse.transcription}
                          </div>
                          <div className='text-translate-EN text-translate-EN-chapter2'>
                            {verse.translation}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </>
              )}
              <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Alert!"
                message={alertMessage}
                buttons={alertButtons}
              />
            </IonCol>

            <IonModal isOpen={isModalOpen} onDidDismiss={closeModal} initialBreakpoint={1} breakpoints={[0, 1]}>
              <div className="block">
                <IonContent fullscreen>
                  <IonRow className='Blockcontent-chapter1 ion-justify-content-center ion-align-items-center'>
                    {booksmark.length > 0 ? (
                      booksmark.map((bookmark: any) => (
                        <div key={bookmark.id} className='contentchapter-bookmark'>
                          <IonRow className='ion-justify-content-between ion-align-items-center'>
                            <div className='showPopup'>
                              <IonRow>
                                <button className="h-r-chapters-btn" onClick={() => clickDeleteBooksmask(bookmark.id)}>
                                  <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5 0.5H2.5C1.4 0.5 0.5 1.4 0.5 2.5V18.5L7.5 15.5L14.5 18.5V2.5C14.5 1.4 13.6 0.5 12.5 0.5Z" fill="black" />
                                  </svg>
                                </button>
                              </IonRow>
                            </div>
                            <button className="h-r-chapters-number">
                              {bookmark.verse_number}
                            </button>
                          </IonRow>

                          <div className='verse-notifi-chapters'>
                            {bookmark.content}
                          </div>

                          <div className='text-translate-EN text-translate-EN-chapter1'>
                            {bookmark.translation}
                          </div>

                          <div className='text-translate-EN text-translate-EN-chapter2'>
                            {bookmark.translation || 'No additional translation available.'}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='nothingBooksmark'>You must choose a chapter you want to watch in the bookmark</div>
                    )}
                  </IonRow>
                </IonContent>
              </div>
            </IonModal>
            <IonModal
              isOpen={isModalOpen2}
              onDidDismiss={closeModal2}
              initialBreakpoint={1}
              breakpoints={[0, 1]}
            >
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <div className="error-message">
                  <p>{error}</p>
                </div>
              ) : tafsirIdverse.length > 0 && verseDetal ? (
                <div className="block">
                  <IonContent fullscreen>
                    <IonRow className='Blockcontent ion-justify-content-center ion-align-items-center'>
                      <div className='content-main'>
                        <div className='content-main-quran quranTafsir'>
                          {verseDetal.content}
                        </div>
                        <div className='content-main-en'>
                          {verseDetal.transcription}
                        </div>
                        <div className='content-main-en'>
                          {verseDetal.translation}
                        </div>
                        <div className='content-main-cate'>
                          {chapter.name} {chapter.chapter_number} : {verseDetal.verse_number}
                        </div>
                        <h4>Tafsir</h4>
                        <div className='content-main-en' id='content_tafsir'>
                        </div>
                      </div>
                    </IonRow>
                  </IonContent>
                  <IonFooter className='ion-padding-vertical'>

                  </IonFooter>
                </div>
              ) : (
                <div className="block">
                  <IonContent fullscreen>
                    <IonRow className='Blockcontent ion-justify-content-center ion-align-items-center'>
                      <div className='content-main'>
                        Tafsir section has no data...
                      </div>
                    </IonRow>
                  </IonContent>
                </div>
              )}
            </IonModal>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};

export default Read;
