import { useEffect } from 'react';
import styles from './Certificates.module.css';

export default function Certificates() {
  useEffect(() => {
    const cards = document.querySelectorAll('.certificate-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.6
    });

    cards.forEach(card => observer.observe(card));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.certificatesContainer}>
      <div className={`${styles.certificateCard} certificate-card`}>
        Certificate 1
      </div>
      <div className={`${styles.certificateCard} certificate-card`}>
        Certificate 2  
      </div>
      <div className={`${styles.certificateCard} certificate-card`}>
        Certificate 3
      </div>
    </div>
  );
}
