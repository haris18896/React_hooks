import React, {useRef, useState, useEffect} from 'react';


const ImageToggleOnScroll = ({primaryImg, secondaryImg}) => {
    const imageRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [inView, setInView] = useState(false);

    const isInView = () => {
        const rect = imageRef.current.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    };

    useEffect(() => {
        setIsLoading(false);
        setInView(isInView());
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    },[]);

    const scrollHandler = () => {
        setInView(isInView());
    };

    return (
        <img
        src = {
            isLoading 
            ? 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
            : inView
            ? secondaryImg
            : primaryImg
        }
        alt = ""
        ref = {imageRef}
        width = "200px"
        height = "200px"
        />
    );
};

export default ImageToggleOnScroll;
