import Link from 'next/link';
import { Card } from 'react-bootstrap';
import SiteDetails from '@/components/SiteDetails';
import PageHeader from '@/components/PageHeader';

export async function getStaticProps() {
  const res = await fetch('https://sites-api-seven.vercel.app/api/sites/681d6c71ed2f7091f01ffca1'); // Replace with your valid _id
  const site = await res.json();

  return {
    props: { site }
  };
}

export default function About({ site }) {
  return (
    <>
      <PageHeader text="About the Developer - Your Name" />
      <Card>
        <Card.Body>
          <p>I’m a web dev student at Seneca College, passionate about frontend design and building powerful APIs.</p>
          <p>This is one of my favorite historic sites: <Link href={`/site/${site._id}`}>{site.siteName}</Link></p>
        </Card.Body>
        <SiteDetails site={site} />
      </Card>
    </>
  );
}
