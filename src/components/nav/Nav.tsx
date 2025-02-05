import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Avatar,
  Popover,
  MenuItem,
  CircularProgress,
  Button,
  Drawer,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Pusher from "pusher-js";

export default function CustomNavBar() {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [loadingSignOut, setLoadingSignOut] = useState<any>(false);
  const [loadingDelete, setLoadingDelete] = useState<any>(false);
  const [drawerOpen, setDrawerOpen] = useState<any>(false);
  const [dialogOpen, setDialogOpen] = useState<any>(false);
  const [currentPassword, setCurrentPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [loadingChange, setLoadingChange] = useState<any>(false);
  const [loadProfile, setLoadProfile] = useState<any>(false);
  const [profileData, setProfileData] = useState<any>([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>([]);
  const [loadingNotifications, setLoadingNotifications] = useState<any>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dataNotification, setDataNotification] = useState<any>({});
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const audioRef = useRef<any>(null);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err: any) => {
        console.error("Error playing audio:", err);
      });
    }
  };
  useEffect(() => {
    // استرجاع الـ token من الـ localStorage
    let accessToken = localStorage.getItem("access_token");

    // إذا كان هناك token قم باضافته في التوثيق (إذا كانت هذه هي حاجتك)
    console.log("Access Token:", accessToken);

    // إعداد Pusher
    let pusher = new Pusher("7e221c9a276e6d97951f", {
      cluster: "mt1",
      forceTLS: true,
      // إضافة الـ token للتوثيق (إذا كنت بحاجة إليه)
      auth: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // التحقق من الاتصال بـ Pusher
    pusher.connection.bind("connected", () => {
      console.log("Connected to Pusher!");
    });

    pusher.connection.bind("error", (err: any) => {
      console.error("Pusher connection error:", err);
    });
    // if (localStorage.getItem("role") === "lawyer") {
    console.log("uuuuuuuuuu");

    pusher
      .subscribe(`lawyer_notifications_${profileData?.id}`)
      .bind("send.notification.from.user.to.lawyer", (data) => {
        playNotificationSound();
        setDataNotification(data);
        setSnackbarOpen(true);
        const newMessageObj = {
          agency_id: data.id,
          msg: data.body,
        };

        setNotifications((prevMessages) => [...prevMessages, newMessageObj]);
        // alert(`New message: ${data}`); // يمكن إضافة رسالة منبثقة للاختبار
      });
    pusher
      .subscribe(`representative_notifications_${profileData?.id}`)
      .bind("send.notification.from.representative.to.lawyer", (data) => {
        playNotificationSound();

        setDataNotification(data);
        setSnackbarOpen(true);
        const newMessageObj = {
          agency_id: data.id,
          msg: data.body,
        };

        setNotifications((prevMessages) => [...prevMessages, newMessageObj]);
        // alert(`New message: ${data}`); // يمكن إضافة رسالة منبثقة للاختبار
      });
    // }

    // if (localStorage.getItem("role") === "user") {

    pusher
      .subscribe(`user_notifications_${profileData?.id}`)
      .bind("send.notification.from.lawyer.to.user", (data) => {
        playNotificationSound();

        setDataNotification(data);
        setSnackbarOpen(true);
        const newMessageObj = {
          agency_id: data.id,
          msg: data.body,
        };

        setNotifications((prevMessages: any) => [
          ...prevMessages,
          newMessageObj,
        ]);
        // alert(`New message: ${data}`); // يمكن إضافة رسالة منبثقة للاختبار
      });
    pusher
      .subscribe(`user_notifications_${profileData?.id}`)
      .bind("send.notification.from.representative.to.user", (data) => {
        playNotificationSound();

        setDataNotification(data);
        setSnackbarOpen(true);
        const newMessageObj = {
          agency_id: data.id,
          msg: data.body,
        };

        setNotifications((prevMessages) => [...prevMessages, newMessageObj]);
        // alert(`New message: ${data}`); // يمكن إضافة رسالة منبثقة للاختبار
      });
    // }
    // if (localStorage.getItem("role") === "representative") {
    pusher
      .subscribe(`representative_notifications_${profileData?.id}`)
      .bind("send.notification.from.lawyer.to.representative'", (data) => {
        playNotificationSound();

        setDataNotification(data);
        setSnackbarOpen(true);
        const newMessageObj = {
          agency_id: data.id,
          msg: data.body,
        };

        setNotifications((prevMessages) => [...prevMessages, newMessageObj]);
        // alert(`New message: ${data}`); // يمكن إضافة رسالة منبثقة للاختبار
      });
    // }

    // تنظيف عند مغادرة المكون
    return () => {
      pusher.unsubscribe("message.sent");
      pusher.unsubscribe("conversation_77");
      pusher.unsubscribe("send.notification.from.user.to.lawyer");
      pusher.unsubscribe("send.notification.from.representative.to.lawyer");
      pusher.unsubscribe("send.notification.from.representative.to.user");
      pusher.unsubscribe("send.notification.from.lawyer.to.representative");
      pusher.unsubscribe("send.notification.from.lawyer.to.user");
    };
  }, [profileData]);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    setLoadingSignOut(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}v1/auth/app/signout`,
        {
          role: localStorage.getItem("role") || "user",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(logoutUser());
      navigate("/SignIn");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/SignIn");
      }
    } finally {
      setLoadingSignOut(false);
    }
  };

  const handleChangePassword = async () => {
    setLoadingChange(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/change-password`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setDrawerOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingChange(false);
    }
  };

  const fetchProfile = async () => {
    setLoadProfile(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProfileData(res?.data?.profile);
      console.log(res);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/SignIn");
      }
    } finally {
      setLoadProfile(false);
    }
  };
  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };
  const fetchNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/get-notifications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setNotifications(res.data.notifications || []);
      console.log(res.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoadingNotifications(false);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchNotifications();
  }, []);

  const deleteAccount = async () => {
    setLoadingDelete(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/delete-account`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(logoutUser());
      navigate("/SignUp");
    } catch (error) {
      console.log("Error deleting account:", error);
    } finally {
      setLoadingDelete(false);
      setDialogOpen(false);
    }
  };
  // States for Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [formDataContainer, setFormDataContainer] = useState({
    name: "",
    address: "",
    birthday: "",
    birth_place: "",
    phone: "",
    imageUpload: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataContainer((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormDataContainer((prev) => ({
      ...prev,
      imageUpload: e.target.files[0],
    }));
  };

  const changeInfo = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formDataContainer.name);
    formDataToSend.append("address", formDataContainer.address);
    formDataToSend.append("birth_place", formDataContainer.birth_place);
    formDataToSend.append("phone", formDataContainer.phone);
    console.log(formDataContainer.imageUpload);
    formDataToSend.append("avatar", formDataContainer.imageUpload);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/update-info`,
        {
          name: formDataContainer.name,
          address: formDataContainer.address,
          birth_place: formDataContainer.birth_place,
          phone: formDataContainer.phone,
          imageUpload: formDataContainer.imageUpload,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Response:", response.data);
      setOpenDialog(false); // Close dialog after successful submission
    } catch (error) {
      console.error("Error updating info:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <audio ref={audioRef} src="/message.mp3" />
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #1d4c6a, #8faabf)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="/balance.jpg"
              alt="Logo"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#ffffff" }}
            >
              Legal Communication
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 3 }}>
            {["Home", "Lawyers", "Courts", "Agencies", "Issues", "About"].map(
              (label, index) => {
                if (
                  label === "Lawyers" &&
                  localStorage.getItem("role") !== "user"
                ) {
                  return null;
                }
                if (
                  label === "Courts" &&
                  localStorage.getItem("role") === "user"
                ) {
                  return null;
                }
                return (
                  <Link
                    key={index}
                    to={`/${label.toLowerCase()}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      sx={{
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: "500",
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      {label}
                    </Button>
                  </Link>
                );
              }
            )}
          </Box>

          <IconButton
            color="inherit"
            onClick={handleNotificationClick}
            sx={{ position: "relative" }}
          >
            <NotificationsIcon />
            {notifications.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              />
            )}
          </IconButton>
          <Popover
            open={Boolean(notificationAnchorEl)}
            anchorEl={notificationAnchorEl}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "10px",
                minWidth: "300px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Box sx={{ padding: 2 }}>
              {loadingNotifications ? (
                <CircularProgress size={20} />
              ) : notifications?.length > 0 ? (
                <List>
                  {notifications?.map((notification, index) => (
                    <ListItem
                      key={index}
                      divider
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "#1d4c6a8a", // لون الخلفية عند التمرير
                          color: "#fff",
                          transform: "scale(1.02)", // تكبير بسيط عند التمرير
                        },
                        "&:active": {
                          backgroundColor: "#1d4c6a",
                          color: "#fff", // لون الخلفية عند النقر
                          transform: "scale(0.98)", // تصغير بسيط عند النقر
                        },
                      }}
                      onClick={() => {
                        navigate(`/agencies/${notification?.agency_id}`);
                      }}
                    >
                      {index + 1}
                      {"  "} :{" "}
                      <ListItemText
                        primary={`${notification?.title}:${notification?.body}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: "gray", textAlign: "center" }}
                >
                  No notifications available
                </Typography>
              )}
            </Box>
          </Popover>
          <IconButton onClick={handleProfileClick}>
            <Avatar
              alt="User Profile"
              src={`${import.meta.env.VITE_API_URL_IMAGE}${profileData?.avatar}`}
              sx={{ border: "2px solid #ffffff" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "10px",
            padding: "10px",
            minWidth: "200px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            textAlign: "center",
          }}
        >
          {loadProfile ? (
            <CircularProgress size={20} />
          ) : (
            <>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {profileData?.name || "Guest"}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {profileData?.email || "No Email Available"}
              </Typography>
            </>
          )}
        </MenuItem>
        <MenuItem
          onClick={() => setDrawerOpen(true)}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Change Password
        </MenuItem>
        <MenuItem
          onClick={() => setOpenDialog(true)}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Change Info
        </MenuItem>
        <MenuItem>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={logOut}
            disabled={loadingSignOut}
            sx={{ textTransform: "none", fontWeight: "500" }}
          >
            {loadingSignOut && <CircularProgress size={20} color="inherit" />}{" "}
            <span className="mx-2">Sign Out</span>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => setDialogOpen(true)}
            disabled={loadingDelete}
            sx={{ textTransform: "none", fontWeight: "500" }}
          >
            {loadingDelete && <CircularProgress size={20} color="inherit" />}{" "}
            Delete Account
          </Button>
        </MenuItem>
        {/* Dialog for editing information */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Update Information</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              name="name"
              label="Name"
              value={formDataContainer.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="dense"
              name="address"
              label="Address"
              value={formDataContainer.address}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="dense"
              name="birthday"
              label="Birthday"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formDataContainer.birthday}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="dense"
              name="birth_place"
              label="Birth Place"
              value={formDataContainer.birth_place}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="dense"
              name="phone"
              label="Phone"
              value={formDataContainer.phone}
              onChange={handleInputChange}
            />
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Upload Image
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={changeInfo} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Popover>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Change Password
          </Typography>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleChangePassword}
            fullWidth
            disabled={loadingChange}
          >
            {loadingChange ? <CircularProgress size={20} /> : "Change Password"}
          </Button>
        </Box>
      </Drawer>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontSize: "1.25rem",
            fontWeight: 600,
            textAlign: "center",
            paddingBottom: "16px",
          }}
        >
          Confirm Account Deletion
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              backgroundColor: "#f0f0f0",
              "&:hover": { backgroundColor: "#e0e0e0" },
              borderRadius: "8px",
              padding: "6px 16px",
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={deleteAccount}
            disabled={loadingDelete}
            sx={{
              marginLeft: "16px",
              borderRadius: "8px",
              padding: "6px 16px",
              backgroundColor: "#e57373",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            {loadingDelete ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Delete Account"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={50000}
        // onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClick={() => navigate(`/agencies/${dataNotification?.id}`)}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {dataNotification?.body}
        </Alert>
      </Snackbar>
    </Box>
  );
}
