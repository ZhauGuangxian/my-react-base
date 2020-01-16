import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
function LoginPage(props) {
    return (
        <div>
            <p>这是登陆页</p>
            <Link to="/home">去后面</Link>
            <a>i</a>
        </div>
    )
}

export default LoginPage;