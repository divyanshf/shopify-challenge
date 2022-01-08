import { SettingsPowerOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import { customCall, searchAPI } from "../../controllers/api";
import ErrorComponent from "../Misc/Error";
import LoadingComponent from "../Misc/Loading";
import WaitComponent from "../Misc/Wait";
import Navbar from "../Navbar/Navbar";
import Collection from "./Collection";

const HomeComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoGetMore, setAutoGetMore] = useState(false);
  const [getMoreLoading, setGetMoreLoading] = useState(false);
  const [nextlink, setNextLink] = useState("");
  const [error, setError] = useState("");
  const mainRef = useRef(null);

  // Get more images
  const handleGetMore = () => {
    if (nextlink) {
      setGetMoreLoading(true);
      customCall(nextlink)
        .then((res) => {
          handleImageListUpdate(res.data);
          setError("");
          setAutoGetMore(false);
          setGetMoreLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
          setAutoGetMore(false);
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

  // Handle scroll change
  const handleScoll = (e) => {
    if (autoGetMore) return;
    const top = window.pageYOffset;

    const windowHeight = window.innerHeight;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const rem = docHeight - windowHeight;
    const perc = top / rem;
    if (perc > 0.8) {
      setAutoGetMore(true);
    }
  };

  // Use effect
  useEffect(() => {
    // if (mainRef && mainRef.current) {
    // }
    document.addEventListener("scroll", handleScoll);
    return () => document.removeEventListener("scroll", handleScoll);
  }, []);

  useEffect(() => {
    if (autoGetMore) {
      handleGetMore();
    }
  }, [autoGetMore]);

  return (
    <Box ref={mainRef}>
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
    </Box>
  );
};

export default HomeComponent;
