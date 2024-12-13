import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRow, IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVerse } from '../../services/services';

interface Verse {
  chapter_id: number;
  verse_number: number;
  content: string;
  transcription: string;
  translation: string;
}

const Verse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const dataVerse = await getVerse(id);
        setVerse(dataVerse);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <IonPage>
      <IonContent fullscreen>
        {loading ? (
          <IonText>Loading...</IonText>
        ) : (
          <IonGrid className='contentPage' fixed>
            <IonRow className="ion-justify-content-center ">
              <IonCol sizeSm="12" sizeMd="8" sizeLg="6" sizeXl="6">
                
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Chương {verse?.chapter_id} - Câu {verse?.verse_number}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="verse-content">{verse?.content}</div>
                    <div className="transcription">
                      <strong>Phiên âm:</strong> {verse?.transcription}
                    </div>
                    <div className="translation">
                      <strong>Dịch nghĩa:</strong> {verse?.translation}
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Verse;
