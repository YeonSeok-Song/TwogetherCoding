import { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";
import { useRecoilState } from "recoil";
import {
  isAddingState,
  pageState,
  allPageState,
  awardsState,
  PER_PAGE,
} from "./AwardAtom";
import "../Components.css";

const Awards = ({ portfolioOwnerId, isEditable }) => {
  // RecoilStates
  const [isAdding, setIsAdding] = useRecoilState(isAddingState);
  const [page, setPage] = useRecoilState(pageState);
  const [allPage, setAllPage] = useRecoilState(allPageState);
  const [awards, setAwards] = useRecoilState(awardsState);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (page === 0) {
          setPage(1);
        }
        const res = await Api.get(
          "awardlist",
          `${portfolioOwnerId}?page=${page}&perPage=${PER_PAGE}`
        );
        const { total, awards } = res.data;
        setAllPage(total);
        setAwards(awards);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [portfolioOwnerId, page, allPage, setPage, setAllPage, setAwards]);

  return (
    <Card.Body className="portfolioBG" style={{ borderRadius: "10px" }}>
      <Card.Title className="portfolioBG">수상이력</Card.Title>
      {awards.map((v) => (
        <Award key={v.id} _award={v} isEditable={isEditable} />
      ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={{ span: 20 }} className="portfolioBG">
            <Button onClick={() => setIsAdding(true)}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && <AwardAddForm portfolioOwnerId={portfolioOwnerId} />}
      <Row className="mt-3 text-center mb-4">
        <Col className="portfolioBG">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="me-3"
          >
            {"<"}
          </Button>
          <Button variant="outline-secondary" size="sm" disabled={true}>
            {Math.ceil(allPage / PER_PAGE) === 0 ? 0 : page} /{" "}
            {Math.ceil(allPage / PER_PAGE)}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= Math.ceil(allPage / PER_PAGE)}
            className="ms-3"
          >
            {">"}
          </Button>
        </Col>
      </Row>
    </Card.Body>
  );
};

export default Awards;
