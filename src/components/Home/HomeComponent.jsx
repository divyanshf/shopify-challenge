import { FilterList } from "@mui/icons-material";
import {
  Button,
  IconButton,
  LinearProgress,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useRef, useContext } from "react";
import { customCall } from "../../controllers/api";
import ErrorComponent from "../Misc/Error";
import LoadingComponent from "../Misc/Loading";
import WaitComponent from "../Misc/Wait";
import Navbar from "../Navbar/Navbar";
import Collection from "./Data/Collection";
import { UserOptions } from "../../contexts/UserOptions";
import FilterDrawerComponent from "../Drawer/FiltersDrawer";

const HomeComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options] = useContext(UserOptions);
  const [getMore, setGetMore] = useState(false);
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
          setGetMore(false);
          setGetMoreLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
          setGetMore(false);
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
    const top = window.pageYOffset;

    if (!options.scrollData) return;
    if (getMore) return;

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
    if (perc >= 0.9) {
      setGetMore(true);
    }
  };


  // Use effect
  useEffect(() => {
    // if (mainRef && mainRef.current) {
    // }
    if (options.scrollData) {
      document.addEventListener("scroll", handleScoll);
    }
    return () => document.removeEventListener("scroll", handleScoll);
  }, []);

  useEffect(() => {
    if (getMore) {
      handleGetMore();
    }
  }, [getMore]);

  return (
    <Box ref={mainRef}>
      <Navbar
        handleListUpdate={handleImageListUpdate}
        setLoading={setLoading}
        loading={loading}
        setError={setError}
      >
        {loading && (
          <LinearProgress
            color="success"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              overflow: "hidden",
            }}
          />
        )}
      </Navbar>
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
