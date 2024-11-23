import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { stateRedux } from "../types";
import { useTranslation } from "react-i18next";
import Tsparticles from "../components/Log/tsparticles";

import axios from "axios";
import { logIn } from "../store/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [t] = useTranslation();
  const language = useSelector((state: stateRedux) => state.language.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const animationVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [gender, setGender] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birth_place, setBirthPlace] = useState("");
  const [national_number, setNationalNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [progressLog, setprogressLog] = useState(false);

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleToggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleGenderChange = (event) => setGender(event.target.value);

  const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setprogressLog(true);
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}v1/users/auth/signup`,
        {
          name: username,
          password,
          password_confirmation,
          email,
          address,
          birthdate,
          birth_place,
          national_number,
          gender,
          phone,
        }
      );
      console.log(res);
      dispatch(logIn());
      localStorage.setItem("access_token", res.data.token);
      setprogressLog(false);
    } catch (error) {
      console.error(error);
      setprogressLog(false);
    }
  };

  return (
    <>
      <div className="logInInfo  mx-auto containerLog z-10 relative">
        <div className=" w-2/4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/balance.jpg"
              alt=""
              className=" w-14 h-14 rounded-full"
            />
            <span className="text-2xl font-bold text-white">balance</span>
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
          initial={isSignUp ? "hidden" : "visible"}
          animate={isSignUp ? "visible" : "hidden"}
          transition={{ delay: 0.1, duration: 0.5 }}
          variants={animationVariants}
          className="formContainer"
          onSubmit={submit}
        >
          <motion.h1 variants={animationVariants} className="formTitle">
            {t("Create Account")}
          </motion.h1>
          <Grid container spacing={2} className="inputGroup">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="National Number"
                variant="outlined"
                fullWidth
                value={national_number}
                onChange={(e) => setNationalNumber(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Birth Place"
                variant="outlined"
                fullWidth
                value={birth_place}
                onChange={(e) => setBirthPlace(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Birthday"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Gender"
                value={gender}
                onChange={handleGenderChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="male">{t("Male")}</MenuItem>
                <MenuItem value="female">{t("Female")}</MenuItem>
                <MenuItem value="other">{t("Other")}</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                margin="normal"
              />
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
            {progressLog ? t("Loading...") : t("Sign Up")}
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2, cursor: "pointer" }}
            onClick={() => navigate("/SignIn")}
          >
            {t("already")}
          </Typography>
        </Box>
      </div>
      <Tsparticles />
    </>
  );
}
