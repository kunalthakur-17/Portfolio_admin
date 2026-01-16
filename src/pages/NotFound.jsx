import { Container, Button, Col, Row, Image } from "react-bootstrap";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <Row className="not_found_card align-items-center">
          <Col md={12}>
            {/* 404 IMAGE */}
            <div className="not-found-image mb-4">
              <h1 className="error-404"
                style={{
                  fontSize: "80px",
                  fontWeight: "800",
                  background: "linear-gradient(to bottom, #800020, rgb(159 35 25))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                404
              </h1>
            </div>
            <div className="not_found_header">
              <h2 className="error-title">Oops! Page Not Found</h2>
              <p className="error-message">
                The page you're looking for doesn't exist.
              </p>
            </div>

            <div className="error-actions mt-3">
              <Button
                className="back-btn bg-tick border-0"
                onClick={() => window.history.back()}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Go Back
              </Button>

              <Button href="/" className="home_back_btn ms-3 bg-tick border-0">
                <i className="bi bi-house-fill me-2"></i>
                Back to Home
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
