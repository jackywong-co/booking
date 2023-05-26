import { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Grid
} from '@mui/material';
import useIsMounted from '../useIsMountedRef';
import QRCode from 'qrcode.react';
import Cryptor from '../cryptor';

export default function LoginPage() {
  const isMountedRef = useIsMounted();
  const navigate = useNavigate();
  const captchaRef = useRef(null);

  const [openTFADialog, setOpenTFADialog] = useState(false);
  const [totpQRC, setTotpQRC] = useState(null);
  const [totpKey, setTotpKey] = useState(null);

  const loginSubmission = async (token, values, totpCode, setSubmitting, setFieldError) => {
    const pw = Cryptor.aes_ecb_encrypt(values.password, process.env.REACT_APP_DATA_TRANSMIT_KEY);

    // const res = await UserAPI.login({
    //   username: values.username,
    //   password: pw,
    //   merchant_id: values.merchantId,
    //   captcha_token: token,
    //   totp_code: totpCode
    // });

    // if (res && res.data) {
    //   if (res.data.message === SystemMessageState.TFA_REGISTER) {
    //     setTotpQRC(res.data.totp_qrc);
    //     setTotpKey(res.data.totp_key);
    //     setOpenTFADialog(true);
    //     setSubmitting(false);
    //     return;
    //   }

    //   if (res.data.message === SystemMessageState.TFA_REQUEST) {
    //     setTotpQRC(null);
    //     setTotpKey(null);
    //     setOpenTFADialog(true);
    //     setSubmitting(false);
    //     return;
    //   }

    //   navigate('/');
    // } else {
    //   switch (res && res.response !== null && res.response.data != null) {
    //     case res.response.data.error === SystemErrorState.USER_NOT_FOUND:
    //       setFieldError('errorMessage', t('system.login.error.password'));
    //       break;
    //     case res.response.data.error === SystemErrorState.USERNAME_PASSWORD_FAIL:
    //       setFieldError('errorMessage', t('system.login.error.password'));
    //       break;
    //     case res.response.data.error === SystemErrorState.USER_SUSPEND:
    //       setFieldError('errorMessage', t('system.login.error.suspend'));
    //       break;
    //     case res.response.data.error === SystemErrorState.PERMISSION_FAIL:
    //       setFieldError('errorMessage', t('system.login.error.permission_denied'));
    //       break;
    //     case res.response.data.error === SystemErrorState.CAPTCHA_VERIFICATION_FAIL:
    //       setFieldError('errorMessage', t('system.login.error.captcha'));
    //       break;
    //     case res.response.data.error === SystemErrorState.TWO_FACTOR_AUTHENTICATION_FAIL:
    //       setFieldError('code', t('system.login.error.tfa_verify_fail'));
    //       break;
    //     default:
    //       console.log('error');
    //   }
    // }

    if (isMountedRef.current) setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      merchantId: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().max(99).required(),
      password: Yup.string().max(50).required(),
      merchantId: Yup.string().max(99).required()
    }),
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      // if (process.env.REACT_APP_HCAPTCHA_ENABLE === 'true') {
      //   captchaRef.current.execute();
      //   setSubmitting(false);
      // } else {
      //   loginSubmission(null, values, null, setSubmitting, setFieldError);
      // }
    }
  });

  const formik2 = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema: Yup.object().shape({
      code: Yup.number().positive().integer().required().max(999999).min(0)
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      loginSubmission(null, formik.values, values.code, setSubmitting, setFieldError);
    }
  });

  const handleCloseTFADialog = () => {
    formik2.resetForm();
    setOpenTFADialog(false);
  };

  const onVerity = (token: string) => {
    loginSubmission(token, formik.values, null, formik.setSubmitting, formik.setFieldError);
  };
  const onExpire = () => {
    if (isMountedRef.current) formik.setFieldError('errorMessage', 'Captcha Expire');
  };
  const onError = (err: any) => {
    if (isMountedRef.current) formik.setFieldError('errorMessage', `Captcha Error: ${err}`);
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography color="textPrimary" variant="h2">
                Login
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Booking
              </Typography>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label="Password"
              name="password"
              value={formik.values.password}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Typography variant="caption" display="block" gutterBottom sx={{ color: 'error.main', mx: 1 }}>
              Error
            </Typography>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
              >
                Login
              </Button>
              <HCaptcha
                ref={captchaRef}
                size="invisible"
                sitekey="17f3aaae-40c3-4e6d-a351-beed2a2b40b7"
                onVerify={onVerity}
                onError={onError}
                onExpire={onExpire}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Dialog open={openTFADialog} fullWidth>
        <Box component="form" autoComplete="off" onSubmit={formik2.handleSubmit}>
          <DialogTitle>
            <Box sx={{ typography: 'h3' }}>2FA</Box>
          </DialogTitle>
          <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ py: 3, px: 3 }}>
            {totpQRC && totpKey && (
              <>
                <Grid item sx={{ mb: 5 }}>
                  <DialogContentText>Download 2FA Authenticator</DialogContentText>
                  <DialogContentText>Scan QR Code</DialogContentText>
                </Grid>
                <Grid item>
                  <QRCode value={totpQRC} />
                </Grid>
                <Grid item sx={{ mb: 5 }}>
                  <Typography>2FA Key: {totpKey}</Typography>
                </Grid>
              </>
            )}
            <Grid item>
              <Grid item>
                <Typography> Enter 2FA Code</Typography>
              </Grid>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Input Six Digit Code"
                name="code"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                value={formik2.values.code}
                error={Boolean(formik2.touched.code && formik2.errors.code)}
                helperText={formik2.touched.code && formik2.errors.code}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button color="primary" variant="contained" autoFocus type="submit" disabled={formik2.isSubmitting}>
              Confirm
            </Button>
            <Button onClick={handleCloseTFADialog} color="primary" variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
