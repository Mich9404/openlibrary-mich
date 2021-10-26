import { useEffect, useState } from 'react';
import Heading from './components/Heading';
import Row from './components/Row';
// import data from './data.json';
import { format } from "timeago.js";


const headings = ["When", "Who", "Description"];

const props = {
  headings,
  title: "OpenLibrary API by Mich",
};

function Headings () {
  return (
    <thead className="table-primary">
      <tr>
        {
          headings.map((heading, i) => {
            return <Heading key={i} heading={heading} />
          })
        }
      </tr>
    </thead>
  )
}

function Rows ({data}) {
  return (
    <tbody>
      {
        data.map((row, i) => {
          return <Row key={i} change={row} />
        })
      }
    </tbody>
  )
}

function App() {

  const [books, setBooks] = useState([]);

  const formatData = (books) =>
    books.map((book, i) => ({
      when: format(book.timestamp),
      who: book.author.key,
      description: book.comment,
      // timeagoInstance.format(data.timestamp)
    }));

  useEffect(() => {
    setInterval(async () => {
      const res = await fetch(
        "https://openlibrary.org/recentchanges.json?limit=10"
      );
      const data = await res.json();
      const formatedData = formatData(data);
      setBooks(formatedData);
    }, 3000);
  }, []);

  return (
    <div className="App">
      <div className="container p-4">
        <h1>OpenLibrary API</h1>
        <table className="table table-bordered">
          <Headings headings={headings} />
          <Rows data={books} />
        </table>
      </div>
    </div>
  );
}

export default App;
