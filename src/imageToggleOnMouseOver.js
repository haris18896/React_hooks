import React, {useRef} from 'react';

const ImageToggleOnMouseOver = ({primaryImg, secondaryImg}) => {

    const imageRef = useRef(null);

    return (
        <img
        onMouseOver={() => {
            imageRef.current.src = secondaryImg;
        }}
        onMouseOut={() => {
            imageRef.current.src = primaryImg;
        }}
        src={primaryImg}
        alt="Primary"
        ref={imageRef}
         />
    )
}

export default ImageToggleOnMouseOver;