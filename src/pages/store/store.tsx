import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonIcon,
} from '@ionic/react';
import { closeOutline, book, chatbubbleEllipsesOutline, compassOutline, listOutline } from 'ionicons/icons'; // Import the new icons
import { useHistory } from 'react-router-dom';
import './store.css';

const Store: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>(''); // Tracks selected button
  const history = useHistory();

  // Handle button selection
  const handleButtonClick = (option: string) => {
    setSelectedButton(option); // Only one button can be selected at a time
  };

  // Go back when clicking the close icon
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent className="store-content">
        <IonCard className="product-card">
          {/* Close icon on the top of the image */}
          <div className="close-icon-container" onClick={handleGoBack} aria-label="Close">
            <IonIcon
              icon={closeOutline}
              className="close-icon"
            />
          </div>

          <IonImg
            src="/imagestore.png" // Ensure this path is correct
            alt="Product Image"
            className="product-image"
          />

          <IonCardHeader>
            <IonCardTitle className="product-title">Get Full Access</IonCardTitle>
          </IonCardHeader>

          <IonCardContent className="product-features">
            <ul>
              <li>
                <IonIcon icon={book} className="feature-icon" /> {/* Icon for the feature */}
                Expert-Generated Guidelines with AI
              </li>
              <li>
                <IonIcon icon={chatbubbleEllipsesOutline} className="feature-icon" /> {/* Icon for the feature */}
                Daily Quotes & Verses
              </li>
              <li>
                <IonIcon icon={compassOutline} className="feature-icon" /> {/* Icon for the feature */}
                Prayer Direction (Qibla) Compass
              </li>
              <li>
                <IonIcon icon={listOutline} className="feature-icon" /> {/* Icon for the feature */}
                Full Guide with Readings
              </li>
            </ul>
          </IonCardContent>

          <div className="pricing-options">
            <div className={`price-option ${selectedButton === 'weekly' ? 'selected' : ''}`}>
              <button className="custom-button" onClick={() => handleButtonClick('weekly')}>
                <IonIcon icon={book} className="button-icon" /> {/* Icon before text */}
                Weekly Access - $9.99 per week
              </button>
            </div>
            <div className={`price-option ${selectedButton === 'monthly' ? 'selected' : ''}`}>
              <button className="custom-button" onClick={() => handleButtonClick('monthly')}>
                <IonIcon icon={book} className="button-icon" /> {/* Icon before text */}
                Monthly Access - $29.99 per month
              </button>
            </div>
            <div className={`price-option ${selectedButton === 'yearly' ? 'selected' : ''}`}>
              <button className="custom-button" onClick={() => handleButtonClick('yearly')}>
                <IonIcon icon={book} className="button-icon" /> {/* Icon before text */}
                Yearly Access - $99.99 per year
              </button>
            </div>
          </div>

          <div className="cancel-option">
            <p>Cancel Anytime</p>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Store;
