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
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'; // استيراد SweetAlert

export default function Lawyer() {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hireLoading, setHireLoading] = useState(false);
  const [hireDetails, setHireDetails] = useState("");

  const fetchLawyer = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/users/get-lawyers/${parseInt(`${id}`)}`,
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
    setHireLoading(true); 
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}v1/users/send-notify-to-lawyer`,
        { cause: hireDetails, lawyer_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setHireLoading(false);  
      setDialogOpen(false); 
      
      // استبدال alert باستخدام SweetAlert
      Swal.fire({
        title: 'Request sent successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
    } catch (error) {
      console.log(error);
      setHireLoading(false);
      // يمكنك أيضاً استخدام SweetAlert في حالة الفشل
      Swal.fire({
        title: 'Failed to send request. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
                readOnly
                precision={1}
                sx={{ "& .MuiRating-icon": { fontSize: "1.75rem" } }}
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
    </Box>
  );
}