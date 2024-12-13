// LanguagePage.tsx

import React, { useEffect, useState, useMemo } from 'react';
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonLoading
} from '@ionic/react';
import './language.css';
import { getTafsirs, updateTafsir } from '../../services/services';

interface Language {
  id: number;
  language_name: string;
  name: string;
  selected: number;
  created_at: string;
  updated_at: string;
}

const LanguagePage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [languages, setLanguages] = useState<Language[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLanguages = async (): Promise<void> => {
      try {
        const fetchedLanguages = await getTafsirs();
        setLanguages(fetchedLanguages);
        const preSelectedLanguage = fetchedLanguages.find((lang: { selected: number; }) => lang.selected === 1);

        if (preSelectedLanguage) {
          setSelectedLanguage(preSelectedLanguage.id.toString());
        }
      } catch (err) {
        console.error('Error fetching data from API:', err);
        const fetchedLanguages = await getTafsirs();
        setLanguages(fetchedLanguages);
      }
    };

    fetchLanguages();
  }, []);

  const filteredLanguages = useMemo(() => {
    return languages.filter((language: Language) =>
      language.language_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [languages, searchTerm]);

  const handleClose = () => {
    window.history.back();
  };

  const handleRadioChange = async (e: CustomEvent) => {
    const selectedId = Number(e.detail.value);
    setLoading(true);
    setError('');
    try {
      await updateTafsir(selectedId);
      setSelectedLanguage(e.detail.value);
      setTimeout(() => {
        window.history.back();
      }, 500);
    } catch (error) {
      console.error('Error updating tafsir:', error);
      handleRadioChange(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <div className="header-container">
        <IonSearchbar
          className="search-bar"
          value={searchTerm}
          onIonInput={(e: any) => setSearchTerm(e.target.value)}
          placeholder="Search languages..."
        />
        <IonButton onClick={handleClose} fill="clear">
          &times;
        </IonButton>
      </div>
      <IonContent>
        {loading && <IonLoading isOpen={loading} message={'Loading...'} />}
        {error && <p className="error-message">{error}</p>}
        <IonRadioGroup
          value={selectedLanguage}
          onIonChange={handleRadioChange}
        >
          <IonList>
            {filteredLanguages.map((language) => (
              <IonItem key={language.id}>
                <IonLabel>{language.language_name}</IonLabel>
                <IonRadio slot="end" value={language.id.toString()} />
              </IonItem>
            ))}
          </IonList>
        </IonRadioGroup>
      </IonContent>
    </IonPage>
  );
};

export default LanguagePage;
