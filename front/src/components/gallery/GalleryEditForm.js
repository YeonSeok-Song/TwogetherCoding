import React, { useState } from "react";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState } from "recoil";
import { gallerysState } from "./GalleryAtom";

function GalleryEditForm({ gallery, setIsEditing }) {
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState(gallery.description);
  // recoil 적용
  const setGallerys = useSetRecoilState(gallerysState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { id, userId } = gallery;
      const formData = new FormData();
      formData.append("description", description);
      // patch 요청을 하여 formData를 보냄
      await Api.patchDescription(`gallery/${userId}/${id}`, formData);

      const res = await Api.get("gallery", userId);
      setGallerys(res.data.images);
    } catch (err) {
      console.error(err);
    }
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card.Body style={{ maxWidth: "330px", backgroundColor: "white" }}>
      <Form onSubmit={handleSubmit} style={{backgroundColor: "white"}}>
        <div className="img-wrapper" style={{backgroundColor: "white"}}>
          <img
            className="mb-3"
            src={gallery?.saveFilePath}
            alt="갤러리 이미지"
          />
        </div>
        <Form.Group
          controlId="formBasicDescription"
          className="mt-3"
          style={{ maxWidth: "260px", backgroundColor: "white" }}
        >
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{backgroundColor: "white"}}
          />
        </Form.Group>

        <Form.Group as={Row} className="mt-3 text-center mb-4">
          <Col sm={{ span: 20 }} style={{backgroundColor: "white", paddingRight: "45px"}}>
            <Button variant="primary" type="submit" className="me-3">
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Card.Body>
  );
}

export default GalleryEditForm;
