import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Tsparticles from "../components/Log/tsparticles";
import axios from "axios";
import { logIn } from "../store/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progressLog, setProgressLog] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    valid: "",
  });
  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setProgressLog(true);
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}v1/auth/app/signin`,
        {
          email,
          password,
        }
      );
      console.log(res);
      dispatch(logIn());
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      setProgressLog(false);
    } catch (error) {
      console.log(typeof error.response.data.error);
      if (
        error.response.data.error &&
        typeof error.response.data.error === "string"
      ) {
        setErrors({
          email: "",
          password: "",
          valid: error.response.data.error,
        });
      }
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        setErrors({
          // ...prevErrors,
          email: serverErrors.email?.[0] || "",
          password: serverErrors.password?.[0] || "",
          valid: "",
        });
      }
      setProgressLog(false);
    }
  };

  return (
    <>
      <div className="logInInfo mx-auto containerLog z-10 relative">
        <div className="w-2/4">
          <div className="flex items-center gap-3 mb-4">
            <img src="/balance.jpg" alt="" className="w-14 h-14 rounded-full" />
            <span className="text-2xl font-bold text-white">Legal Communication</span>
          </div>
          <h1 className="mb-4 font-bold text-4xl text-white">
            {t("legalSystem")}
          </h1>
          <p className="text-xl leading-10 text-white opacity-80">
            {t("legalSystemWho")}
          </p>
        </div>
        <Box
          component={motion.form}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1, duration: 0.5 }}
          className="formContainer"
          onSubmit={submit}
        >
          <motion.h1 className="formTitle">{t("Sign In")}</motion.h1>
          <Grid container spacing={2} className="inputGroup">
            <Grid item xs={12}>
              <TextField
                label={t("Email")}
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                error={errors.email ? true : false}
              />
              {errors.email && (
                <Typography color="error" sx={{ fontWeight: "bold" }}>
                  {errors.email}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("Password")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                error={errors.password ? true : false}
              />
              {errors.password && (
                <Typography color="error" sx={{ fontWeight: "bold" }}>
                  {errors.password}
                </Typography>
              )}
              {errors.valid && (
                <Typography color="error" sx={{ fontWeight: "bold" }}>
                  {errors.valid}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={progressLog}
            startIcon={progressLog && <CircularProgress size={20} />}
            sx={{
              backgroundColor: progressLog ? "#c1c1c1" : "#1d4c6a",
              color: "#fff",
              "&:hover": {
                backgroundColor: progressLog ? "#c1c1c1" : "#4a6375",
              },
              marginTop: 2,
            }}
          >
            {progressLog ? t("Loading...") : t("Sign In")}
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2, cursor: "pointer" }}
            onClick={() => navigate("/SignUp")}
          >
            {t("Don't have an account?")}
          </Typography>
        </Box>
      </div>
      {/* <Tsparticles /> */}
    </>
  );
}
