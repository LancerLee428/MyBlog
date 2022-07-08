import "../styles/globals.css";
import "../styles/index.scss";
import "../styles/blog.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
