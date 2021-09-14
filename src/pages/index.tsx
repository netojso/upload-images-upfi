import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface GetImages {
  pageParam?: number | null;
}

interface ImagesResponse {
  after?: {
    id: string;
  };
  data: {
    description: string;
    id: string;
    title: string;
    ts: number;
    url: string;
  }[];
}

export default function Home(): JSX.Element {
  async function getImages({
    pageParam = null,
  }: GetImages): Promise<ImagesResponse> {
    const { data } = await api.get<ImagesResponse>('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', getImages, {
    getNextPageParam: lastPage => lastPage.after || null,
  });

  const formattedData = useMemo(() => {
    if (!data) return [];

    const items = data.pages.flatMap(item => item.data);

    return items;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            mt={8}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
