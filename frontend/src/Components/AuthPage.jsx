import { Link, Outlet } from 'react-router-dom';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import AuthForm from './AuthForm';
import enterLogo from '../images/authPageLogo.jpeg';

const AuthPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container fluid className="h-100 py-5">
        <Row className="justify-content-center align-content-center h-100">
          <Col className="col-12" md="8" xxl="6">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col md="6" className="col-12 d-flex align-items-center justify-content-center">
                  <img className="rounded-circle" src={enterLogo} alt="Войти" />
                </Col>
                <AuthForm />
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('main.footer')}</span>
                  <Link to="/signup">{t('main.signup')}</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      <Outlet />
    </>
  );
};

export default AuthPage;
