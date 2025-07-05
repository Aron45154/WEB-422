import { Card } from 'react-bootstrap';

export default function PageHeader({ text }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <h2>{text}</h2>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
