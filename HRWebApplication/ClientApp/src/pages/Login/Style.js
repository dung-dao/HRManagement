import styled from 'styled-components';

const LoginStyle = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    background: url("/assets/bg-login.svg");
    
    #login .banner-wrapper {
        background: linear-gradient(326deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
        padding: 20px 20px 20px 20px;
        border: 20px solid #f0f2f5;
        border-right: 0px;
        box-shadow: 15px 15px ghostwhite;
    }

    #login .login-wrapper {
        background-color: #f0f2f5;
        box-shadow: 15px 15px ghostwhite;
        padding: 20px;
    }

    #login .wewear-text {
        color: whitesmoke;
        text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4),
            0px 8px 13px rgba(0, 0, 0, 0.1),
            0px 18px 23px rgba(0, 0, 0, 0.1);
    }

    #login .seller-center-text {
        color: white;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }

    #login .login-card .ant-card-cover {
        text-align: center;
        padding: 30px;
    }

    #login .login-card {
        box-shadow: rgba(0,0,0,0.3) 0px 5px 30px 0px;
    }
`;

export default LoginStyle;