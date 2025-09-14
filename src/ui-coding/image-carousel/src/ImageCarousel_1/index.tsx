import { useState, useRef } from 'react';
import './index.css';

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const imageListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const naviToIndexImage = (index: number) => {

    if (index >= 0 && index <= images.length - 1) {
      const translateXDistance = -600 * index;
      if (imageListRef && imageListRef.current) {
        imageListRef.current.style.transform = `translateX(${translateXDistance}px)`;
        setCurrentIndex(index);
      }
    }

    if (index < 0) {
      if (imageListRef && imageListRef.current) {
        const translateXDistance = -600 * (images.length - 1);
        imageListRef.current.style.transform = `translateX(${translateXDistance}px)`;
        setCurrentIndex(images.length - 1)
      }

    }

    if (index > images.length - 1) {
      if (imageListRef && imageListRef.current) {
        imageListRef.current.style.transform = `translateX(0)`;
        setCurrentIndex(0)
      }

    }
  }


  return (
    <div className="image-container">
      <div className="btn prev-btn" onClick={() => naviToIndexImage(currentIndex - 1)}>prev</div>
      <div className="image-list" ref={imageListRef} >
        {images.map(({ alt, src }) => (
          <img key={src} alt={alt} src={src} width="100%" />
        ))}Ï
      </div>
      <div className="btn next-btn" onClick={() => naviToIndexImage(currentIndex + 1)}>next</div>

      <div className="indicator-container">
        {images.map(() => {
          return <div className="dot"></div>
        })}
      </div>
    </div>
  );
}
