import React from 'react';
import Image from 'next/image';

const ImageComponent: React.FC<{ img: string }> = ({ img }) => (
  <div>
    <Image src={img} alt="picture" width="160" height="160" />
  </div>
);

export default ImageComponent;
