import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Rating,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Lawyers() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // To check if more data is available

  const HoverAction = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const distanceX = e.clientX - rect.left;
    const distanceY = e.clientY - rect.top;

    target.style.setProperty("--x", `${distanceX}px`);
    target.style.setProperty("--y", `${distanceY}px`);
  };

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/users/get-lawyers?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const newLawyers = res?.data?.lawyers || [];
      setLawyers((prev) => [...prev, ...newLawyers]); // Append new data
      setHasMore(newLawyers.length > 0); // Stop if no more data
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const footerHeight = document.querySelector(".footer")?.clientHeight || 0; // احصل على طول الفوتر إذا كان موجودًا
    const scrollOffset = 300; // المسافة الإضافية قبل الوصول للنهاية

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - footerHeight - scrollOffset
    ) {
      if (hasMore && !loading) {
        setPage((prev) => prev + 1); // تحميل الصفحة التالية
      }
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [page]); // Fetch data when the page changes

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]); // Ensure the listener works correctly

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {lawyers.map((lawyer) => (
          <Grid item xs={12} sm={6} md={4} key={lawyer.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "transform 0.3s",
                justifyContent: "space-between",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent
                sx={{
                  padding: "0",
                  height: "100%",
                  "&:last-child": {
                    paddingBottom: "0",
                  },
                }}
              >
                <div className="flex h-full items-start justify-between flex-col gap-2 relative specialLawer py-4 px-5">
                  <div className="flex justify-center items-center gap-2 ">
                    <img
                      className="w-[50px] h-[50px] rounded-full"
                      src={`${import.meta.env.VITE_API_URL_IMAGE}${lawyer?.avatar}`}
                      alt="Guest 1"
                    />

                    <div>
                      <h3 className="text-[var(--clr-product)] font-bold">
                        {lawyer?.name}
                      </h3>
                      <h3 className="text-[var(--clr-product)] font-bold">
                        {lawyer?.email}
                      </h3>
                    </div>
                  </div>
                  <p className=" leading-7">{lawyer?.description}</p>
                  <div>
                    <span className="font-bold">{t("address")} :</span>
                    <span>{lawyer?.address}</span>
                  </div>
                  <div>
                    <span className="font-bold">
                      {t("yearsOf")} : <bdi>{t("year")}</bdi>{" "}
                    </span>
                    <span>{lawyer?.years_of_experience}</span>
                  </div>
                  <div>
                    <Rating value={lawyer?.rank} readOnly />{" "}
                  </div>
                  <button
                    type="button"
                    className=" ms-auto ButtonOfLawers rounded-md"
                    onMouseMove={(e) => HoverAction(e)}
                    onClick={() => {
                      navigate(`/lawyers/${lawyer?.id}`);
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    {t("pageOfLawer")}
                  </button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box marginTop={4}>
        <Grid container spacing={4}>
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    overflow: "hidden",
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
      </Box>
    </Box>
  );
}
