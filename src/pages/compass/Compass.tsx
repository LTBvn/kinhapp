import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import './Compass.css';
import React, { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

const Compass: React.FC = () => {
  const [heading, setHeading] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startWatching = async () => {
      try {
        // Request location permissions
        await Geolocation.requestPermissions();
        let positionWatchId: any;
        // Watch position continuously
        positionWatchId = Geolocation.watchPosition({}, (position, err) => {
          if (err) {
            console.error('Error watching position:', err);
            setError('Could not watch location');
            return;
          }

          if (position?.coords) {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          }
        });

        // Handle device orientation changes
        const handleOrientation = (event: DeviceOrientationEvent) => {
          setHeading(event.alpha);
        };
        window.addEventListener('deviceorientation', handleOrientation);

        // Cleanup function when component unmounts
        return () => {
          Geolocation.clearWatch(positionWatchId);
          window.removeEventListener('deviceorientation', handleOrientation);
        };
      } catch (err) {
        console.error('Error starting to watch position:', err);
        setError('Could not retrieve location');
      }
    };

    startWatching();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center divCompass">
            <IonCol size="12" className="compass-container">
              <div className='compass-header'>
                <div>Qibla Compass</div>
                <h1>قبلة</h1>
              </div>
              <div className="compass">
                <div
                  className="needle"
                  style={{ transform: `rotate(${heading ?? 0}deg)` }}
                >
                  <img src="/compass.png" alt="Compass Needle" />
                </div>
              </div>
              {error && (
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              )}
              <div>
                <p className='heading'>{heading?.toFixed(2) || 0}°</p>
                <p>Latitude: {latitude?.toFixed(6) || 0}°</p>
                <p>Longitude: {longitude?.toFixed(6) || 0}°</p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Compass;