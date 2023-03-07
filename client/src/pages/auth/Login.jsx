import { Box } from '@mui/material'
import { Stack } from '@mui/system';
import { Formik } from "formik";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as yup from "yup";
import CustomButton from '../../components/CustomButton';
import Input from '../../components/form/Input';
import useAxios from '../../hooks/useAxios';
import { tokens } from '../../theme';
import { setLogin } from '../../redux/features/authSlice';
import { useEffect } from 'react';
import { useLoginMutation } from '../../redux/api/authApi';
import { toast, ToastContainer } from 'react-toastify';

const schema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  // const {data, loading, execute} = useAxios({'url': 'http://localhost:4000/api/login', method: 'POST'}, false);
  const [login, { isLoading, isSuccess, isError,data  }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colors = tokens();

  useEffect(() => {
    if (isError) {
      toast.error("Invalid credentials!");
    }
    if(isSuccess){
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
      
      navigate("/dashboard");
    }

  }, [isSuccess, isError]);

  const onSubmit = async (values, onSubmitProps) => {
    await login(values);
    // onSubmitProps.resetForm();
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight='100vh'
            sx={{ backgroundColor: colors.primary}}
          >
            <Stack spacing={1}
              sx={{
                backgroundColor: colors.white,
                minWidth: '370px',
                padding: '2rem',
                borderRadius: '6px'
              }}
            >
              <Input label="Email" name="email" type="email" />
              <Input label="Password" name="password" type="password" />
              <CustomButton 
                type='submit'
                text='Login'
                btnstyle='primary'
                loading={isLoading}
              />
            </Stack>
          </Box>
          <ToastContainer />
        </form>
      )}
    </Formik>
  );
}

export default Login