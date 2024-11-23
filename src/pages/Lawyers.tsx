import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Rating,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Lawyers() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([
    {
      id: 1,
      name: "Abd Alkarem Naser",
      email: "karem@gmail.com",
      address: "Damascus",
      union_branch: "Damascus",
      union_number: "12345678",
      affiliation_date: "2002-03-08",
      years_of_experience: 5,
      phone: "0996450878",
      rating: 4.5,
    },
  ]);

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
                borderRadius: "12px", // Increased border radius
                overflow: "hidden",
                transition: "transform 0.3s", // Added transition for hover effect
                "&:hover": {
                  transform: "translateY(-5px)", // Slight upward movement on hover
                },
              }}
            >
              <CardContent
                sx={{
                  padding: "0", // Increased padding
                  "&:last-child": {
                    paddingBottom: "0", // Increased bottom padding
                  },
                }}
              >
                <Box
                  component="img"
                  src={`/me.jpg`}
                  alt={lawyer.name}
                  sx={{
                    width: "100%",
                    height: 200,
                    // objectFit: 'cover',
                    borderRadius: "8px", // Added border radius to the image
                    marginBottom: "16px", // Increased bottom margin
                  }}
                />
                <Box sx={{ padding: "0 15px 20px" }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    <span className="font-bold">{t("name")}:</span>{" "}
                    {lawyer.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    <span className="font-bold">{t("email")}:</span>{" "}
                    {lawyer.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    <span className="font-bold">{t("address")}:</span>{" "}
                    {lawyer.address}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    <span className="font-bold">{t("branch")}:</span>{" "}
                    {lawyer.union_branch}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    <span className="font-bold">{t("afflication")}:</span>{" "}
                    {lawyer.affiliation_date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    <span className="font-bold">{t("yearsOf")}:</span>{" "}
                    {lawyer.years_of_experience}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    <span className="font-bold">{t("phone")}:</span>{" "}
                    {lawyer.phone}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "16px",
                    }}
                  >
                    <Rating
                      name="lawyer-rating"
                      value={lawyer.rating}
                      readOnly
                      precision={0.5}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        navigate("/lawyer");
                      }}
                    >
                      {t("viewDetails")}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
