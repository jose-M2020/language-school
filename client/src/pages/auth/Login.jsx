import { Box } from '@mui/material'
import { Stack } from '@mui/system';
import { Formik } from "formik";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as yup from "yup";
import CustomButton from '../../components/CustomButton';
import Input from '../../components/form/Input';
import useAxios from '../../hooks/useAxios';
import { POST } from '../../services/Api';
import { tokens } from '../../theme';
import { setLogin } from '../../state';
import { useEffect } from 'react';

const schema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const {data, error, loading, execute} = useAxios({url: POST.login, method: 'POST'}, false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colors = tokens();

  useEffect(() => {
    if (data) {
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );

      navigate("/dashboard");
    }
  }, [data]);

  const onSubmit = (values, onSubmitProps) => {
    execute(values);

    // if (!data) {
    //   return
    // }
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
                loading={loading}
              />
            </Stack>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default Login