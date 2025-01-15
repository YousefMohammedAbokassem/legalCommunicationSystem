import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Avatar,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export default function Agency() {
  const { id } = useParams();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [agency, setAgency] = useState({});
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hireLoading, setHireLoading] = useState(false);

  const fetchAgency = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/users/get-agencies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setAgency(res?.data?.agency);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteAgency = async () => {
    setHireLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}v1/users/get-agencies/${id}/isolate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setHireLoading(false);
      setDialogOpen(false);

      Swal.fire({
        title: t("agency_deleted_successfully"),
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/agencies");
      });
    } catch (error) {
      console.log(error);
      setDialogOpen(false);
      setHireLoading(false);
      Swal.fire({
        title: t("failed_to_delete_agency"),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const approveAgency = async () => {
    setHireLoading(true);
    try {
      const payload = {
        sequential_number: agency?.sequential_number,
        record_number: agency?.record_number,
        place_of_issue: agency?.place_of_issue,
      };
      await axios.put(
        `${import.meta.env.VITE_API_URL}v1/get-agencies/${agency?.id}/approved`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setHireLoading(false);
      Swal.fire({
        title: t("agency_approved_successfully"),
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      setHireLoading(false);
      Swal.fire({
        title: t("failed_to_approve_agency"),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const rejectAgency = async () => {
    setHireLoading(true);
    try {
      const payload = {
        sequential_number: agency?.sequential_number,
        record_number: agency?.record_number,
        place_of_issue: agency?.place_of_issue,
      };
      await axios.put(
        `${import.meta.env.VITE_API_URL}v1/get-agencies/${agency?.id}/rejected`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setHireLoading(false);
      Swal.fire({
        title: t("agency_rejected_successfully"),
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      setHireLoading(false);
      Swal.fire({
        title: t("failed_to_reject_agency"),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchAgency();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f4f8"
      p={4}
      sx={{
        backgroundImage: "url(/backBook.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 4,
          boxShadow: 5,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#5c7c93",
            color: "#fff",
            p: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            src={`${import.meta.env.VITE_API_URL_IMAGE}${agency?.lawyer_avatar}`}
            sx={{
              bgcolor: "#fff",
              color: "#5c7c93",
              mr: 2,
              width: 56,
              height: 56,
            }}
          >
            {loading ? (
              <Skeleton variant="circular" width={56} height={56} />
            ) : (
              agency?.lawyer_name?.[0]
            )}
          </Avatar>
          <Typography variant="h5" fontWeight={600}>
            {loading ? (
              <Skeleton width={200} />
            ) : (
              t("lawyer_name") + `: ${agency?.lawyer_name}`
            )}
          </Typography>
        </Box>

        <CardContent>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
            <Box>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} height={30} sx={{ mb: 1 }} />
                ))
              ) : (
                <>
                  <Typography variant="body1" mb={1}>
                    <strong>Record Number:</strong> {agency?.record_number}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>sequential_number:</strong>{" "}
                    {agency?.sequential_number}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Status:</strong> {agency?.status}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Place of Issue:</strong> {agency?.place_of_issue}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Type:</strong> {agency?.type}
                  </Typography>
                </>
              )}
            </Box>

            <Box>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} height={30} sx={{ mb: 1 }} />
                ))
              ) : (
                <>
                  <Typography variant="body1" mb={1}>
                    <strong>Authorizations:</strong>{" "}
                    <div>
                      {agency?.authorizations?.map((auth, index) => (
                        <span key={index}>
                          <>{auth.name}</>{" "}
                          {index !== agency.authorizations.length - 1 && ","}{" "}
                        </span>
                      ))}
                    </div>
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Exceptions:</strong>{" "}
                    <div>
                      {agency?.exceptions?.map((exce, index) => (
                        <span key={index}>
                          <>{exce.name}</>{" "}
                          {index !== agency.exceptions.length - 1 && ","}{" "}
                        </span>
                      ))}
                    </div>
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          {localStorage.getItem("user") === "user" ? (
            <Button
              variant="outlined"
              color="error"
              startIcon={<CallIcon />}
              onClick={() => setDialogOpen(true)}
              disabled={loading}
            >
              {t("delete_agency")}
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                color="success"
                onClick={approveAgency}
                disabled={loading || hireLoading}
                startIcon={hireLoading ? <CircularProgress size={20} /> : null}
              >
                {t("approve_agency")}
              </Button>
              <Button
                variant="outlined"
                color="warning"
                onClick={rejectAgency}
                disabled={loading || hireLoading}
                startIcon={hireLoading ? <CircularProgress size={20} /> : null}
              >
                {t("reject_agency")}
              </Button>
            </>
          )}
        </CardActions>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{t("confirm_delete_agency")}</DialogTitle>
        <DialogContent>
          <Typography>{t("are_you_sure_to_delete_agency")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={hireLoading}>
            {t("no")}
          </Button>
          <Button
            onClick={deleteAgency}
            variant="contained"
            color="error"
            startIcon={hireLoading ? <CircularProgress size={20} /> : null}
            disabled={hireLoading}
          >
            {t("yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
