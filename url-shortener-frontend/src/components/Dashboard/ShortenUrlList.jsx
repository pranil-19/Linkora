import React, { useState, useEffect } from "react";
import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ data }) => {
  // Local state to manage the list
  const [urls, setUrls] = useState([]);

  // Initialize local state from props
  useEffect(() => {
    setUrls(data || []);
  }, [data]);

  // Handler to remove deleted URL from list
  const handleDelete = (deletedUrl) => {
    setUrls((prev) => prev.filter((url) => url.shortUrl !== deletedUrl));
  };

  const getDescription = (item) =>
    item?.description ??
    "";

  return (
    <div className="my-6 space-y-4">
     {(urls ?? []).map((item) => (
        <ShortenItem
          key={item.id}
          {...item}
          description={getDescription(item)}
          onDelete={handleDelete} // Pass delete handler to child
        />
      ))}
    </div>
  );
};

export default ShortenUrlList;
