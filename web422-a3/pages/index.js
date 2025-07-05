/********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Moe Thet Paing   Student ID: 128784238   Date: Jun 17, 2025
*
*  Published URL on Vercel:
*
********************************************************************************/
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Pagination, Accordion } from 'react-bootstrap';
import SiteDetails from '@/components/SiteDetails';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const { data, error } = useSWR(`https://sites-api-seven.vercel.app/api/sites?page=${page}&perPage=10`);

  useEffect(() => {
    if (data) setPageData(data);
  }, [data]);

  function previous() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    setPage(page + 1);
  }

  return (
    <>
      <PageHeader text="Browse Sites : Sorted by site name" />
      <Accordion>
        {pageData.map(site => (
          <Accordion.Item eventKey={site._id} key={site._id}>
            <Accordion.Header>
              <b>{site.siteName}</b> ({site.location.town}, {site.provinceOrTerritory.code})
            </Accordion.Header>
            <Accordion.Body>
              <SiteDetails site={site} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <br />
      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
