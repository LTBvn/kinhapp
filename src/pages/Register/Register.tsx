import { IonBackButton, IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import Quran from '/Quran LoGo.jpg';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { register } from '../../services/auth';
import './Register.css';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });


    const doRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = (event.target as any).nameuser.value;
        const email = (event.target as any).email.value;
        const password = (event.target as any).password.value;
        const password_confirmation = (event.target as any).confirmPassword.value;

        const data = { name, email, password, password_confirmation };

        try {
            await register(data);
        } catch (error: any) {
            if (error.response && error.response.data) {
                const fetchError = JSON.parse(error.response.data);
                const newErrors: any = { name: '', email: '', password: '', password_confirmation: '' };

                for (const key in fetchError) {
                    if (fetchError.hasOwnProperty(key)) {
                        newErrors[key] = fetchError[key];
                    }
                }
                
                setErrors(newErrors);
                setShowToast(true);

            } else {
                setShowToast(true);
                setToastMessage('Đã xảy ra lỗi không xác định.');
            }
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonTitle>Register</IonTitle>
                    <IonButton slot='start' className='back-button'>
                        <IonBackButton defaultHref='/' />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="register-content">
                <div className="register-container">
                    <IonRow className="ion-align-items-center ion-justify-content-center">
                        {/* <img src={Quran} alt="LoGo Quran" width={'60%'} />
                         */}
                        <svg width="50" height="50" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.375 1.16671C29.6638 0.627124 27.7829 0.395874 25.9792 0.395874C22.9729 0.395874 19.7354 1.01254 17.5 2.70837C15.2646 1.01254 12.0271 0.395874 9.02084 0.395874C6.01459 0.395874 2.77709 1.01254 0.541672 2.70837V25.2938C0.541672 25.6792 0.927088 26.0646 1.31251 26.0646C1.46667 26.0646 1.54375 25.9875 1.69792 25.9875C3.77917 24.9855 6.78542 24.2917 9.02084 24.2917C12.0271 24.2917 15.2646 24.9084 17.5 26.6042C19.5813 25.2938 23.3583 24.2917 25.9792 24.2917C28.5229 24.2917 31.1438 24.7542 33.3021 25.9105C33.4563 25.9875 33.5333 25.9875 33.6875 25.9875C34.0729 25.9875 34.4583 25.6021 34.4583 25.2167V2.70837C33.5333 2.01462 32.5313 1.55212 31.375 1.16671ZM31.375 21.9792C29.6792 21.4396 27.8292 21.2084 25.9792 21.2084C23.3583 21.2084 19.5813 22.2105 17.5 23.5209V5.79171C19.5813 4.48129 23.3583 3.47921 25.9792 3.47921C27.8292 3.47921 29.6792 3.71046 31.375 4.25004V21.9792Z" fill="#703EFF" />
                            <path d="M25.9792 9.64587C27.3358 9.64587 28.6463 9.78462 29.8333 10.0467V7.70337C28.6154 7.47212 27.305 7.33337 25.9792 7.33337C23.3583 7.33337 20.9842 7.78046 19.0417 8.61296V11.1721C20.7838 10.1855 23.2042 9.64587 25.9792 9.64587Z" fill="#703EFF" />
                            <path d="M19.0417 12.7138V15.273C20.7838 14.2863 23.2042 13.7467 25.9792 13.7467C27.3358 13.7467 28.6463 13.8855 29.8333 14.1475V11.8042C28.6154 11.573 27.305 11.4342 25.9792 11.4342C23.3583 11.4342 20.9842 11.8967 19.0417 12.7138Z" fill="#703EFF" />
                            <path d="M25.9792 15.5505C23.3583 15.5505 20.9842 15.9975 19.0417 16.83V19.3892C20.7838 18.4025 23.2042 17.863 25.9792 17.863C27.3358 17.863 28.6463 18.0017 29.8333 18.2638V15.9205C28.6154 15.6738 27.305 15.5505 25.9792 15.5505Z" fill="#703EFF" />
                        </svg>
                        <IonText color={'primary'}><h1>Quran</h1></IonText>
                    </IonRow>
                    <IonCard>
                        <IonCardContent>
                            <form onSubmit={doRegister}>

                                {errors.name && <IonText color={'danger'} className="error-text">{errors.name}</IonText>}
                                <IonRow className='ion-margin-top'>
                                    <IonInput errorText="Invalid email" name="nameuser" fill='outline' labelPlacement='floating' label='User name' type='text' placeholder='Catchy'></IonInput>
                                </IonRow>
                                {errors.email && <IonText color={'danger'} className="error-text">{errors.email}</IonText>} 
                                <IonRow className='ion-margin-top'>
                                    <IonInput name="email" fill='outline' labelPlacement='floating' label='Email' type='email' placeholder='User@gmail.com'></IonInput>
                                </IonRow>
                                {errors.password && <IonText color={'danger'} className="error-text">{errors.password}</IonText>} 
                                <IonInput name="password" className='ion-margin-top' fill='outline' labelPlacement='floating' label='Password' type={showPassword ? 'text' : 'password'} placeholder='min. 8 characters'>
                                    <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} slot="end" onClick={() => setShowPassword(!showPassword)} className='toggle-icon' />
                                </IonInput>
                                {errors.password_confirmation && <IonText color={'danger'} className="error-text">{errors.password_confirmation}</IonText>} 
                                <IonInput name="confirmPassword" className='ion-margin-top' fill='outline' labelPlacement='floating' label='Confirm Password' type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm your password'>
                                    <IonIcon icon={showConfirmPassword ? eyeOutline : eyeOffOutline} slot="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='toggle-icon' />
                                </IonInput>
                                
                                <IonButton type='submit' expand='block' className='ion-margin-top'>
                                    Register
                                    <IonIcon icon={personCircleOutline} slot='end'></IonIcon>
                                </IonButton>

                                <IonButton routerLink='/login' color={"secondary"} expand='block' className='ion-margin-top'>
                                    Back to Login
                                    <IonIcon icon={logInOutline} slot='end'></IonIcon>
                                </IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>

            <IonToast
                isOpen={showToast}
                message={toastMessage}
                duration={2000}
                onDidDismiss={() => setShowToast(false)}
            />
        </IonPage>
    );
};

export default Register;
