import React, { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
// recoil 사용
import { useRecoilState } from "recoil";
import {
  projectsState,
  isAddingState,
  pageState,
  totalPageState,
} from "./ProjectAtom";
import "../Components.css";

const PER_PAGE = 3;

function Projects({ portfolioOwnerId, isEditable }) {
  // useState로 projects 상태를 생성함.
  const [projects, setProjects] = useRecoilState(projectsState);
  // useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useRecoilState(isAddingState);
  // useState로 totalPage, page 상태를 생성함.
  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const [page, setPage] = useRecoilState(pageState);

  useEffect(() => {
    // "projectlist/유저id?page={현재 페이지}&?perPage={데이터 수}"로 GET 요청하고,
    // response의 data로 totalPage와 projects를 세팅함.
    const fetchProjects = async () => {
      try {
        // 데이터 전송을 위한 page를 1로 setting함
        if (page === 0) {
          setPage(1);
        }
        const res = await Api.get(
          "projectlist",
          `${portfolioOwnerId}?page=${page}&perPage=${PER_PAGE}`
        );
        const { totalPage, projects } = res.data;
        setTotalPage(totalPage);
        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [portfolioOwnerId, page, totalPage, setProjects, setTotalPage, setPage]);

  return (
    <Card.Body className="portfolioBG" style={{ borderRadius: "10px" }}>
      <Card.Title className="portfolioBG">프로젝트</Card.Title>
      {projects.map((project) => (
        <Project
          key={project.id}
          project={project}
          setProjects={setProjects}
          isEditable={isEditable}
          page={page}
          setTotalPage={setTotalPage}
          setPage={setPage}
        />
      ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={{ span: 20 }} className="portfolioBG">
            <Button onClick={() => setIsAdding(true)}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && (
        <ProjectAddForm
          portfolioOwnerId={portfolioOwnerId}
          setProjects={setProjects}
          setIsAdding={setIsAdding}
          page={page}
          setTotalPage={setTotalPage}
          setPage={setPage}
        />
      )}
      <Col className="text-center portfolioBG">
        <Button
          variant="outline-secondary"
          size="sm"
          type="submit"
          className="me-3"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1}
        >
          {"<"}
        </Button>
        {/* totalPage가 0인 경우 현재 page 표시도 0으로 함 */}
        <Button variant="outline-secondary" size="sm" className="me-3" disabled>
          {totalPage === 0 ? 0 : page} / {totalPage}
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPage}
        >
          {">"}
        </Button>
      </Col>
    </Card.Body>
  );
}

export default Projects;
