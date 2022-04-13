import { useState, useEffect } from "react";

function useFetch(url, cache) {
  const [content, setContent] = useState(null);
  const [isFetching, setStatus] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    if (!url) {
      setStatus(false);
      return;
    }

    const fetchData = async () => {
      if (cache.current[url]) {
        const data = cache.current[url];
        setContent(data);
        setStatus(false);
      } else {
        try {
          const response = await fetch(url);
          let data = null;
          const contentType = await response.headers.get("content-type");
          if (contentType.includes("application/json")) {
            data = await response.json();
          } else if (contentType.includes("markdown")) {
            data = await response.text();
          } else {
            data = null;
          }
          if (!isCancelled) {
            cache.current[url] = data;
            setContent(data);
            setStatus(false);
          }
        } catch (error) {
          if (!isCancelled) {
            setContent(null);
            setStatus(false);
          }
          console.error(error);
        }
      }
    };

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [url, cache]);

  return [isFetching, content];
}

export default useFetch;
