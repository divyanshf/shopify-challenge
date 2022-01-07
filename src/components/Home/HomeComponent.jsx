import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { customCall, searchAPI } from "../../controllers/api";
import ErrorComponent from "../Misc/Error";
import LoadingComponent from "../Misc/Loading";
import WaitComponent from "../Misc/Wait";
import Navbar from "../Navbar/Navbar";
import Collection from "./Collection";

const HomeComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getMoreLoading, setGetMoreLoading] = useState(false);
  const [nextlink, setNextLink] = useState("");
  const [error, setError] = useState("");

  // Get more images
  const handleGetMore = () => {
    if (nextlink) {
      setGetMoreLoading(true);
      customCall(nextlink)
        .then((res) => {
          handleImageListUpdate(res.data);
          setError("");
          setGetMoreLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
          setGetMoreLoading(false);
        });
    }
  };

  // Handle List update
  const handleImageListUpdate = (data) => {
    if (!data.collection) {
      setImages([]);
      setNextLink("");
      return;
    }
    setImages((prev) => [...prev, ...data.collection.items]);
    if (data.collection.links) {
      const next = data.collection.links.find((o) => o.rel === "next");
      setNextLink(next.href);
    } else {
      setNextLink("");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar
        handleListUpdate={handleImageListUpdate}
        setLoading={setLoading}
        loading={loading}
        setError={setError}
      />
      {!images.length && !loading ? (
        <ErrorComponent message="Could not find any images. Try a different query!" />
      ) : loading ? (
        <WaitComponent message="Hold your horses. . ." />
      ) : (
        <Collection images={images} />
      )}
      {getMoreLoading ? (
        <LoadingComponent />
      ) : !loading && nextlink ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={handleGetMore}>Get More</Button>
        </Box>
      ) : null}
      {/* {error && <ErrorComponent message={error} />} */}
    </>
  );
};

export default HomeComponent;
