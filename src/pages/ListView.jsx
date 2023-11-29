import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const ListView = ({ openDetail }) => {
  const store = useSelector((store) => store);
  const [itemOffset, setItemOffset] = useState(0);

  //! sayfalama değerleri
  // sayfa başına eleman
  const itemsPerPage = 10;
  // gösterilecek son itemi tespit
  const endOffset = itemOffset + itemsPerPage;
  // belirli aralıktaki aralığı diziden alma
  const currentItems = store?.flights.slice(itemOffset, endOffset);
  // toplam kaç sayfa olduğunu hesaplama
  const pageCount = Math.ceil(store?.flights.length / itemsPerPage);

  // sayfalara tıklanınca çalışır
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % store?.flights.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="list-page">
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Id:</th>
            <th>Empennage Number:</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Processes</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((fly, i) => (
              <tr key={i}>
                <td>{fly.id}</td>
                <td>{fly.code}</td>
                <td>{fly.lat}</td>
                <td>{fly.lan}</td>
                <td>
                  <button onClick={() => openDetail(fly.id)}>Detail</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default ListView;
