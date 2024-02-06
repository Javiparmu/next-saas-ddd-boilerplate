import React from 'react';

interface Loader {
  size?: string;
  color?: string;
}

const Loader = ({ size = '30px', color = '#359ebb' }: Loader) => {
  return <div style={{ width: size, height: size, borderTopColor: color }} className='rounded-full border-t-[5px] border-[5px] border-[#f3f3f3] animate-spin' />;
};

export default Loader;
