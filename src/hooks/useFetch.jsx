import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function useFetch(url, cache) {
  const [content, setContent] = useState(null);
  const [isFetching, setStatus] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    if (!url) {
      setStatus(false);
      return;
    }

    const cacheStore = cache.current;
    // Mutating cacheStore (a local ref to cache.current) is intentional: this
    // hook implements a shared fetch cache. The react-hooks/immutability rule
    // tracks hook arguments through assignments and disallows the mutation, but
    // the pattern is valid here because cache is a useRef object designed to be
    // mutated across renders.
    /* eslint-disable react-hooks/immutability */
    const fetchData = async () => {
      if (cacheStore[url]) {
        const data = cacheStore[url];
        setContent(data);
        setStatus(false);
      } else {
        try {
          const response = await fetch(url);
          let data;
          const contentType = await response.headers.get("content-type");
          if (contentType.includes("application/json")) {
            data = await response.json();
          } else if (contentType.includes("markdown")) {
            data = await response.text();
          } else {
            data = null;
          }
          if (!isCancelled) {
            cacheStore[url] = data;
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
    /* eslint-enable react-hooks/immutability */

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [url, cache]);

  return [isFetching, content];
}

useFetch.propTypes = {
  url: PropTypes.string.isRequired
};

export default useFetch;
