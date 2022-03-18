import { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"
import DatePicker from 'react-datepicker'

<<<<<<< HEAD:front/src/components/certificate/CertificateEditForm.js
const CertificateEditForm = ({ currentCertificate, setCertificates, setIsEditing, page }) => {
    // 편집 버튼을 누른 항목의 자격증 제목을 담을 title 변수 선언.
    const [title, setTitle] = useState(currentCertificate.title)
=======
const AwardEditForm = ({ currentAward, setAwards, setIsEditing, page }) => {
    // 편집 버튼을 누른 항목의 수상내용을 담을 title 변수 선언.
    const [award, setAward] = useState(currentAward.award)
>>>>>>> 2b954080e2685e9bb8c94080996289b8ede9be6b:front/src/components/award/AwardEditForm.js
    // 편집 버튼을 누른 항목의 상세내용을 담을 description 변수 선언.
    const [description, setDescription] = useState(currentCertificate.description)
    // 편집 버튼을 누른 항목의 취득일자를 담을 date 변수 선언.
    const [date, setDate] = useState(new Date(currentCertificate.date))

    const handleSubmit = async (evt) => {
        // Form의 기본 기능 막기.
        evt.preventDefault()
        evt.stopPropagation()

        const user_id = currentCertificate.user_id

        // put 요청.
<<<<<<< HEAD:front/src/components/certificate/CertificateEditForm.js
        await Api.post(`certificate/${currentCertificate.id}`, {
            title,
            description,
            date: date.toJSON()
        })

        // put 요청값과 함께 각각의 Certificate들의 모임인 Certificates를 다시 렌더링
        const res = await Api.get("certificatelist", `${user_id}?page=${page}&perPage=3`)
        setCertificates(res.data.certificates)
=======
        await Api.post(`award/${currentAward.id}`, {
            changeAward: award,
            changeDescription: description,
        })

        // put 요청값과 함께 각각의 Award들의 모임인 Awards를 다시 렌더링
        const res = await Api.get("awardlist", `${user_id}?page=${page}&perPage=3`)
        setAwards(res.data.awards)
>>>>>>> 2b954080e2685e9bb8c94080996289b8ede9be6b:front/src/components/award/AwardEditForm.js
        // 편집 상태 종료.
        setIsEditing(false)
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
                            onClick={() => setIsEditing(false)}
                        >취소</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}

export default CertificateEditForm
