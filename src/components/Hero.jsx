import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';

import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const totalVideos = 4;
const upcommingVideoIndex = (index) => (index % totalVideos) + 1;
const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [backgroundIndex, setBackgroundIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(new Set());

  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null);

  const handleVideoLoad = (videoSrc) => {
    setLoadedVideos((prev) => {
      const newSet = new Set(prev);
      newSet.add(videoSrc);
      return newSet;
    });
  };

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => upcommingVideoIndex(prevIndex));
  };

  useEffect(() => {
    const currentVideoSrc = getVideoSrc(currentIndex);
    const nextVideoSrc = getVideoSrc(upcommingVideoIndex(currentIndex));

    if (loadedVideos.has(currentVideoSrc) && loadedVideos.has(nextVideoSrc)) {
      setLoading(false);
    }
  }, [loadedVideos, currentIndex]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set('#current-video', { visibility: 'visible' });

        gsap.to('#current-video', {
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => currentVideoRef.current?.play(),
          onComplete: () => {
            setBackgroundIndex(currentIndex);
          },
        });

        gsap.from('#next-video', {
          transformOrigin: 'center center',
          scale: 0.5,
          duration: 1.5,
          ease: 'power1.inOut',
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
      borderRadius: '0% 0% 40% 10%',
    });
    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0% 0% 0% 0%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });
  });

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      {loading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className='three-body'>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
          </div>
        </div>
      )}

      <div
        className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'
        id='video-frame'
      >
        <div>
          <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
            <div
              className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
              onClick={handleMiniVdClick}
            >
              <video
                ref={nextVideoRef}
                loop
                muted
                className='size-64 origin-center scale-150 object-cover object-center'
                id='next-video'
                src={getVideoSrc(upcommingVideoIndex(currentIndex))}
                onLoadedData={() =>
                  handleVideoLoad(
                    getVideoSrc(upcommingVideoIndex(currentIndex))
                  )
                }
              />
            </div>
          </div>
          <video
            ref={currentVideoRef}
            loop
            muted
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
            id='current-video'
            src={getVideoSrc(currentIndex)}
            onLoadedData={() => handleVideoLoad(getVideoSrc(currentIndex))}
          />
          <video
            autoPlay
            loop
            muted
            className='absolute left-0 top-0 size-full object-cover object-center'
            src={getVideoSrc(backgroundIndex)}
            onLoadedData={() => handleVideoLoad(getVideoSrc(backgroundIndex))}
          />
        </div>

        <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
          G<b>a</b>ming
        </h1>

        <div className='absolute left-0 top-0 z-40 size-full'>
          <div className='mt-24 px-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-100'>
              redefi <b>n</b>e
            </h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              containerClass='bg-yellow-300 flex-center gap-1'
              id='watch-trailer'
              leftIcon={<TiLocationArrow />}
              title='Watch Trailer'
            />
          </div>
        </div>
      </div>

      <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
