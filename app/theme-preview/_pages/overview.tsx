// Written by `astryx experimental theme preview add`: the theme at a glance, built to show what themes most often break.
'use client';

import * as React from 'react';
import {Badge} from "@astryxdesign/core/Badge";
import {Banner} from "@astryxdesign/core/Banner";
import {Button} from "@astryxdesign/core/Button";
import {Card} from "@astryxdesign/core/Card";
import {CheckboxInput} from "@astryxdesign/core/CheckboxInput";
import {Grid} from "@astryxdesign/core/Grid";
import {HStack} from "@astryxdesign/core/HStack";
import {Heading} from "@astryxdesign/core/Heading";
import {Link} from "@astryxdesign/core/Link";
import {Popover} from "@astryxdesign/core/Popover";
import {ProgressBar} from "@astryxdesign/core/ProgressBar";
import {RadioList, RadioListItem} from "@astryxdesign/core/RadioList";
import {SegmentedControl, SegmentedControlItem} from "@astryxdesign/core/SegmentedControl";
import {Selector} from "@astryxdesign/core/Selector";
import {SideNav, SideNavItem} from "@astryxdesign/core/SideNav";
import {Spinner} from "@astryxdesign/core/Spinner";
import {StatusDot} from "@astryxdesign/core/StatusDot";
import {Switch} from "@astryxdesign/core/Switch";
import {Tab, TabList} from "@astryxdesign/core/TabList";
import {Table} from "@astryxdesign/core/Table";
import {Text} from "@astryxdesign/core/Text";
import {TextInput} from "@astryxdesign/core/TextInput";
import {Tooltip} from "@astryxdesign/core/Tooltip";
import {TopNav, TopNavItem} from "@astryxdesign/core/TopNav";
import {VStack} from "@astryxdesign/core/VStack";

type Part = React.ComponentType<{children?: React.ReactNode} & Record<string, unknown>>;
const C = {Badge: Badge as unknown as Part, Banner: Banner as unknown as Part, Button: Button as unknown as Part, Card: Card as unknown as Part, CheckboxInput: CheckboxInput as unknown as Part, Grid: Grid as unknown as Part, HStack: HStack as unknown as Part, Heading: Heading as unknown as Part, Link: Link as unknown as Part, Popover: Popover as unknown as Part, ProgressBar: ProgressBar as unknown as Part, RadioList: RadioList as unknown as Part, RadioListItem: RadioListItem as unknown as Part, SegmentedControl: SegmentedControl as unknown as Part, SegmentedControlItem: SegmentedControlItem as unknown as Part, Selector: Selector as unknown as Part, SideNav: SideNav as unknown as Part, SideNavItem: SideNavItem as unknown as Part, Spinner: Spinner as unknown as Part, StatusDot: StatusDot as unknown as Part, Switch: Switch as unknown as Part, Tab: Tab as unknown as Part, TabList: TabList as unknown as Part, Table: Table as unknown as Part, Text: Text as unknown as Part, TextInput: TextInput as unknown as Part, Tooltip: Tooltip as unknown as Part, TopNav: TopNav as unknown as Part, TopNavItem: TopNavItem as unknown as Part, VStack: VStack as unknown as Part};

/** Shows a short note for a component that throws, so the rest of the page renders. */
class Safe extends React.Component<{name: string, children: React.ReactNode}, {failed: boolean}> {
  override state = {failed: false};
  static getDerivedStateFromError() {
    return {failed: true};
  }
  override render() {
    return this.state.failed ? <div className="tp-note">{this.props.name} could not render here</div> : this.props.children;
  }
}

/** The main colors, as the theme resolves them. */
const SWATCHES = [
  {name: "accent", token: "--color-accent"},
  {name: "neutral", token: "--color-background-surface"},
  {name: "text", token: "--color-text-primary"},
  {name: "info", token: "--color-info"},
  {name: "success", token: "--color-success"},
  {name: "warning", token: "--color-warning"},
  {name: "danger", token: "--color-error"},
];

/** The first family of the body and heading fonts, read from the theme. */
function FontNames() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [fonts, setFonts] = React.useState('');
  React.useEffect(() => {
    if (!ref.current) return;
    const style = getComputedStyle(ref.current);
    const first = (token: string) => (style.getPropertyValue(token).split(',')[0] ?? '').replace(/["']/g, '').trim() || 'default';
    // A family the browser does not have measures as its fallback does.
    const GENERIC = /^(default|serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-[a-z-]+|math|emoji|fangsong)$/i;
    const missing = (family: string) => {
      if (GENERIC.test(family)) return false;
      const ctx = document.createElement('canvas').getContext('2d');
      if (!ctx) return false;
      const sample = 'mmmmmmmmmwwwwwww1234567890';
      return ['monospace', 'serif'].every(fallback => {
        ctx.font = `48px ${fallback}`;
        const plain = ctx.measureText(sample).width;
        ctx.font = `48px "${family}", ${fallback}`;
        return ctx.measureText(sample).width === plain;
      });
    };
    const shown = (token: string) => { const f = first(token); return missing(f) ? `${f} (not installed here)` : f; };
    const write = () => setFonts(`Body: ${shown('--font-family-body')}. Headings: ${shown('--font-family-heading')}.`);
    write();
    // Read again when the theme changes live (a stylesheet or theme
    // update while the page is open) and when a font finishes loading.
    document.fonts?.ready.then(write);
    document.fonts?.addEventListener?.('loadingdone', write);
    let queued = 0;
    const soon = () => { if (!queued) queued = requestAnimationFrame(() => { queued = 0; write(); }); };
    const watch = new MutationObserver(soon);
    watch.observe(document.head, {childList: true, subtree: true, characterData: true});
    watch.observe(document.documentElement, {attributes: true, subtree: true, attributeFilter: ['style', 'class', 'data-theme']});
    return () => {
      watch.disconnect();
      cancelAnimationFrame(queued);
      document.fonts?.removeEventListener?.('loadingdone', write);
    };
  }, []);
  return (
    <div ref={ref} style={{color: 'var(--color-text-secondary)', fontSize: 13}}>
      {fonts}
    </div>
  );
}

export default function OverviewPage() {
  return (
    <div className="tp-page">
      <style>{".tp-page{display:grid;gap:20px;padding:24px 24px 160px;color:var(--color-text-primary)}.tp-group{font:600 13px ui-monospace,monospace;margin:0 0 10px;opacity:.7;text-transform:uppercase;letter-spacing:.04em}.tp-head{display:flex;flex-wrap:wrap;gap:16px;align-items:end;justify-content:space-between}.tp-swatches{display:flex;flex-wrap:wrap;gap:8px}.tp-swatch{display:grid;gap:4px;font:11px ui-monospace,monospace;color:var(--color-text-secondary)}.tp-chip{width:56px;height:36px;border-radius:var(--radius-element);border:1px solid var(--color-border)}.tp-note{font:11px ui-monospace,monospace;opacity:.6;padding:6px 8px;border:1px dashed #8886}"}</style>
      <header className="tp-head">
        <div>
          <h1 style={{margin: 0, fontSize: 28}}>{"The theme at a glance"}</h1>
          <FontNames />
        </div>
        <div className="tp-swatches">
          {SWATCHES.map(s => (
            <div key={s.name} className="tp-swatch" title={s.token}>
              <div className="tp-chip" style={{background: `var(${s.token})`}} />
              {s.name}
            </div>
          ))}
        </div>
      </header>
      <section className="tp-section">
        <h2 className="tp-group">Open layers</h2>
        <Safe name="Open layers">
          <C.Card variant="transparent">
            <C.Grid columns={{"minWidth":280,"repeat":"fit"}} gap={4}>
              <C.Card variant="transparent" minHeight={150}>
                <C.Popover isOpen hasAutoFocus={false} label="Menu" placement="below" content={<C.VStack gap={1}>
                    <C.Text type="label">
                      {"A popover shown open"}
                    </C.Text>
                    <C.Button label="Rename" variant="ghost" size="sm" />
                    <C.Button label="Delete" variant="ghost" size="sm" />
                  </C.VStack>}>
                  <C.Button label="Anchor" variant="secondary" />
                </C.Popover>
              </C.Card>
              <C.Card variant="transparent" minHeight={150}>
                <C.Tooltip isOpen placement="below" content="A tooltip shown open">
                  <C.Button label="Tooltip anchor" variant="secondary" />
                </C.Tooltip>
              </C.Card>
            </C.Grid>
          </C.Card>
        </Safe>
      </section>
      <section className="tp-section">
        <h2 className="tp-group">Type</h2>
        <Safe name="Type">
          <C.VStack gap={2}>
            <C.Heading level={1} type="display-1">
              {"Display"}
            </C.Heading>
            <C.Heading level={1}>
              {"A long heading that has to wrap onto a second line on most screens, so line height and wrapping show"}
            </C.Heading>
            <C.Heading level={2}>
              {"Heading 2"}
            </C.Heading>
            <C.Heading level={3}>
              {"Heading 3"}
            </C.Heading>
            <C.Text type="large">
              {"Large text for introductions."}
            </C.Text>
            <C.Text type="body">
              {"Body text: the quick brown fox jumps over the lazy dog. Numbers 0123456789."}
            </C.Text>
            <C.Text type="label">
              {"Label text"}
            </C.Text>
            <C.Text type="supporting">
              {"Supporting text, the smallest size"}
            </C.Text>
            <C.Text type="code">
              {"const code = true;"}
            </C.Text>
          </C.VStack>
        </Safe>
      </section>
      <section className="tp-section">
        <h2 className="tp-group">Surfaces</h2>
        <Safe name="Surfaces">
          <C.Grid columns={{"minWidth":200,"repeat":"fit"}} gap={3}>
            <C.Card minHeight={120}>
              <C.VStack gap={1}>
                <C.Text type="label">
                  {"Card"}
                </C.Text>
                <C.Text type="body">
                  {"Body text reads on this surface."}
                </C.Text>
                <C.Text type="supporting">
                  {"Supporting text, the smallest level."}
                </C.Text>
                <C.Link href="#">
                  {"A link"}
                </C.Link>
              </C.VStack>
            </C.Card>
            <C.Card variant="muted" minHeight={120}>
              <C.VStack gap={1}>
                <C.Text type="label">
                  {"Muted card"}
                </C.Text>
                <C.Text type="body">
                  {"Body text reads on this surface."}
                </C.Text>
                <C.Text type="supporting">
                  {"Supporting text, the smallest level."}
                </C.Text>
                <C.Link href="#">
                  {"A link"}
                </C.Link>
              </C.VStack>
            </C.Card>
            <C.Card variant="blue" minHeight={120}>
              <C.VStack gap={1}>
                <C.Text type="label">
                  {"Colored card"}
                </C.Text>
                <C.Text type="body">
                  {"Body text reads on this surface."}
                </C.Text>
                <C.Text type="supporting">
                  {"Supporting text, the smallest level."}
                </C.Text>
                <C.Link href="#">
                  {"A link"}
                </C.Link>
              </C.VStack>
            </C.Card>
            <C.Card variant="transparent" minHeight={120}>
              <C.VStack gap={1}>
                <C.Text type="label">
                  {"Page surface"}
                </C.Text>
                <C.Text type="body">
                  {"Body text reads on this surface."}
                </C.Text>
                <C.Text type="supporting">
                  {"Supporting text, the smallest level."}
                </C.Text>
                <C.Link href="#">
                  {"A link"}
                </C.Link>
              </C.VStack>
            </C.Card>
          </C.Grid>
        </Safe>
      </section>
      <section className="tp-section">
        <h2 className="tp-group">Buttons</h2>
        <Safe name="Buttons">
          <C.VStack gap={2}>
            <C.HStack gap={2} align="center" wrap="wrap">
              <C.Button label="primary sm" variant="primary" size="sm" />
              <C.Button label="secondary sm" variant="secondary" size="sm" />
              <C.Button label="ghost sm" variant="ghost" size="sm" />
              <C.Button label="destructive sm" variant="destructive" size="sm" />
            </C.HStack>
            <C.HStack gap={2} align="center" wrap="wrap">
              <C.Button label="primary md" variant="primary" size="md" />
              <C.Button label="secondary md" variant="secondary" size="md" />
              <C.Button label="ghost md" variant="ghost" size="md" />
              <C.Button label="destructive md" variant="destructive" size="md" />
            </C.HStack>
            <C.HStack gap={2} align="center" wrap="wrap">
              <C.Button label="primary lg" variant="primary" size="lg" />
              <C.Button label="secondary lg" variant="secondary" size="lg" />
              <C.Button label="ghost lg" variant="ghost" size="lg" />
              <C.Button label="destructive lg" variant="destructive" size="lg" />
            </C.HStack>
            <C.HStack gap={2} align="center" wrap="wrap">
              <C.Button label="Disabled" variant="primary" isDisabled />
              <C.Button label="Disabled" variant="secondary" isDisabled />
              <C.Button label="Loading" variant="primary" isLoading />
              <C.Button label="A very long button label that must truncate" variant="secondary" width={180} />
            </C.HStack>
          </C.VStack>
        </Safe>
      </section>
      <section className="tp-section">
        <h2 className="tp-group">Inputs</h2>
        <Safe name="Inputs">
          <C.Grid columns={{"minWidth":220,"repeat":"fit"}} gap={3}>
            <C.TextInput label="Default" value="Jordan Lee" onChange={() => {}} />
            <C.TextInput label="Placeholder" value="" placeholder="Type to search" onChange={() => {}} />
            <C.TextInput label="Error" value="not-an-email" status={{"type":"error","message":"Enter a valid email address"}} onChange={() => {}} />
            <C.TextInput label="Disabled" value="Read only" isDisabled onChange={() => {}} />
            <C.Selector label="Selector" value="week" options={[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"}]} onChange={() => {}} />
            <C.VStack gap={2}>
              <C.CheckboxInput label="Checked" value onChange={() => {}} />
              <C.CheckboxInput label="Unchecked" value={false} onChange={() => {}} />
              <C.Switch label="On" value onChange={() => {}} />
              <C.Switch label="Off" value={false} onChange={() => {}} />
            </C.VStack>
            <C.RadioList label="Radio" value="a" onChange={() => {}}>
              <C.RadioListItem value="a" label="Selected" />
              <C.RadioListItem value="b" label="Other" />
              <C.RadioListItem value="c" label="Disabled" isDisabled />
            </C.RadioList>
          </C.Grid>
        </Safe>
      </section>
      <section className="tp-section">
        <h2 className="tp-group">Navigation</h2>
        <Safe name="Navigation">
          <C.VStack gap={3}>
            <C.TopNav label="Top" heading="App">
              <C.TopNavItem label="Selected" href="#" isSelected />
              <C.TopNavItem label="Other" href="#" />
              <C.TopNavItem label="Another" href="#" />
            </C.TopNav>
            <C.TabList value="a" onChange={() => {}}>
              <C.Tab value="a" label="Selected tab" />
              <C.Tab value="b" label="Other tab" />
              <C.Tab value="c" label="Third tab" />
            </C.TabList>
            <C.SegmentedControl label="Range" value="b" onChange={() => {}}>
              <C.SegmentedControlItem value="a" label="Day" />
              <C.SegmentedControlItem value="b" label="Week" />
              <C.SegmentedControlItem value="c" label="Month" />
            </C.SegmentedControl>
            <C.SideNav label="Side">
              <C.SideNavItem label="Selected item" href="#" isSelected />
              <C.SideNavItem label="Other item" href="#" />
            </C.SideNav>
          </C.VStack>
        </Safe>
      </section>
      <section className="tp-section">
        <h2 className="tp-group">Status</h2>
        <Safe name="Status">
          <C.VStack gap={3}>
            <C.HStack gap={2} align="center" wrap="wrap">
              <C.Badge variant="neutral" label="Neutral" />
              <C.Badge variant="info" label="Info" />
              <C.Badge variant="success" label="Success" />
              <C.Badge variant="warning" label="Warning" />
              <C.Badge variant="error" label="Error" />
            </C.HStack>
            <C.HStack gap={3} align="center" wrap="wrap">
              <C.StatusDot variant="success" label="success" />
              <C.StatusDot variant="warning" label="warning" />
              <C.StatusDot variant="error" label="error" />
              <C.StatusDot variant="accent" label="accent" />
              <C.StatusDot variant="neutral" label="neutral" />
            </C.HStack>
            <C.Banner status="info" title="A info banner" description="Its text must read on its tinted fill." collapsible={false} />
            <C.Banner status="success" title="A success banner" description="Its text must read on its tinted fill." collapsible={false} />
            <C.Banner status="warning" title="A warning banner" description="Its text must read on its tinted fill." collapsible={false} />
            <C.Banner status="error" title="A error banner" description="Its text must read on its tinted fill." collapsible={false} />
            <C.HStack gap={3} align="center">
              <C.ProgressBar label="accent" variant="accent" value={60} width={120} />
              <C.ProgressBar label="success" variant="success" value={60} width={120} />
              <C.ProgressBar label="warning" variant="warning" value={60} width={120} />
              <C.ProgressBar label="error" variant="error" value={60} width={120} />
              <C.Spinner size="md" />
            </C.HStack>
          </C.VStack>
        </Safe>
      </section>
      <section className="tp-section">
        <h2 className="tp-group">Table</h2>
        <Safe name="Table">
          <C.Table data={[{"id":1,"task":"Review the quarterly roadmap with every team lead before the planning offsite next week","owner":"Alex","status":"In progress"},{"id":2,"task":"Ship onboarding","owner":"Sam","status":"Done"},{"id":3,"task":"Fix login timeout","owner":"Riley","status":"Blocked"},{"id":4,"task":"Audit color contrast","owner":"Jordan","status":"Planned"}]} idKey="id" dividers="rows" textOverflow="truncate" columns={[{"key":"task","header":"Task (truncates)"},{"key":"owner","header":"Owner"},{"key":"status","header":"Status"}]} />
        </Safe>
      </section>
    </div>
  );
}
