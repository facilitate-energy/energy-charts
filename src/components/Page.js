import React from "react";
import { Row, Col } from "react-bootstrap";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import useFetchText from "../hooks/useFetch";

function Page(props) {
  const content = useFetchText(`/pages/${props.page}.md`);

  return (
    <Row className="page m-0 justify-content-center">
      <Col sm={10} md={8} lg={7} xl={6} xxl={5}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          children={content}
          rehypePlugins={[rehypeRaw]}
        />
      </Col>
    </Row>
  );
}

export default Page;