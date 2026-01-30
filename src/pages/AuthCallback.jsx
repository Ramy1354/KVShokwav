import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleCallback } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      navigate('/');
      return;
    }

    if (code) {
      handleCallback(code).then(() => {
        navigate('/dashboard');
      });
    } else {
      navigate('/');
    }
  }, [searchParams, handleCallback, navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'white'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        borderTop: '3px solid #ff0000',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px'
      }}></div>
      <p>Authenticating with Discord...</p>
    </div>
  );
}

export default AuthCallback;
