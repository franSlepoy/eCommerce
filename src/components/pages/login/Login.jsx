import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginGoogle, onSigIn } from "../../../firebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [userCredentials, setUserCredential] = useState({
    email: "",
    password: "",
  });

  //Funcion para manejar el email y password
  const handleChange = (e) => {
    setUserCredential({ ...userCredentials, [e.target.name]: e.target.value });
    console.log(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await onSigIn(userCredentials);
      console.log(res);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const googleSigIn = async ()=>{
    let res = await loginGoogle()
    console.log(res)
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // backgroundColor: theme.palette.secondary.main,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid
          container
          rowSpacing={2}
          // alignItems="center"
          justifyContent={"center"}
        >
          <Grid item xs={10} md={12}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                name="password"
                onChange={handleChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color="primary" />
                      ) : (
                        <Visibility color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>
          </Grid>
          <Link
            to="/forgot-password"
            style={{ color: "steelblue", marginTop: "10px" }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <Grid container justifyContent="center" spacing={3} mt={2}>
            <Grid item xs={10} md={5}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  color: "white",
                  textTransform: "none",
                  textShadow: "2px 2px 2px grey",
                }}
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={10} md={5}>
              <Tooltip title="ingresa con google">
                <Button
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  type="button"
                   onClick={googleSigIn} 
                  fullWidth
                  sx={{
                    color: "white",
                    textTransform: "none",
                    textShadow: "2px 2px 2px grey",
                  }}
                >
                  Ingresa con google
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={10} md={8}>
              <Typography
                color={"secondary.primary"}
                variant={"h6"}
                mt={1}
                align="center"
              >
                ¿Aun no tienes cuenta?
              </Typography>
            </Grid>
            <Grid item xs={10} md={5}>
              <Tooltip title="ingresa con google">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/register")}
                  type="button"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    textShadow: "2px 2px 2px grey",
                  }}
                >
                  Registrate
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;
