import { useState, useEffect } from "react";

function useFetch(path) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(path);
        let data = null;
        const contentType = await response.headers.get("content-type");
        if (contentType.includes("application/json")) {
          data = await response.json();
        } else if (contentType.includes("markdown")) {
          data = await response.text();
        } else {
          data = null;
        }
        setContent(data);
      } catch (error) {
        setContent(null);
        console.error(error);
      }
    };

    fetchData();
  }, [path]);

  return content;
}

export default useFetch;
