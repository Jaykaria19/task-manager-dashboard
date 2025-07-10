import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material'; 
import type { TUser } from '../../types/TAuth';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

 const Signup = () => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback( async (values: TUser & { confirmPassword: string }) => {

      if (authContext?.signup(values.email, values.password)) {
        navigate('/dashboard');
      } else {
        setError('Email already exists');
      }
    }, [authContext, navigate] );

  const formik = useFormik({
    initialValues: { email: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">

          <TextField fullWidth size='small'
            label="Email" name="email"
            value={formik.values.email} onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"/>

          <TextField size='small' className='!my-5'
            fullWidth  label="Password"
            name="password" type="password"
            value={formik.values.password} onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"/>

          <TextField
            fullWidth size='small' className='!mb-5' label="Confirm Password"
            name="confirmPassword" type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            variant="outlined"/>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button  type="submit"  variant="contained"
            color="primary" fullWidth disabled={formik.isSubmitting}>
            Sign Up
          </Button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup