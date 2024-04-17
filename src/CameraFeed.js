import React, { useEffect, useRef } from 'react';

const CameraFeed = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    async function enableStream() {
      try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Assign the stream to the video element's srcObject to display it
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing the camera', err);
      }
    }

    enableStream();

    // Cleanup: stop the video stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }}></video>;
};

export default CameraFeed;
