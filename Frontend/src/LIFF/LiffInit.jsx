import React, { useEffect } from "react";

const LiffInit = ({ liffId, onInit }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.line-scdn.net/liff/edge/2/sdk.js";
    script.async = true;
    script.onload = () => {
      window.liff
        .init({ liffId })
        .then(() => {
          if (onInit) {
            onInit(window.liff);
          }
        })
        .catch((err) => console.error("LIFF initialization failed", err));
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [liffId, onInit]);

  return null;
};

export default LiffInit;
