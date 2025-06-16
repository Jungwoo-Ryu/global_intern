import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import authService from "../services/authService.ts";
import 'bootstrap/dist/css/bootstrap.min.css'; // 여기에 추가
import { useDispatch } from 'react-redux'; // 추가
import { loginSuccess } from "../actions/authActions"; // 추가
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // 추가
    const [inputUsername, setInputUsername] = useState("user01");
    const [inputPassword, setInputPassword] = useState("pass01");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const service = authService;


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setShow(false);

        try {
            const result = await service.login(inputUsername, inputPassword);

            if (result && result.data) {
                // 서버에서 받은 Member 데이터에서 ID만 추출하여 Redux에 저장
                const memberId = result.data.id; // 또는 result.data.memberId
                dispatch(loginSuccess(memberId));

                navigate('/', { replace: true });
            } else {
                setShow(true); // 로그인 실패 시 에러 표시
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            setShow(true); // 에러 발생 시 알림 표시
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-container flex flex-row mt-lg-5">
            <Container className="container-lg">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <Card className="shadow-lg border-0">
                            <Card.Body className="p-4">
                                {/* 로고/제목 영역 */}
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-primary mb-2">Fasoo</h2>
                                    <p className="text-muted">관리자 로그인</p>
                                </div>

                                {/* 에러 알림 */}
                                {show && (
                                    <Alert
                                        variant="danger"
                                        className="mb-3"
                                        onClose={() => setShow(false)}
                                        dismissible
                                    >
                                        아이디 또는 비밀번호가 올바르지 않습니다.
                                    </Alert>
                                )}

                                {/* 로그인 폼 */}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={inputUsername}
                                            onChange={(e) => setInputUsername(e.target.value)}
                                            placeholder="Enter username"
                                            className="py-2"
                                            required
                                            autoFocus
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={inputPassword}
                                            onChange={(e) => setInputPassword(e.target.value)}
                                            placeholder="Enter password"
                                            className="py-2"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Remember me"
                                            className="text-muted"
                                        />
                                    </Form.Group>

                                    <div className="d-grid mb-3">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            size="lg"
                                            disabled={loading}
                                            className="py-2 fw-semibold"
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Logging In...
                                                </>
                                            ) : (
                                                "Log In"
                                            )}
                                        </Button>
                                    </div>

                                    <div className="text-center">
                                        <Button
                                            variant="link"
                                            className="text-decoration-none p-0"
                                            onClick={() => console.log("비밀번호 찾기")}
                                        >
                                            Forgot password?
                                        </Button>
                                    </div>
                                </Form>

                                {/* 푸터 */}
                                <div className="text-center mt-4 pt-3 border-top">
                                    <small className="text-muted">
                                        Made by Your Company | &copy;2025
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;
