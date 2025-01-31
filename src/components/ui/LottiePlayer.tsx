"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const LottiePlayer = (props: React.ComponentProps<typeof Lottie>) => {
  // Animation Data State
  const [animationData, setAnimationData] = useState<object | null>(null);

  // Get Animation Data
  useEffect(() => {
    // If props.animationData is Object
    if (typeof props.animationData == "object") {
      setAnimationData(props.animationData);
    }
    // If props.animationData is URL, fetch data
    else if (typeof props.animationData == "string") {
      fetch(props.animationData)
        .then((res) => res.json())
        .then((data) => setAnimationData(data))
        .catch((e) => console.log({ lottieFetchingError: e }));
    }

    // eslint-disable-next-line
  }, []);

  // If animationData available
  if (animationData) {
    return <Lottie {...props} animationData={animationData} />;
  }
};

export default LottiePlayer;
