// 'use client';
// import React, { useEffect, useState } from 'react';

// const LoginPage = () => {
//     const [state, setState] = useState<string>('');

//     // Generate a random string for the state parameter
//     useEffect(() => {
//         const generatedState = Math.random().toString(36).substring(2);  // Generates a random string
//         setState(generatedState);

//         // Store the state in localStorage (or cookie/sessionStorage)
//         localStorage.setItem('line-login-state', generatedState);
//     }, []);

//     const lineLoginUrl = process.env.LINE_CHANNEL_ID && process.env.LINE_CALLBACK_URL 
//         ? `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.LINE_CHANNEL_ID}&redirect_uri=${process.env.LINE_CALLBACK_URL}&state=${state}&scope=profile openid`
//         : '#';

//     return (
//         <div>
//             <h1>Login with Line</h1>
//             <a href={lineLoginUrl}>
//                 <button>Login with Line</button>
//             </a>
//         </div>
//     );
// };

// export default LoginPage;
