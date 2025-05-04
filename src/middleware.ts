import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';
import { decode } from 'jsonwebtoken';

const publicRoutes = [
  { path: '/login', whenAuthenticated: 'redirect' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === pathname);
  const authToken = request.cookies.get('token')?.value;

  // Se não estiver autenticado e for rota pública → segue
  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  // Se não estiver autenticado e for rota privada → redireciona pro login
  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // Se estiver autenticado e acessar rota pública que redireciona → volta para home
  if (authToken && publicRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // Verifica se o token está expirado
  if (authToken) {
    try {
      const decoded: any = decode(authToken);
      const now = Math.floor(Date.now() / 1000);

      if (decoded?.exp && decoded.exp < now) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
      }
    } catch (err) {
      // Se o token estiver corrompido
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // Token válido → permite o acesso
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

