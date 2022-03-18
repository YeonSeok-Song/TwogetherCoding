import { Card, Button, Row, Col, Modal } from "react-bootstrap"
import {useState} from 'react'
import * as Api from "../../api"

<<<<<<< HEAD:front/src/components/certificate/CertificateCard.js
const CertificateCard = ({ certificate, isEditable, setIsEditing, setCertificates }) => {
=======
const AwardCard = ({ _award, isEditable, setIsEditing, setAwards, page }) => {
>>>>>>> 2b954080e2685e9bb8c94080996289b8ede9be6b:front/src/components/award/AwardCard.js
    // Modal 관련 State
    const slicingDate = (date) => {
        return date.slice(0, 10)
    }

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleDelete = async (id) => {
<<<<<<< HEAD:front/src/components/certificate/CertificateCard.js
        const res = await Api.delete(`certificate/${id}`)
        const {status, message} = res
        if(status === 200) {
            setCertificates((cur) => {
                const newCertificates = [...cur]
                let filtered = newCertificates.filter(v => v.id !== id)
=======
        const res = await Api.delete(`awards/${id}`, {
            page
        })
        const {status, message} = res
        if(status === 200) {
            setAwards((cur) => {
                const newAwards = [...cur]
                let filtered = newAwards.filter(v => v.id !== id)
>>>>>>> 2b954080e2685e9bb8c94080996289b8ede9be6b:front/src/components/award/AwardCard.js
                return filtered
            })
        } else {
            console.error(message)
        }
    }

    return (
        <>
            <Card.Body>
<<<<<<< HEAD:front/src/components/certificate/CertificateCard.js
                {/* certificate의 자격증 이름과 상세내용, 취득일자를 출력 */}
=======
                {/* award의 수상내용과 상세내용을 출력 */}
>>>>>>> 2b954080e2685e9bb8c94080996289b8ede9be6b:front/src/components/award/AwardCard.js
                <Row className="align-items-center">
                    <Col>
                        <span>{certificate.title}</span>
                        <br />
                        <span className="text-muted">{certificate.description}</span>
                        <br />
                        <span className="text-muted">{slicingDate(certificate.date)}</span>
                    </Col>
                    <Col xs lg="1">
                        {/* 각 항목마다 편집 버튼을 생성 */}
                        {isEditable && <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => setIsEditing(prev => !prev)}
                            className="mr-3"
                        >편집</Button>}
                        {/* 각 항목마다 삭제 버튼을 생성 */}
                        {isEditable && <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={handleShow}
                        >삭제</Button>}
                    </Col>
                </Row>
            </Card.Body>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>삭제 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="danger" onClick={() => {
                    handleClose()
                    handleDelete(certificate.id)
                    }
                }>
                    삭제
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CertificateCard