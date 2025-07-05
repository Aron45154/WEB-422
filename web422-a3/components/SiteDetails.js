import { Container, Row, Col } from 'react-bootstrap';

export default function SiteDetails({ site }) {
  return (
    <Container>
      <Row>
        <Col lg>
          <img
            className="img-fluid w-100"
            src={site.image}
            alt="Site image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x400?text=Photo+Not+Available";
            }}
          />
          <br /><br />
        </Col>
        <Col lg>
          <h2>{site.siteName}</h2><br />
          <p><b>Description:</b> {site.description}</p>

          <p><b>Dates:</b></p>
          <ul>
            {Array.isArray(site.dates) && site.dates.length > 0 ? (
              site.dates.map((d, i) => (
                <li key={i}>{d.year} ({d.type})</li>
              ))
            ) : (
              <li>Not available</li>
            )}
          </ul>

          <p><b>Designated:</b> {site.designated}</p>

          <p><b>Location:</b> 
            {site.location?.latitude && site.location?.longitude 
              ? `${site.location.latitude}, ${site.location.longitude}`
              : ' Not available'}
          </p>

          <p><b>Town:</b> 
            {site.location?.town && site.provinceOrTerritory?.name 
              ? `${site.location.town}, ${site.provinceOrTerritory.name}`
              : ' Not available'}
          </p>

          <p><b>Region:</b> 
            {site.provinceOrTerritory?.region 
              ? site.provinceOrTerritory.region
              : ' Not available'}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
