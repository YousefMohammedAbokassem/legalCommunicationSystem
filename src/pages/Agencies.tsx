import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Courts() {
  const [t] = useTranslation();
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/lawyers/fetch-courts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const fetchedCourts = res?.data?.courts || [];
      setCourts(fetchedCourts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      {loading ? (
        <Box marginTop={4}>
          <Grid container spacing={4}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                  }}
                >
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="text" width="90%" height={20} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {courts.length
            ? courts.map((court) => (
                <Grid item xs={12} sm={6} md={4} key={court.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "16px",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {t("court_name")}: {court.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {t("rooms")}:
                      </Typography>
                      {court.rooms.length ? (
                        <ul>
                          {court.rooms.map((room) => (
                            <li key={room.id}>
                              <Typography variant="body2">
                                {room.name}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography variant="body2">
                          {t("no_rooms_available")}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : t("no_data_to_show")}
        </Grid>
      )}
    </Box>
  );
}
