import { Card, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as Api from "../../api";

import ProjectDetail from "./ProjectDetail";
import { allPageState } from "../education/EducationAtom";

const PER_PAGE = 3;

const ProjectDetails = ({ portfolioOwnerId, isEditable }) => {
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const fetchProjectsList = async () => {
    try {
      const res = await Api.get(
        "portfoliolist",
        `${portfolioOwnerId}?page=${page}&perPage=${PER_PAGE}`
      );
      const { totalPage, portfolios } = res.data;
      setAllPage(totalPage);
      setProjects(portfolios);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProjectsList();
  }, [portfolioOwnerId, page, allPageState]);

  return (
    <Card.Body>
      <Card.Title>프로젝트 상세</Card.Title>
      {projects.map((proj) => (
        <ProjectDetail project={proj} isEditable={isEditable} />
      ))}

      <Row className="mt-3 text-center mb-4">
        <Col className="portfolioBG">
          <Button
            variant="outline-secondary"
            size="sm"
            className="me-3"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1}
            id="prevBtn"
          >
            {"<"}
          </Button>
          <Button variant="outline-secondary" size="sm" disabled>
            {allPage === 0 ? 0 : page} / {allPage}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="ms-3"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= allPage}
          >
            {">"}
          </Button>
        </Col>
      </Row>
    </Card.Body>
  );
};

export default ProjectDetails;
