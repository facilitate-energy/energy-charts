import { useState, useEffect } from "react";

function useFetch(url) {
  const [content, setContent] = useState(null);
  const [isFetching, setStatus] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    if (!url) {
      setStatus(false);
      return;
    }
    const fetchData = async () => {
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
    };

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [url]);

  return [isFetching, content];
}

export default useFetch;
