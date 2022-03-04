import { useState, useRef } from 'react';
import Webcam from 'react-webcam';

import { useCamera } from '@hooks/useCamera';

import styles from './Camera.module.scss';

const minWidth = 720;
const minHeight = 720;
const aspectRatio = minWidth / minHeight;

const videoConstraints = {
  width: {
    min: minWidth
  },
  height: {
    min: minHeight
  },
  aspectRatio
};

const Camera = ({ className, src: defaultSrc }) => {
  const webcamRef = useRef(null);

  const { image, updateCapture, resetCapture } = useCamera();

  const src = defaultSrc || image;

  const cameraClassName = [styles.camera, className].filter(c => !!c).join(' ');

  /**
   * handleOnCapture
   */

  function handleOnCapture() {
    const imageSrc = webcamRef.current.getScreenshot();
    updateCapture(imageSrc);
  }

  return (
    <div className={cameraClassName}>

      <div className={styles.stageContainer} style={{
        aspectRatio: `${minWidth} / ${minHeight}`
      }}>
        <div className={styles.stage}>
          { src && (
            <img src={src} />
          )}
          {!src && (
            <Webcam
              ref={webcamRef}
              videoConstraints={videoConstraints}
              width={minWidth}
              height={minHeight}
            />
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <ul>
          <li>
            <button onClick={handleOnCapture}>
              Capture photo
            </button>
          </li>
          <li>
            <button onClick={resetCapture}>
              Reset
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Camera;