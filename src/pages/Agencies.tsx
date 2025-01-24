import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Skeleton,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Lawyers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/get-agencies?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const newLawyers = res?.data?.agencies || [];
      setLawyers((prev) => [...prev, ...newLawyers]);
      setHasMore(newLawyers.length > 0);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollOffset = 300;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - scrollOffset
    ) {
      if (hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <Box sx={{ padding: 4 }}>
      {loading && page === 1 ? (
        <Grid container spacing={4}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={4}>
          {lawyers.length ? (
            lawyers.map((lawyer) => (
              <Grid item xs={12} sm={6} md={4} key={lawyer.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`${import.meta.env.VITE_API_URL_IMAGE}${lawyer.lawyer_avatar}`}
                      alt={t("lawyer_avatar")}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #5c7c93",
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {t("lawyer_name")}: {lawyer.lawyer_name}
                    </Typography>
                    <Typography variant="body2">
                      {t("type")}: {lawyer.type}
                    </Typography>
                    <Typography variant="body2">
                      {t("place_of_issue")}: {lawyer.place_of_issue}
                    </Typography>
                    <Typography variant="body2">
                      {t("recordNumber")}: {lawyer.record_number}
                    </Typography>
                    <Typography variant="body2">
                      {t("status")}: {lawyer.status}
                    </Typography>
                    <Typography variant="body2">
                      {t("is_active")}: {lawyer.is_active}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: "auto",
                        background: "linear-gradient(90deg, #5c7c93, #8fa4b9)",
                        color: "#FFF",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        borderRadius: "8px",
                      }}
                      onClick={() => {
                        navigate(`/agencies/${lawyer.id}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {t("pageOfAgency")}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
              {t("noDataToShow")}
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
}
