'use client';

const handleLogin = () => {
    window.location.href = '/api/line-login'; // Redirect to the login URL
};

const LoginButton = () => {
    return <button onClick={handleLogin}>Login with Line</button>;
};

export default LoginButton;
