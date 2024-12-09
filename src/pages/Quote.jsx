import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getQuotesList } from "../utils/api";
import { routes } from "../utils/routes";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const QuotePage = () => {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const ref = useRef(null);
  const OFFSET = 20;

  const fetchQuotes = async () => {
    if (!hasMore) return;
    const response = await getQuotesList(OFFSET, offset);
    const newQuotes = response?.data;
    if (newQuotes.length === 0) setHasMore(false);
    setQuotes((prev) => {
      //checking if same data it there then no need to re render
      const prevString = JSON.stringify(prev);
      const newString = JSON.stringify(newQuotes);
      if (prevString !== newString) {
        return [...prev, ...newQuotes];
      } else {
        return prev;
      }
    });
    setOffset((prev) => prev + OFFSET);
  };
  const { loaderRef, isFetching } = useInfiniteScroll(fetchQuotes, hasMore);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quotes</h1>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        ref={ref}
      >
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={quote.mediaUrl}
                alt="quote"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <p className="text-white text-lg font-semibold text-center px-4">
                  {quote.text}
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm">By: {quote.username}</p>
              <p className="text-gray-500 text-xs">
                Created At: {new Date(quote.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {isFetching && (
        <p className=" my-6 text-center text-xl font-semibold">Loading...</p>
      )}
      {hasMore && (
        <div
          ref={loaderRef}
          style={{ height: "20px", background: "transparent" }}
        />
      )}
      {!hasMore && (
        <p className=" my-6 text-center text-xl font-semibold">
          No more items to load
        </p>
      )}
      <button
        onClick={() => navigate(routes.createQuote)}
        className="fixed bottom-6 md:bottom-12 right-6 md:right-10  bg-blue-400  text-white md:text-xl px-4 py-3 rounded-full shadow-lg  hover:bg-blue-500"
      >
        + Create
      </button>
    </div>
  );
};

export default QuotePage;
