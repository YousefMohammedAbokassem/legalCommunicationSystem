import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Divider,
  Button,
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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Lawyer() {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hireLoading, setHireLoading] = useState(false);
  const [hireDetails, setHireDetails] = useState("");
  const [rating, setRating] = useState(0); // To store the rating value
  const [review, setReview] = useState(""); // To store the review message
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false); // To control rating dialog visibility
  const [submitLoading, setSubmitLoading] = useState(false); // To manage submit button loading state
  const navigate = useNavigate();
  const fetchLawyer = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/users/get-lawyers/${parseInt(id)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLawyer(res?.data?.lawyer);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const agencyLawyer = async () => {
    console.log(import.meta.env.VITE_API_URL);
    setHireLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}v1/users/send-agency-notice`,
        { cause: hireDetails, lawyer_id: id },
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
      setDialogOpen(false);

      Swal.fire({
        title: "Failed to send request. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const submitRating = async () => {
    if (submitLoading) return; // Prevent submitting if already loading
    setSubmitLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}v1/users/all-rates`,
        { rating, review, lawyer_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setRatingDialogOpen(false);
      Swal.fire({
        title: "Rating submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed to submit rating. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setSubmitLoading(false); // Reset the loading state
    }
  };

  useEffect(() => {
    fetchLawyer();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      borderRadius={4}
      p={6}
      sx={{
        backgroundImage: "url(/as.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={6}
        width="100%"
        maxWidth={800}
        bgcolor="rgba(255, 255, 255, 0.9)"
        borderRadius={4}
        p={6}
      >
        {/* Left Side */}
        <Box>
          {loading ? (
            <Skeleton
              variant="circular"
              width={150}
              height={150}
              sx={{ borderRadius: "50%" }}
            />
          ) : (
            <Avatar
              alt="Lawyer"
              src={lawyer?.avatar}
              sx={{ width: 150, height: 150, borderRadius: "50%" }}
            />
          )}

          <Typography variant="h4" component="h2" mt={2} fontWeight={600}>
            {lawyer?.name}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            mt={1}
            color="text.secondary"
          >
            {lawyer?.email}
          </Typography>
          {loading ? (
            <Box
              sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Skeleton width={200} height={30} />
              <Skeleton width={120} height={30} />
            </Box>
          ) : (
            <>
              <Typography
                variant="body1"
                component="p"
                mt={1}
                color="text.secondary"
              >
                {lawyer?.years_of_experience} Years of Experience
              </Typography>
              <Rating
                name="read-only"
                value={lawyer?.rank}
                readOnly
                sx={{ mt: 2, "& .MuiRating-icon": { fontSize: "1.75rem" } }}
              />
            </>
          )}
        </Box>

        {/* Right Side */}
        <Box>
          <Typography variant="h3" component="h1" mb={2} fontWeight={600}>
            Lawyer
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box>
            {loading ? (
              <>
                <Skeleton width={"100%"} height={30} />
                <Skeleton width={"75%"} height={30} />
                <Skeleton width={"90%"} height={30} />
                <Skeleton width={120} height={30} />
              </>
            ) : (
              <Typography variant="body1" component="p" mb={1}>
                {lawyer?.description}
              </Typography>
            )}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              variant="subtitle1"
              component="p"
              color="text.secondary"
              onClick={() => setRatingDialogOpen(true)}
            >
              Rank
            </Typography>
            {loading ? (
              <>
                <Skeleton width={150} height={30} />
              </>
            ) : (
              <Rating
                name="read-only"
                value={lawyer?.rank}
                precision={1}
                sx={{ "& .MuiRating-icon": { fontSize: "1.75rem" } }}
                onClick={() => setRatingDialogOpen(true)} // Open dialog on star click
              />
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            {loading ? (
              <>
                <Skeleton width={150} height={90} sx={{ borderRadius: 2 }} />
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<CallIcon />}
                sx={{ minHeight: 50, minWidth: 150 }}
                onClick={() => navigate(`/chats`)}
              >
                Contact
              </Button>
            )}
            {loading ? (
              <>
                <Skeleton width={150} height={90} sx={{ borderRadius: 2 }} />
              </>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PersonAddIcon />}
                sx={{ minHeight: 50, minWidth: 150 }}
                onClick={() => setDialogOpen(true)}
              >
                Hire
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Dialog for Hire */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Hire Lawyer</DialogTitle>
        <DialogContent>
          <TextField
            label="Request Details"
            fullWidth
            multiline
            rows={4}
            value={hireDetails}
            onChange={(e) => setHireDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={agencyLawyer}
            variant="contained"
            color="secondary"
            disabled={hireLoading}
          >
            {hireLoading ? <CircularProgress size={24} /> : "Hire"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Rating */}
      <Dialog
        open={ratingDialogOpen}
        onClose={() => setRatingDialogOpen(false)}
      >
        <DialogTitle>Rate and Review Lawyer</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={1}
          />
          <TextField
            label="Review"
            fullWidth
            multiline
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRatingDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={submitRating}
            variant="contained"
            color="primary"
            disabled={submitLoading || rating === 0 || !review}
          >
            {submitLoading ? <CircularProgress size={24} /> : "Submit Rating"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
