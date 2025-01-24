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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  TextField,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
const provinces = [
  "دمشق",
  "ريف دمشق",
  "حلب",
  "حمص",
  "حماة",
  "اللاذقية",
  "طرطوس",
  "درعا",
  "السويداء",
  "القنيطرة",
  "إدلب",
  "دير الزور",
  "الرقة",
  "الحسكة",
];
export default function Agency() {
  const { id } = useParams();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [agency, setAgency] = useState({});
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hireLoading, setHireLoading] = useState(false);
  const [sequentialNumber, setSequentialNumber] = useState("");
  const [recordNumber, setRecordNumber] = useState("");
  const [placeOfIssue, setPlaceOfIssue] = useState("");

  const fetchAgency = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/get-agencies/${id}`,
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
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/get-agencies/${id}/isolate`,
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

  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const approveAgency = async () => {
    setApproveLoading(true);
    try {
      const payload = {
        sequential_number: agency?.sequential_number,
        record_number: agency?.record_number,
        place_of_issue: agency?.place_of_issue,
      };
      await axios.put(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/get-agencies/${agency?.id}/approved`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      Swal.fire({
        title: t("agency_approved_successfully"),
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: t("failed_to_approve_agency"),
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setApproveLoading(false);
    }
  };

  const rejectAgency = async () => {
    setRejectLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/get-agencies/${agency?.id}/rejected`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      Swal.fire({
        title: t("agency_rejected_successfully"),
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/agencies");
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: t("failed_to_reject_agency"),
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setRejectLoading(false);
    }
  };

  useEffect(() => {
    fetchAgency();
  }, [id]);
  // dialog for approved lawyer
  const [open, setOpen] = useState(false);
  const [representative, setRepresentative] = useState("");
  const [type, setType] = useState("");
  const [exceptions, setExceptions] = useState<string[]>([]);
  const [authorizations, setAuthorizations] = useState<string[]>([]);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingLawyer, setLoadingLawyer] = useState(false);
  const [todos, setTodos] = useState([]);

  // إرسال البيانات إلى السيرفر
  const handleSend = async () => {
    try {
      // إنشاء كائن FormData
      const formData = new FormData();

      // إضافة البيانات الأساسية
      formData.append("agency_id", agency?.id);
      formData.append("representative_id", representative);
      formData.append("type", type);

      // إضافة المصفوفات مع الأقواس المربعة
      exceptions.forEach((element) => {
        formData.append("exception_Ids[]", element);
      });
      exceptions.forEach((element) => {
        formData.append("authorization_Ids[]", element);
      });
      // formData.append(
      //   "exception_Ids[]",
      //   exceptions.length > 0 ? JSON.stringify(exceptions) : "لا يوجد"
      // );
      // formData.append(
      //   "authorization_Ids[]",
      //   authorizations.length > 0 ? JSON.stringify(authorizations) : "لا يوجد"
      // );

      // إرسال الطلب
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/get-agencies/${agency?.id}/approved`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data", // التأكد من تحديد نوع المحتوى المناسب
          },
        }
      );

      console.log("Response:", response.data);

      // استخدام SweetAlert للإعلام بالنجاح
      Swal.fire({
        title: "تم إرسال الإشعار بنجاح!",
        icon: "success",
        confirmButtonText: "حسناً",
      });
    } catch (error) {
      console.error("Error sending data:", error);

      // استخدام SweetAlert للإعلام بالفشل
      Swal.fire({
        title: "فشل في إرسال الإشعار. يرجى المحاولة مجدداً.",
        icon: "error",
        confirmButtonText: "حسناً",
      });
    }
    setOpen(false); // إغلاق نافذة الحوار
  };
  const handleSendRepres = async () => {
    try {
      // إنشاء كائن FormData
      const formData = new FormData();

      // إضافة البيانات الأساسية
      formData.append("sequential_number", sequentialNumber);
      formData.append("record_number", recordNumber);
      formData.append("place_of_issue", placeOfIssue);

      // إرسال الطلب
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/get-agencies/${agency?.id}/approved`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data", // التأكد من تحديد نوع المحتوى المناسب
          },
        }
      );

      // استخدام SweetAlert للإعلام بالنجاح
      Swal.fire({
        title: "تم إرسال الإشعار بنجاح!",
        icon: "success",
        confirmButtonText: "حسناً",
      });
    } catch (error) {
      // استخدام SweetAlert للإعلام بالفشل
      Swal.fire({
        title: "فشل في إرسال الإشعار. يرجى المحاولة مجدداً.",
        icon: "error",
        confirmButtonText: "حسناً",
      });
    }
    setOpen(false); // إغلاق نافذة الحوار
  };

  // جلب بيانات المندوبين
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/fetch-representatives`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTodos(response.data.representatives);
      console.log(response);
      setLoadingLawyer(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoadingLawyer(false);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/");
      }
    }
  };
  // جلب بيانات auth
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [todosAuth, setTodosAuth] = useState([]);

  const fetchTodosAuth = async () => {
    setLoadingAuth(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/all-authorizations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTodosAuth(response.data.authorizations);
      console.log(response);
      setLoadingAuth(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoadingAuth(false);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/");
      }
    }
  };
  // جلب بيانات expec
  const [loadingExpe, setLoadingExpe] = useState(true);

  const [todosExpe, setTodosExpe] = useState([]);

  const fetchTodosExpe = async () => {
    setLoadingExpe(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/all-exceptions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTodosExpe(response.data.exceptions);
      console.log(response);
      setLoadingExpe(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoadingExpe(false);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/");
      }
    }
  };
  useEffect(() => {
    fetchTodos();
    fetchTodosAuth();
    fetchTodosExpe();
  }, []);
  const [selectedIds, setSelectedIds] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleToggle = (id) => {
    setExceptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const renderSelectedNames = () => {
    return todosExpe
      .filter((option) => exceptions.includes(option.id))
      .map((option) => option.name)
      .join(", ");
  };
  const handleToggleAuth = (id) => {
    setAuthorizations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderSelectedNamesAuth = () => {
    return todosAuth
      .filter((option) => authorizations.includes(option.id))
      .map((option) => option.name)
      .join(", ");
  };
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
          {localStorage.getItem("role") === "user" ? (
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
            agency?.status === "pending" && (
              <>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => setOpen(true)}
                  disabled={approveLoading}
                  startIcon={
                    approveLoading ? <CircularProgress size={20} /> : null
                  }
                >
                  {t("approve_agency")}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={rejectAgency}
                  disabled={rejectLoading}
                  startIcon={
                    rejectLoading ? <CircularProgress size={20} /> : null
                  }
                >
                  {t("reject_agency")}
                </Button>
              </>
            )
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Send Notification</DialogTitle>
        <DialogContent>
          {localStorage.getItem("role") === "lawyer" ? (
            <>
              {/* المندوبين */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Representative</InputLabel>
                <Select
                  value={representative}
                  onChange={(e) => setRepresentative(e.target.value)}
                >
                  {todos?.map((item: any) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* النوع */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <MenuItem value="public">public</MenuItem>
                  <MenuItem value="private">private</MenuItem>
                  <MenuItem value="legimacity">legimacity</MenuItem>
                </Select>
              </FormControl>

              {/* التفويضات */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Authorizations</InputLabel>
                <Select
                  multiple
                  value={authorizations}
                  renderValue={renderSelectedNamesAuth}
                  input={<OutlinedInput label="Authorizations" />}
                >
                  {todosAuth.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      <Checkbox
                        checked={authorizations.includes(option.id)}
                        onChange={() => handleToggleAuth(option.id)}
                      />
                      <ListItemText primary={option.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* الاستثناءات */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Exceptions</InputLabel>
                <Select
                  multiple
                  value={exceptions}
                  renderValue={renderSelectedNames}
                  input={<OutlinedInput label="Exceptions" />}
                >
                  {todosExpe.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      <Checkbox
                        checked={exceptions.includes(option.id)}
                        onChange={() => handleToggle(option.id)}
                      />
                      <ListItemText primary={option.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              {/* الرقم التسلسلي */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Sequential Number"
                  type="number"
                  value={sequentialNumber}
                  onChange={(e) => setSequentialNumber(e.target.value)}
                />
              </FormControl>

              {/* رقم السجل */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Record Number"
                  type="number"
                  value={recordNumber}
                  onChange={(e) => setRecordNumber(e.target.value)}
                />
              </FormControl>

              {/* مكان الإصدار */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Place of Issue</InputLabel>
                <Select
                  value={placeOfIssue}
                  onChange={(e) => setPlaceOfIssue(e.target.value)}
                >
                  {provinces.map((province, index) => (
                    <MenuItem key={index} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={
              localStorage.getItem("role") === "lawyer"
                ? handleSend
                : handleSendRepres
            }
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
