import React from 'react';
import styles from '@/app/styles/Ui.module.css';

interface Loader {
  size?: string;
  color?: string;
}

const Loader = ({ size = '30px', color = '#359ebb' }: Loader) => {
  return <div style={{ width: size, height: size, borderTopColor: color }} className={styles.loader} />;
};

export default Loader;
