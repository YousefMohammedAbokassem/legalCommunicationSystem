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
  TextField,
  CircularProgress,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export default function Agency() {
  const { id } = useParams();
  const [t] = useTranslation();
  const [agency, setAgency] = useState({});
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hireLoading, setHireLoading] = useState(false);
  const [hireDetails, setHireDetails] = useState("");

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

  const agencyLawyer = async () => {
    setHireLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}v1/users/send-notify-to-lawyer`,
        { cause: hireDetails, lawyer_id: agency.lawyer_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setHireLoading(false);
      setDialogOpen(false);

      Swal.fire({
        title: "Request sent successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      setHireLoading(false);
      Swal.fire({
        title: "Failed to send request. Please try again.",
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
            sx={{ bgcolor: "#fff", color: "#5c7c93", mr: 2, width: 56, height: 56 }}
          >
            {loading ? <Skeleton variant="circular" width={56} height={56} /> : agency?.lawyer_name?.[0]}
          </Avatar>
          <Typography variant="h5" fontWeight={600}>
            {loading ? <Skeleton width={200} /> : t("lawyer_name") + `: ${agency?.lawyer_name}`}
          </Typography>
        </Box>

        <CardContent>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
            <Box>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} height={30} sx={{ mb: 1 }} />)
              ) : (
                <>
                  <Typography variant="body1" mb={1}>
                    <strong>Record Number:</strong> {agency?.record_number}
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
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={30} sx={{ mb: 1 }} />)
              ) : (
                <>
                  <Typography variant="body1" mb={1}>
                    <strong>Authorizations:</strong> {agency?.authorizations}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Exceptions:</strong> {agency?.exceptions}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CallIcon />}
            onClick={() => setDialogOpen(true)}
            disabled={loading}
          >
            {t("hire_lawyer")}
          </Button>
        </CardActions>
      </Card>

      {/* Dialog for hiring */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{t("hire_lawyer")}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder={t("enter_hiring_details")}
            value={hireDetails}
            onChange={(e) => setHireDetails(e.target.value)}
            disabled={hireLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={hireLoading}>
            {t("cancel")}
          </Button>
          <Button
            onClick={agencyLawyer}
            variant="contained"
            color="primary"
            startIcon={hireLoading ? <CircularProgress size={20} /> : null}
            disabled={hireLoading || !hireDetails}
          >
            {t("send_request")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
