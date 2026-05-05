import { useEffect, useState } from "react";
import styled from "styled-components";
import { bouncy } from "ldrs";
import { postRecommand } from "../api/recommand";
import Loading from "../shared/loading/loading";
import Recoomand from "../shared/recommand/RecommandBook";
import { useUser } from "../shared/contexts/UserContext";
import type { RecommandBook } from "../types/Book";

bouncy.register();

export default function RecommandList() {
  const { user } = useUser();
  const [recommandBooks, setRecommandBooks] = useState<RecommandBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postRecommand(user.id);
        setRecommandBooks(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!user.id) {
      setLoading(false);
      return;
    }

    fetchData();
  }, [user.id]);

  return (
    <>
      <Container>
        {recommandBooks.map((book) => (
          <Recoomand
            key={book.id}
            id={book.id}
            img={book.img}
            title={book.title}
            writer={book.writer}
            publisher={book.publisher}
            book_date={book.book_date}
            description={book.description}
            is_school={book.is_school}
          />
        ))}
      </Container>
      <Loading loading={loading} bookList={recommandBooks} />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 75px;
  gap: 35px;
`;

