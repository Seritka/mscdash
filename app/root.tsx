import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return { title: "우리 학교 현황" };
};

export default function App() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            margin: 0;
            color: rgba(0,0,0,.85);
            font-size: 14px;
            font-family: Pretendard Variable,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
            font-variant: tabular-nums;
            line-height: 1.5715;
            background-color: #fff;
            -webkit-font-feature-settings: "tnum","tnum";
            -moz-font-feature-settings: "tnum","tnum";
            font-feature-settings: "tnum","tnum";
          }

          h1, h2, h3, h4, h5, h6 {
            margin-top: 0;
            margin-bottom: 0.5em;
            color: rgba(0,0,0,.85);
            font-weight: 500;
        }

        ` }} />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
