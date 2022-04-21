import React from "react";
import { Row, Col } from "react-bootstrap";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import useFetchText from "../hooks/useFetch";

function Page(props) {
  const { basePath, page, cache } = props;
  const [contentIsLoading, content] = useFetchText(
    `${basePath}/pages/${page}.md`,
    cache
  );

  return (
    <Row className="page m-0 justify-content-center align-items-center h-100">
      <Col sm={10} md={8} lg={7} xl={6} xxl={5}>
        {!contentIsLoading && (
          <Markdown
            remarkPlugins={[remarkGfm]}
            children={content}
            rehypePlugins={[rehypeRaw]}
          />
        )}
      </Col>
    </Row>
  );
}

export default Page;
