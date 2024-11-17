import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { stateRedux } from "../types";
import { useTranslation } from "react-i18next";
import Tsparticles from "../components/Log/tsparticles";
// import "./LogIn.css"; // CSS file for additional styles

export default function LogIn() {
  const [t] = useTranslation();
  const language = useSelector((state: stateRedux) => state.language.language);

  const animationVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [gender, setGender] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleRoleChange = (event) => setRole(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div>
      <div className="logInInfo containerLog mx-auto z-10 relative">
        <Box
          component={motion.form}
          initial={isSignUp ? "hidden" : "visible"}
          animate={isSignUp ? "visible" : "hidden"}
          transition={{ delay: 0.1, duration: 0.5 }}
          variants={animationVariants}
          className="formContainer"
        >
          <motion.h1 variants={animationVariants} className="formTitle">
            {t("Create Account")}
          </motion.h1>

          {/* <Select
            value={role}
            onChange={handleRoleChange}
            fullWidth
            color="primary"
            sx={{ marginBottom: 2, backgroundColor: "#f5f7fa" }}
          >
            <MenuItem value="user">{t("User")}</MenuItem>
            <MenuItem value="lawyer">{t("Lawyer")}</MenuItem>
            <MenuItem value="representative">{t("Representative")}</MenuItem>
          </Select> */}
          <Box className="inputGroup">
            <TextField
              value={role}
              onChange={handleRoleChange}
              select
              label="Gender"
              fullWidth
              margin="normal"
            >
              <MenuItem value="male">{t("user")}</MenuItem>
              <MenuItem value="female">{t("lawyer")}</MenuItem>
              <MenuItem value="other">{t("representative")}</MenuItem>
            </TextField>
            {/* Grouping Username and Password */}
            <div className="inputPair">
              <TextField label="Username" variant="outlined" fullWidth />
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
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
            </div>

            {/* Grouping Email and Address */}
            <div className="inputPair">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </div>

            {/* Grouping National Number and Birthday */}
            <div className="inputPair">
              <TextField
                label="National Number"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Birthday"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
              />
            </div>

            {/* Grouping Birth Place and Gender */}
            <div className="inputPair">
              <TextField
                label="Birth Place"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="Gender"
                value={gender}
                onChange={handleGenderChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </div>

            {/* Phone field on its own */}
            <div className="inputPair">
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </div>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={toggleForm}
            sx={{
              backgroundColor: "#5c7c93",
              color: "#fff",
              "&:hover": { backgroundColor: "#4a6375" },
              marginTop: 2,
            }}
          >
            {t(isSignUp ? "Sign Up" : "Already have an account? Login")}
          </Button>
        </Box>
      </div>

      <Tsparticles />
    </div>
  );
}
