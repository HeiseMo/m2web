import Image from 'next/image'
import styles from './page.module.css'
import RegistrationForm from '../components/RegistrationForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  
  return (
    <div className={styles.containerBody}>
    <main className={styles.main}>
           <div className={styles.logoContainer}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={400} // Set your desired width
          height={400} // Set your desired height
        />
      </div>
      </main>
      <div>
      <RegistrationForm />
      </div>
    <ToastContainer />
    </div>
  )
}
