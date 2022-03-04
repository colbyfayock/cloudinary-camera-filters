import { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

import { useCamera } from '@hooks/useCamera';

import Camera from '@components/Camera';

import styles from './CldCamera.module.scss';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true
  }
});

const CldCamera = ({ filter, ...props }) => {
  const [cldData, setCldData] = useState();

  const { image } = useCamera();

  const cloudImage = cldData && cld.image(cldData.public_id).format('auto').quality('auto')
  let src;

  if ( cloudImage ) {
    if ( filter ) {
      cloudImage.effect(`e_art:${filter}`);
    }
    src = cloudImage.toURL();
  }

  useEffect(() => {
    if ( !image ) {
      setCldData(undefined);
      return;
    }

    (async function run() {
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: JSON.stringify({
          image
        })
      }).then(r => r.json());
      setCldData(response);
    })();
  }, [image]);

  return <Camera {...props} src={src} />
}

export default CldCamera;