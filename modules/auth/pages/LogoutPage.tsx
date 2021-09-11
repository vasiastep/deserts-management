import Router from 'next/router';
import { destroyCookie } from 'nookies';

const LogoutPage = () => null;

LogoutPage.getInitialProps = async (ctx: any) => {
  destroyCookie(ctx, 'token');
  destroyCookie(ctx, 'user');

  if (ctx.res && typeof ctx.res.writeHead === 'function') {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  } else {
    Router.push('/');
  }

  return {};
};

export default LogoutPage;
