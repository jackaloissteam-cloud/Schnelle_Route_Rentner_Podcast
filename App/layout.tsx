import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import React from "react";

// Falls die styles.css im Hauptverzeichnis liegt, wird sie hier eingebunden
// Der Pfad "../styles.css?url" ist spezifisch für Vinxi/TanStack Start
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f9f9f9', 
      padding: '0 20px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', margin: '0', color: '#333' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginTop: '10px' }}>Seite nicht gefunden</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>
          Die gewünschte Route existiert leider nicht oder wurde verschoben.
        </p>
        <div style={{ marginTop: '20px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#0070f3',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rentner_Podcast_Route_Zeit" },
      { name: "description", content: "Routenplaner für den Rentner Podcast." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
