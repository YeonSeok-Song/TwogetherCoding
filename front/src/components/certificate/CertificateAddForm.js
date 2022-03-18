import { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"
import DatePicker from 'react-datepicker'

<<<<<<< HEAD:front/src/components/certificate/CertificateAddForm.js
const CertificateAddForm = ({ portfolioOwnerId, setCertificates, setIsAdding, page }) => {
    // useState로 자격증 이름을 담을 title 변수 선언.
    const [title, setTitle] = useState("")
=======
const AwardAddForm = ({ portfolioOwnerId, setAwards, setIsAdding, page, setAllPage }) => {
    // useState로 수상내역의 내용을 담을 title 변수 선언.
    const [award, setAward] = useState("")
>>>>>>> 2b954080e2685e9bb8c94080996289b8ede9be6b:front/src/components/award/AwardAddForm.js
    // useState로 상세내용을 담을 description 변수 선언.
    const [description, setDescription] = useState("")
    // useState로 취득일자를 담을 date 변수 선언
    const [date, setDate] = useState(new Date())

    const handleSubmit = async (evt) => {
        // Form의 기본기능을 막기 위한 코드 선언.
        evt.preventDefault()
        evt.stopPropagation()

        const user_id = portfolioOwnerId

        // post 요청
        await Api.post("certificate/create", {
            user_id,
            title,
            description,
            date: date.toJSON()
        })

<<<<<<< HEAD:front/src/components/certificate/CertificateAddForm.js
        // post 요청값과 함께 각각의 Certificate들의 모임인 Certificates를 다시 렌더링
        const res = await Api.get("certificatelist", `${user_id}?page=${page}&perPage=3`)
        setCertificates(res.data.certificates)
=======
        // post 요청값과 함께 각각의 Award들의 모임인 Awards를 다시 렌더링
        const res = await Api.get("awardlist", `${user_id}?page=${page}&perPage=3`)
        const {total, awards} = res.data
        setAllPage(total)
        setAwards(awards)
>>>>>>> 2b954080e2685e9bb8c94080996289b8ede9be6b:front/src/components/award/AwardAddForm.js
        // 생성 상태 종료.
        setIsAdding(false)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Control
                        type="text"
                        placeholder="자격증 제목"
                        value={title}
                        onChange={evt => setTitle(evt.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDescription" className="mt-3">
                    <Form.Control
                        type="text"
                        placeholder="상세내역"
                        value={description}
                        onChange={evt => setDescription(evt.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDate" className="mt-3">
                    <DatePicker dateFormat="yyyy-MM-dd" selected={new Date(date)} onChange={v => setDate(v)} />
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

export default CertificateAddForm
