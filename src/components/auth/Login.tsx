import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import type { TUser } from '../../types/TAuth';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (values: TUser) => {

      if (authContext?.login(values.email, values.password)) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    },[authContext, navigate]

  );

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">

          <TextField fullWidth size='small'
            label="Email"  name="email"
            value={formik.values.email} onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined" />

          <TextField  fullWidth className='!my-5'
            label="Password"  name="password" type="password"
            value={formik.values.password}  onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined" size='small'/>

          <FormControlLabel control={<Checkbox />} label="Remember me"
            className="mb-4" />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit"  variant="contained"   color="primary"
            fullWidth  disabled={formik.isSubmitting}   >
            Login </Button>

        </form>
        <p className="mt-4 text-center">
          Don't have an account?
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login