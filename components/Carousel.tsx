
import React, { useState, useEffect } from 'react';

interface CarouselProps {
    images: { src: string; alt: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearTimeout(timer);
    }, [currentIndex, images.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96 lg:h-[500px]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        data-carousel-item
                    >
                        <img src={image.src} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={image.alt} />
                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                        aria-current={index === currentIndex}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                        data-carousel-slide-to={index}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
