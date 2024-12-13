import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, IonText } from '@ionic/react';
import './Silder.css';
import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ContainerProgs {
  onFinish: () => void;
}

const SliderComponent: React.FC<ContainerProgs> = ({ onFinish }) => {
  const sliderRef = useRef<Slider | null>(null);

  const dataSlider = [
    {
      id: 1,
      name: 'Slider1',
      discriptionPrimary: 'Chào mừng bạn đã đến với salah chat',
      discriptionSecondary: 'Chat với salah',
      imageSldiers: '/—Pngtree—quran and book islam religion_6237288 1.png',
      type: false,
    },
    {
      id: 2,
      name: 'Slider2',
      discriptionPrimary: 'Chào mừng bạn đã đến với salah chat',
      discriptionSecondary: 'Chat với salah',
      imageSldiers: '/—Pngtree—quran and book islam religion_6237288 2.png',
      type: false,
    },
    {
      id: 3,
      name: 'Slider3',
      discriptionPrimary: 'Cùng trò chuyện với salah chat',
      discriptionSecondary: 'Chat với salah',
      imageSldiers: '/—Pngtree—quran and book islam religion_6237288 3.png',
      type: true,
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    swipe: false
  };
  const checkTabbar = document.querySelector('.tabbar');

  if (checkTabbar) {
    checkTabbar.classList.add('hidden');
  }

  const handleNextSlide = (type: any) => {
    const checkTabbar = document.querySelector('.tabbar');

    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }

    if (type) {
      if (checkTabbar) {
        checkTabbar.classList.remove('hidden');
      }
      onFinish();
    }
  };

  return (
    <IonPage >
      <IonContent fullscreen scrollY={false}>
        <Slider ref={sliderRef} {...sliderSettings}>
          {dataSlider.map((slide) => (
            <div key={slide.id}>
              <IonGrid fixed>
                <IonRow className="ion-justify-content-center">
                  <IonCol sizeSm="12" sizeMd="8" sizeLg="6" sizeXl="6">
                    <div className='bg contentPhone'>
                      <img src={slide.imageSldiers} alt={slide.name} />
                    </div>
                    <IonGrid>
                      <IonRow className="ion-justify-content-center">
                        <IonCol size='10' className='contentTextSlider'>
                          <IonCol>
                            <p className='ion-text-center textsilder1'>{slide.discriptionPrimary}</p>
                            <p className='ion-text-center textsilder2'>
                              <IonText color="secondary">
                                {slide.discriptionSecondary}
                              </IonText>
                            </p>
                            <button className='buttomfullsilder' onClick={() => handleNextSlide(slide.type)}>
                              Bắt đầu
                            </button>
                          </IonCol>
                          <IonRow className="ion-justify-content-center ion-align-items-center ion-margin-top">
                            <p>powered by</p>
                            <img src="/image 4.png" alt="" className="responsive-image" />
                          </IonRow>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          ))}
        </Slider>
      </IonContent>
    </IonPage>
  );
};

export default SliderComponent;
