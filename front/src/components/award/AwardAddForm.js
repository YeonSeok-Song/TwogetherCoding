import { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import * as Api from "api"

const AwardAddForm = ({ portfolioOwnerId, setAwards, setIsAdding }) => {
    // useState로 수상내역의 내용을 담을 title 변수 선언.
    const [award, setAward] = useState("")
    // useState로 상세내용을 담을 description 변수 선언.
    const [description, setDescription] = useState("")

    const handleSubmit = async (evt) => {
        // Form의 기본기능을 막기 위한 코드 선언.
        evt.preventDefault()
        evt.stopPropagation()

        // post 요청
        await Api.post("award/create", {
            portfolioOwnerId,
            award,
            description,
        })

        // post 요청값과 함께 각각의 Award들의 모임인 Awards를 다시 렌더링
        const res = await Api.get("awardlist", portfolioOwnerId)
        setAwards(res.data)
        // 생성 상태 종료.
        setIsAdding(false)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Control
                        type="text"
                        placeholder="수상내역"
                        value={award}
                        onChange={evt => setAward(evt.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDescription">
                    <Form.Control
                        type="text"
                        placeholder="상세내역"
                        value={description}
                        onChange={evt => setDescription(evt.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                    <Col sm={{ span: 20 }}>
                        <Button
                            variant="primary"
                            type="submit"
                            className="me-3"
                        >확인</Button>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => setIsAdding(false)}
                        >취소</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}

export default AwardAddForm