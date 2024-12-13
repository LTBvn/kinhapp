import React, { useState, useEffect, useCallback } from 'react';
import {
  IonPage,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText,
  IonSpinner,
  IonAlert,
} from '@ionic/react';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import { getChapters, getBook, getVersesIdchapter, getChaptersIdbook } from '../../services/services';
import { useHistory } from 'react-router-dom';

// Hàm retry tổng quát
const retryAsync = async (
  fn: () => Promise<any>,
  retries: number = Infinity,
  delay: number = 1000
): Promise<any> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryAsync(fn, retries - 1, delay);
  }
};

const Chapters: React.FC = () => {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [versesIdchapter, setVersesIdchapter] = useState<any[]>([]);
  const [openJuzDropdown, setOpenJuzDropdown] = useState<boolean>(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [openVerseId, setOpenVerseId] = useState<number | null>(null);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(false);
  const [loadingChapters, setLoadingChapters] = useState<boolean>(false);
  const [loadingVerses, setLoadingVerses] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  // Fetch Books with retry
  useEffect(() => {
    const fetchBooks = async () => {
      setLoadingBooks(true);
      try {
        const fetchedBooks = await retryAsync(getBook, Infinity, 1000); // Thử lại vô hạn với khoảng cách 1 giây
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Không thể tải danh sách sách. Vui lòng thử lại sau.');
      } finally {
        setLoadingBooks(false);
      }
    };
    fetchBooks();
  }, []);

  // Open Chapter and fetch chapters by book ID with retry
  const openChapter = useCallback(async (id: number) => {
    setSelectedBookId(id);
    setLoadingChapters(true);
    setSurahs([]);
    setOpenVerseId(null);
    setVersesIdchapter([]);
    try {
      const fetchedChapters = await retryAsync(() => getChaptersIdbook(id), Infinity, 1000);
      setSurahs(fetchedChapters);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      setError('Không thể tải chương. Vui lòng thử lại sau.');
    } finally {
      setLoadingChapters(false);
    }
  }, []);

  // Open Verse and fetch verses by chapter ID with retry
  const openVerse = useCallback(async (chapterId: any) => {
    if (openVerseId === chapterId) {
      setOpenVerseId(null);
      setVersesIdchapter([]);
      return;
    }

    setOpenVerseId(chapterId);
    setLoadingVerses(true);
    setVersesIdchapter([]);
    try {
      const fetchedVerses = await retryAsync(() => getVersesIdchapter(chapterId), Infinity, 1000);
      setVersesIdchapter(fetchedVerses);
    } catch (error) {
      console.error('Error fetching verses:', error);
      setError('Không thể tải câu. Vui lòng thử lại sau.');
    } finally {
      setLoadingVerses(false);
    }
  }, [openVerseId]);

  // Handle navigation to read page
  const clickChapters = useCallback((idChapter: number, idVerses: number) => {
    history.push(`/read/${idChapter}/${idVerses}`);
  }, [history]);

  // Handle search (nếu cần thêm chức năng tìm kiếm)
  const handleSearch = useCallback((event: CustomEvent) => {
    const query = event.detail.value.toLowerCase();
    // Implement search functionality here
    // Ví dụ: lọc books hoặc chapters dựa trên query
  }, []);

  return (
    <IonPage>
      <IonRow className='divtryUprate ion-justify-content-between ion-align-items-center'>
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
      <IonContent>
        <div className="book-selection">
          <IonList className="dropdown">
            <IonItem button onClick={() => setOpenJuzDropdown(!openJuzDropdown)}>
              <IonLabel>Juz</IonLabel>
              {loadingBooks ? (
                <IonSpinner name="dots" slot="end" />
              ) : (
                <IonIcon icon={openJuzDropdown ? chevronUpOutline : chevronDownOutline} slot="end" />
              )}
            </IonItem>
            {openJuzDropdown && (
              <>
                {loadingBooks ? (
                  <IonItem>
                    <IonSpinner name="crescent" />
                    <IonLabel>Đang tải...</IonLabel>
                  </IonItem>
                ) : (
                  <IonList>
                    {books.map((book) => (
                      <IonItem key={book.id} button onClick={() => openChapter(book.id)}>
                        <IonLabel>{book.name}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                )}
              </>
            )}
          </IonList>

          {selectedBookId && (
            <IonList>
              <IonLabel>Chapters</IonLabel>
              {loadingChapters ? (
                <IonItem>
                  <IonSpinner name="crescent" />
                  <IonLabel>Đang tải chương...</IonLabel>
                </IonItem>
              ) : (
                surahs.map((surah) => (
                  <div key={surah.chapter_number}>
                    <IonItem button onClick={() => openVerse(surah.chapter_number)}>
                      <IonLabel>{surah.name} - {surah.chapter_number}</IonLabel>
                    </IonItem>
                    {openVerseId === surah.chapter_number && (
                      <>
                        {loadingVerses ? (
                          <IonGrid className="verse-grid">
                            <IonRow>
                              <IonCol className='btnNumberVerses'>
                                <div>
                                  <IonSpinner name="dots" />
                                </div>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        ) : (
                          <IonGrid className="verse-grid">
                            <IonRow>
                              <IonCol className='btnNumberVerses'>
                                {versesIdchapter.length === 0 ? (
                                  <p className='text-center novalue'>Không có dữ liệu.</p>
                                ) : (
                                  versesIdchapter.map((verse) => (
                                    <IonButton
                                      key={verse.verse_number}
                                      color={'medium'}
                                      onClick={() => clickChapters(verse.chapter_id, verse.verse_number)}
                                    >
                                      <IonText color={'dark'}>{verse.verse_number}</IonText>
                                    </IonButton>
                                  ))
                                )}
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        )}
                      </>
                    )}
                  </div>
                ))
              )}
            </IonList>
          )}
        </div>

        {/* Hiển thị thông báo lỗi nếu có */}
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          header="Lỗi"
          // message={error}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Chapters;
