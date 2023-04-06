import { Outlet } from 'react-router-dom';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import regLogo from '../images/regPageLogo.jpg';
import RegForm from './RegForm';

const RegPage = () => (
  <>
    <Container fluid className="h-100 py-5">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md="6" className="col-12 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={regLogo} alt="Зарегистрироваться" />
              </Col>
              <RegForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Outlet />
  </>

);

export default RegPage;
