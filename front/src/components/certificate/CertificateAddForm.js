import { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isAddingState,
  pageState,
  allPageState,
  certsState,
  PER_PAGE,
} from "./CertAtom";
import "../Components.css";

const CertificateAddForm = ({ portfolioOwnerId }) => {
  // RecoilStates
  const setIsAdding = useSetRecoilState(isAddingState);
  const [page, setPage] = useRecoilState(pageState);
  const setAllPage = useSetRecoilState(allPageState);
  const setCertificates = useSetRecoilState(certsState);

  // useState로 자격증 이름을 담을 title 변수 선언.
  const [title, setTitle] = useState("");
  // useState로 상세내용을 담을 description 변수 선언.
  const [description, setDescription] = useState("");
  // useState로 취득일자를 담을 date 변수 선언
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (evt) => {
    // Form의 기본기능을 막기 위한 코드 선언.
    evt.preventDefault();
    evt.stopPropagation();

    const userId = portfolioOwnerId;

    // post 요청
    try {
      await Api.post("certificate/create", {
        userId,
        title,
        description,
        date: date.toJSON(),
      });
    } catch (err) {
      console.error(err);
    }

    // post 요청값과 함께 각각의 Certificate들의 모임인 Certificates를 다시 렌더링
    try {
      const res = await Api.get(
        "certificatelist",
        `${userId}?page=${page}&perPage=${PER_PAGE}`
      );
      const { total, certificates } = res.data;
      setPage(Math.ceil(total / PER_PAGE));
      setAllPage(Math.ceil(total / PER_PAGE));
      setCertificates(certificates);
      // 생성 상태 종료.
      setIsAdding(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="portfolioBG">
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDate" className="mt-3">
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={new Date(date)}
          onChange={(v) => setDate(v)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }} className="portfolioBG">
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setIsAdding(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CertificateAddForm;
