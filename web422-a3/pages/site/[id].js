import { useRouter } from 'next/router';
import useSWR from 'swr';
import SiteDetails from '@/components/SiteDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';

export default function Site() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `https://sites-api-seven.vercel.app/api/sites/${id}` : null);

  if (isLoading) return null;
  if (error || !data) return <Error statusCode={404} />;

  return (
    <>
      <PageHeader text={data.siteName} />
      <SiteDetails site={data} />
    </>
  );
}
