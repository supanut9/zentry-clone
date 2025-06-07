import { useRef, useState } from 'react';

const totalVideos = 4;
const upcommingVideoIndex = (index) => (index % totalVideos) + 1;
const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => upcommingVideoIndex(prevIndex));
  };

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      <div
        className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'
        id='video-frame'
      >
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
              onLoadedData={handleVideoLoad}
            />
          </div>
        </div>
        <video
          ref={nextVideoRef}
          loop
          muted
          className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
          id='current-video'
          src={getVideoSrc(currentIndex)}
          onLoadedData={handleVideoLoad}
        />
        <video
          autoPlay
          loop
          muted
          className='absolute left-0 top-0 size-full object-cover object-center'
          src={getVideoSrc(currentIndex)}
          onLoadedData={handleVideoLoad}
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
