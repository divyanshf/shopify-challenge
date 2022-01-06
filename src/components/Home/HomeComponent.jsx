import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { customCall, searchAPI } from "../../controllers/api";
import Navbar from "../Navbar/Navbar";
import Collection from "./Collection";

const HomeComponent = () => {
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState(search);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextlink, setNextLink] = useState("");

  const handleSearchChange = (query) => {
    setDebounce(query);
  };

  const handleGetMore = () => {
    if (nextlink) {
      setLoading(true);
      customCall(nextlink)
        .then((res) => {
          handleImageListUpdate(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleImageListUpdate = (data) => {
    setImages(data.collection.items);
    if (data.collection.links) {
      const next = data.collection.links.find((o) => o.rel === "next");
      setNextLink(next.href);
    }
    setLoading(false);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debounce);
    }, 1000);
    return () => clearTimeout(timer);
  }, [debounce]);

  useEffect(() => {
    // API CALL
    setLoading(true);
    searchAPI(search)
      .then((res) => {
        handleImageListUpdate(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [search]);

  return (
    <>
      <Navbar query={search} handleSearchChange={handleSearchChange} />
      <Collection images={images} />
      <Box display="flex" justifyContent="center" alignItems="center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleGetMore}>Get More</Button>
        )}
      </Box>
    </>
  );
};

export default HomeComponent;
