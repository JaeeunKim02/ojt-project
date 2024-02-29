import React from 'react';

const ImageComponent: React.FC<{img:string}> = ({ img }) => (
    <div>
        <img src={img} alt='picture' width='160' height='160' />
    </div>
);

export default ImageComponent;