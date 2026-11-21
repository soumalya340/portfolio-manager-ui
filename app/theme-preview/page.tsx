// Written by `astryx experimental theme preview add`. `preview add`, `preview remove` and
// theme-preview.json keep it: edit the list with those commands, not by hand.
'use client';

import * as React from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav, SideNavItem} from '@astryxdesign/core/SideNav';
import {TopNav, TopNavHeading} from '@astryxdesign/core/TopNav';
import Page0 from "./_pages/overview";
import Page1 from "./_pages/components";

const FRAME: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  overflow: 'auto',
  overscrollBehavior: 'none',
  background: 'var(--color-background-body)',
  color: 'var(--color-text-primary)',
};

const PAGES = [
  {id: "overview", label: "Overview", Page: Page0},
  {id: "components", label: "Components", Page: Page1},
];

export default function ThemePreviewPage() {
  const [page, setPage] = React.useState(PAGES[0]?.id);
  const fromUrl = () => new URLSearchParams(window.location.search).get('page');
  React.useEffect(() => {
    const sync = () => { const id = fromUrl(); setPage(id && PAGES.some(p => p.id === id) ? id : PAGES[0]?.id); };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  const go = (id: string) => {
    setPage(id);
    const url = new URL(window.location.href);
    url.searchParams.set('page', id);
    window.history.pushState(null, '', url);
  };
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);
  const current = (PAGES.find(p => p.id === page) ?? PAGES[0]) as (typeof PAGES)[number];
  return (
    <>
      <div style={FRAME}>
      <AppShell
        height="fill"
        topNav={
          <TopNav label="Theme preview" heading={<TopNavHeading heading={"app theme"} />} endContent={
          null
          } />
        }
        sideNav={
          <SideNav>
            {PAGES.map(p => (
              <SideNavItem key={p.id} label={p.label} isSelected={p.id === current.id} href={`?page=${p.id}`} onClick={e => { if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); go(p.id); }} />
            ))}
          </SideNav>
        }>
        {ready ? <current.Page /> : null}
      </AppShell>
      </div>
    </>
  );
}
