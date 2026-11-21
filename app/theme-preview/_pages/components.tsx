// Written by `astryx experimental theme preview add`: every component grouped, each variant side by side, overlays open.
'use client';

import * as React from 'react';
import {AlertDialog} from "@astryxdesign/core/AlertDialog";
import {AppShell} from "@astryxdesign/core/AppShell";
import {AspectRatio} from "@astryxdesign/core/AspectRatio";
import {Avatar} from "@astryxdesign/core/Avatar";
import {AvatarGroup, AvatarGroupOverflow} from "@astryxdesign/core/AvatarGroup";
import {Badge} from "@astryxdesign/core/Badge";
import {Banner} from "@astryxdesign/core/Banner";
import {Blockquote} from "@astryxdesign/core/Blockquote";
import {BreadcrumbItem, Breadcrumbs} from "@astryxdesign/core/Breadcrumbs";
import {Button} from "@astryxdesign/core/Button";
import {ButtonGroup} from "@astryxdesign/core/ButtonGroup";
import {Calendar} from "@astryxdesign/core/Calendar";
import {Card} from "@astryxdesign/core/Card";
import {Carousel} from "@astryxdesign/core/Carousel";
import {Center} from "@astryxdesign/core/Center";
import {CheckboxInput} from "@astryxdesign/core/CheckboxInput";
import {CheckboxList, CheckboxListItem} from "@astryxdesign/core/CheckboxList";
import {Citation} from "@astryxdesign/core/Citation";
import {ClickableCard} from "@astryxdesign/core/ClickableCard";
import {Code} from "@astryxdesign/core/Code";
import {CodeBlock} from "@astryxdesign/core/CodeBlock";
import {Collapsible} from "@astryxdesign/core/Collapsible";
import {CommandPalette, CommandPaletteEmpty, CommandPaletteGroup, CommandPaletteInput, CommandPaletteItem, CommandPaletteList} from "@astryxdesign/core/CommandPalette";
import {ContextMenu, ContextMenuItem} from "@astryxdesign/core/ContextMenu";
import {DateInput} from "@astryxdesign/core/DateInput";
import {DateRangeInput} from "@astryxdesign/core/DateRangeInput";
import {DateTimeInput} from "@astryxdesign/core/DateTimeInput";
import {Dialog, DialogHeader} from "@astryxdesign/core/Dialog";
import {Divider} from "@astryxdesign/core/Divider";
import {DrawerHeader} from "@astryxdesign/core/Drawer";
import {DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSubMenu} from "@astryxdesign/core/DropdownMenu";
import {EmptyState} from "@astryxdesign/core/EmptyState";
import {Field} from "@astryxdesign/core/Field";
import {FieldStatus} from "@astryxdesign/core/FieldStatus";
import {FileInput} from "@astryxdesign/core/FileInput";
import {FormLayout} from "@astryxdesign/core/FormLayout";
import {Grid, GridSpan} from "@astryxdesign/core/Grid";
import {Heading} from "@astryxdesign/core/Heading";
import {HoverCard} from "@astryxdesign/core/HoverCard";
import {Icon} from "@astryxdesign/core/Icon";
import {InputGroup} from "@astryxdesign/core/InputGroup";
import {Item} from "@astryxdesign/core/Item";
import {Kbd} from "@astryxdesign/core/Kbd";
import {Layout, LayoutContent, LayoutFooter, LayoutHeader, LayoutPanel} from "@astryxdesign/core/Layout";
import {Link} from "@astryxdesign/core/Link";
import {List, ListItem} from "@astryxdesign/core/List";
import {Markdown} from "@astryxdesign/core/Markdown";
import {MetadataList, MetadataListItem} from "@astryxdesign/core/MetadataList";
import {MoreMenu} from "@astryxdesign/core/MoreMenu";
import {MultiSelector} from "@astryxdesign/core/MultiSelector";
import {NavHeadingMenu, NavHeadingMenuItem} from "@astryxdesign/core/NavMenu";
import {NavIcon} from "@astryxdesign/core/NavIcon";
import {NumberInput} from "@astryxdesign/core/NumberInput";
import {Outline} from "@astryxdesign/core/Outline";
import {OverflowList} from "@astryxdesign/core/OverflowList";
import {Overlay} from "@astryxdesign/core/Overlay";
import {Pagination} from "@astryxdesign/core/Pagination";
import {Popover} from "@astryxdesign/core/Popover";
import {PowerSearch} from "@astryxdesign/core/PowerSearch";
import {ProgressBar} from "@astryxdesign/core/ProgressBar";
import {RadioList, RadioListItem} from "@astryxdesign/core/RadioList";
import {ScrollableArea} from "@astryxdesign/core/ScrollableArea";
import {Section} from "@astryxdesign/core/Section";
import {SegmentedControl, SegmentedControlItem} from "@astryxdesign/core/SegmentedControl";
import {SelectableCard} from "@astryxdesign/core/SelectableCard";
import {Selector} from "@astryxdesign/core/Selector";
import {SideNav, SideNavCollapseButton, SideNavHeading, SideNavItem, SideNavSection} from "@astryxdesign/core/SideNav";
import {Skeleton} from "@astryxdesign/core/Skeleton";
import {Slider} from "@astryxdesign/core/Slider";
import {Spinner} from "@astryxdesign/core/Spinner";
import {Stack} from "@astryxdesign/core/Stack";
import {StatusDot} from "@astryxdesign/core/StatusDot";
import {Step, Stepper} from "@astryxdesign/core/Stepper";
import {Switch} from "@astryxdesign/core/Switch";
import {Tab, TabList, TabMenu} from "@astryxdesign/core/TabList";
import {Table} from "@astryxdesign/core/Table";
import {Text} from "@astryxdesign/core/Text";
import {TextArea} from "@astryxdesign/core/TextArea";
import {TextInput} from "@astryxdesign/core/TextInput";
import {Thumbnail} from "@astryxdesign/core/Thumbnail";
import {TimeInput} from "@astryxdesign/core/TimeInput";
import {Timer} from "@astryxdesign/core/Timer";
import {Timestamp} from "@astryxdesign/core/Timestamp";
import {Toast} from "@astryxdesign/core/Toast";
import {ToggleButton} from "@astryxdesign/core/ToggleButton";
import {Token} from "@astryxdesign/core/Token";
import {Tokenizer} from "@astryxdesign/core/Tokenizer";
import {Toolbar} from "@astryxdesign/core/Toolbar";
import {Tooltip} from "@astryxdesign/core/Tooltip";
import {TopNav, TopNavHeading, TopNavItem, TopNavMenu} from "@astryxdesign/core/TopNav";
import {TreeList} from "@astryxdesign/core/TreeList";
import {Typeahead} from "@astryxdesign/core/Typeahead";
import {VStack} from "@astryxdesign/core/VStack";

type Part = React.ComponentType<{children?: React.ReactNode} & Record<string, unknown>>;
const C = {AlertDialog: AlertDialog as unknown as Part, AppShell: AppShell as unknown as Part, AspectRatio: AspectRatio as unknown as Part, Avatar: Avatar as unknown as Part, AvatarGroup: AvatarGroup as unknown as Part, AvatarGroupOverflow: AvatarGroupOverflow as unknown as Part, Badge: Badge as unknown as Part, Banner: Banner as unknown as Part, Blockquote: Blockquote as unknown as Part, BreadcrumbItem: BreadcrumbItem as unknown as Part, Breadcrumbs: Breadcrumbs as unknown as Part, Button: Button as unknown as Part, ButtonGroup: ButtonGroup as unknown as Part, Calendar: Calendar as unknown as Part, Card: Card as unknown as Part, Carousel: Carousel as unknown as Part, Center: Center as unknown as Part, CheckboxInput: CheckboxInput as unknown as Part, CheckboxList: CheckboxList as unknown as Part, CheckboxListItem: CheckboxListItem as unknown as Part, Citation: Citation as unknown as Part, ClickableCard: ClickableCard as unknown as Part, Code: Code as unknown as Part, CodeBlock: CodeBlock as unknown as Part, Collapsible: Collapsible as unknown as Part, CommandPalette: CommandPalette as unknown as Part, CommandPaletteEmpty: CommandPaletteEmpty as unknown as Part, CommandPaletteGroup: CommandPaletteGroup as unknown as Part, CommandPaletteInput: CommandPaletteInput as unknown as Part, CommandPaletteItem: CommandPaletteItem as unknown as Part, CommandPaletteList: CommandPaletteList as unknown as Part, ContextMenu: ContextMenu as unknown as Part, ContextMenuItem: ContextMenuItem as unknown as Part, DateInput: DateInput as unknown as Part, DateRangeInput: DateRangeInput as unknown as Part, DateTimeInput: DateTimeInput as unknown as Part, Dialog: Dialog as unknown as Part, DialogHeader: DialogHeader as unknown as Part, Divider: Divider as unknown as Part, DrawerHeader: DrawerHeader as unknown as Part, DropdownMenu: DropdownMenu as unknown as Part, DropdownMenuGroup: DropdownMenuGroup as unknown as Part, DropdownMenuItem: DropdownMenuItem as unknown as Part, DropdownMenuRadioGroup: DropdownMenuRadioGroup as unknown as Part, DropdownMenuRadioItem: DropdownMenuRadioItem as unknown as Part, DropdownMenuSubMenu: DropdownMenuSubMenu as unknown as Part, EmptyState: EmptyState as unknown as Part, Field: Field as unknown as Part, FieldStatus: FieldStatus as unknown as Part, FileInput: FileInput as unknown as Part, FormLayout: FormLayout as unknown as Part, Grid: Grid as unknown as Part, GridSpan: GridSpan as unknown as Part, Heading: Heading as unknown as Part, HoverCard: HoverCard as unknown as Part, Icon: Icon as unknown as Part, InputGroup: InputGroup as unknown as Part, Item: Item as unknown as Part, Kbd: Kbd as unknown as Part, Layout: Layout as unknown as Part, LayoutContent: LayoutContent as unknown as Part, LayoutFooter: LayoutFooter as unknown as Part, LayoutHeader: LayoutHeader as unknown as Part, LayoutPanel: LayoutPanel as unknown as Part, Link: Link as unknown as Part, List: List as unknown as Part, ListItem: ListItem as unknown as Part, Markdown: Markdown as unknown as Part, MetadataList: MetadataList as unknown as Part, MetadataListItem: MetadataListItem as unknown as Part, MoreMenu: MoreMenu as unknown as Part, MultiSelector: MultiSelector as unknown as Part, NavHeadingMenu: NavHeadingMenu as unknown as Part, NavHeadingMenuItem: NavHeadingMenuItem as unknown as Part, NavIcon: NavIcon as unknown as Part, NumberInput: NumberInput as unknown as Part, Outline: Outline as unknown as Part, OverflowList: OverflowList as unknown as Part, Overlay: Overlay as unknown as Part, Pagination: Pagination as unknown as Part, Popover: Popover as unknown as Part, PowerSearch: PowerSearch as unknown as Part, ProgressBar: ProgressBar as unknown as Part, RadioList: RadioList as unknown as Part, RadioListItem: RadioListItem as unknown as Part, ScrollableArea: ScrollableArea as unknown as Part, Section: Section as unknown as Part, SegmentedControl: SegmentedControl as unknown as Part, SegmentedControlItem: SegmentedControlItem as unknown as Part, SelectableCard: SelectableCard as unknown as Part, Selector: Selector as unknown as Part, SideNav: SideNav as unknown as Part, SideNavCollapseButton: SideNavCollapseButton as unknown as Part, SideNavHeading: SideNavHeading as unknown as Part, SideNavItem: SideNavItem as unknown as Part, SideNavSection: SideNavSection as unknown as Part, Skeleton: Skeleton as unknown as Part, Slider: Slider as unknown as Part, Spinner: Spinner as unknown as Part, Stack: Stack as unknown as Part, StatusDot: StatusDot as unknown as Part, Step: Step as unknown as Part, Stepper: Stepper as unknown as Part, Switch: Switch as unknown as Part, Tab: Tab as unknown as Part, TabList: TabList as unknown as Part, TabMenu: TabMenu as unknown as Part, Table: Table as unknown as Part, Text: Text as unknown as Part, TextArea: TextArea as unknown as Part, TextInput: TextInput as unknown as Part, Thumbnail: Thumbnail as unknown as Part, TimeInput: TimeInput as unknown as Part, Timer: Timer as unknown as Part, Timestamp: Timestamp as unknown as Part, Toast: Toast as unknown as Part, ToggleButton: ToggleButton as unknown as Part, Token: Token as unknown as Part, Tokenizer: Tokenizer as unknown as Part, Toolbar: Toolbar as unknown as Part, Tooltip: Tooltip as unknown as Part, TopNav: TopNav as unknown as Part, TopNavHeading: TopNavHeading as unknown as Part, TopNavItem: TopNavItem as unknown as Part, TopNavMenu: TopNavMenu as unknown as Part, TreeList: TreeList as unknown as Part, Typeahead: Typeahead as unknown as Part, VStack: VStack as unknown as Part};

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

function Cell({name, children}: {name: string, children: React.ReactNode}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [empty, setEmpty] = React.useState(false);
  React.useEffect(() => {
    const row = ref.current?.querySelector('.tp-row');
    if (!row) return;
    const shown = Array.from(row.querySelectorAll('.tp-item > :not(.tp-label)')).some(el => {
      const box = el.getBoundingClientRect();
      return (box.width > 0 && box.height > 0 && (box.width > 2 || box.height > 2)) || (el.textContent ?? '').trim() !== '';
    });
    setEmpty(!shown);
  }, []);
  return (
    <div ref={ref} className="tp-cell">
      <div className="tp-name">{name}</div>
      {children}
      {empty ? <div className="tp-note">{name} shows nothing on its own here: it needs content or a trigger</div> : null}
    </div>
  );
}

const SAMPLE_ITEMS = [
  {id: "design", label: "Design"},
  {id: "engineering", label: "Engineering"},
  {id: "research", label: "Research"},
  {id: "marketing", label: "Marketing"},
];
const SAMPLE_SOURCE = {
  search: (query: string) => SAMPLE_ITEMS.filter(item => item.label.toLowerCase().includes(query.toLowerCase())),
  bootstrap: () => SAMPLE_ITEMS,
  cancel: () => {},
};

export default function ComponentsPage() {
  return (
    <div>
      <style>{".tp-group{font:600 14px ui-monospace,monospace;margin:16px 14px 0;opacity:.75}.tp-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:14px;align-items:start}.tp-cell{border:1px dashed #8885;padding:10px;overflow:hidden}.tp-name{font:600 12px ui-monospace,monospace;opacity:.6;margin-bottom:8px}.tp-row{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start}.tp-fill{flex:1 1 100%;max-height:300px;overflow:auto}.tp-label{font:10px ui-monospace,monospace;opacity:.5}.tp-cmd{display:block;margin-top:10px;font:10px ui-monospace,monospace;opacity:.75;overflow-wrap:break-word}.tp-note{font:11px ui-monospace,monospace;opacity:.6;padding:6px 8px;border:1px dashed #8886}"}</style>
      <section>
        <h2 className="tp-group">actions</h2>
        <div className="tp-grid">
        <Cell name="Button">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Button">
              <C.Button label="Click me" variant="primary" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">primary</div>
            <Safe name="Button">
              <C.Button label="Click me" variant="primary" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">secondary</div>
            <Safe name="Button">
              <C.Button label="Click me" variant="secondary" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">ghost</div>
            <Safe name="Button">
              <C.Button label="Click me" variant="ghost" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">destructive</div>
            <Safe name="Button">
              <C.Button label="Click me" variant="destructive" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="Button">
              <C.Button label="Click me" variant="primary" isLoading />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isInterruptible</div>
            <Safe name="Button">
              <C.Button label="Click me" variant="primary" isInterruptible />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isIconOnly</div>
            <Safe name="Button">
              <C.Button label="Click me" variant="primary" isIconOnly icon={<C.Icon icon="check" />} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on button"}</code>
        </Cell>
        <Cell name="ButtonGroup">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="ButtonGroup">
              <C.ButtonGroup label="Actions">
                <C.Button label="Copy" variant="secondary" />
                <C.Button label="Paste" variant="secondary" />
                <C.Button label="Delete" variant="secondary" />
              </C.ButtonGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">horizontal</div>
            <Safe name="ButtonGroup">
              <C.ButtonGroup label="Actions" orientation="horizontal">
                <C.Button label="Copy" variant="secondary" />
                <C.Button label="Paste" variant="secondary" />
                <C.Button label="Delete" variant="secondary" />
              </C.ButtonGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">vertical</div>
            <Safe name="ButtonGroup">
              <C.ButtonGroup label="Actions" orientation="vertical">
                <C.Button label="Copy" variant="secondary" />
                <C.Button label="Paste" variant="secondary" />
                <C.Button label="Delete" variant="secondary" />
              </C.ButtonGroup>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> corners round --on button-group"}</code>
        </Cell>
        <Cell name="ContextMenu">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="ContextMenu">
              <C.ContextMenu items={[{"label":"Edit"},{"label":"Duplicate"},{"type":"divider"},{"label":"Delete"}]}>
                <C.Card padding={6}>
                  <C.Text color="secondary">
                    {"Right-click this area"}
                  </C.Text>
                </C.Card>
              </C.ContextMenu>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on context-menu"}</code>
        </Cell>
        <Cell name="ContextMenuItem">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="ContextMenuItem">
              <C.ContextMenuItem label="Edit" description="Modify this item" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasCloseOnSelect</div>
            <Safe name="ContextMenuItem">
              <C.ContextMenuItem label="Edit" description="Modify this item" hasCloseOnSelect />
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="DropdownMenu">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DropdownMenu">
              <C.DropdownMenu button={{"label":"Actions"}} presentation="popover" items={[{"label":"Edit project","icon":"wrench"},{"label":"Duplicate project","icon":"copy"},{"label":"Share project","icon":"externalLink"},{"label":"Archive project","icon":"stop"}]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">popover</div>
            <Safe name="DropdownMenu">
              <C.DropdownMenu button={{"label":"Actions"}} presentation="popover" items={[{"label":"Edit project","icon":"wrench"},{"label":"Duplicate project","icon":"copy"},{"label":"Share project","icon":"externalLink"},{"label":"Archive project","icon":"stop"}]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">bottom-sheet</div>
            <Safe name="DropdownMenu">
              <C.DropdownMenu button={{"label":"Actions"}} presentation="bottom-sheet" items={[{"label":"Edit project","icon":"wrench"},{"label":"Duplicate project","icon":"copy"},{"label":"Share project","icon":"externalLink"},{"label":"Archive project","icon":"stop"}]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">adaptive</div>
            <Safe name="DropdownMenu">
              <C.DropdownMenu button={{"label":"Actions"}} presentation="adaptive" items={[{"label":"Edit project","icon":"wrench"},{"label":"Duplicate project","icon":"copy"},{"label":"Share project","icon":"externalLink"},{"label":"Archive project","icon":"stop"}]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isMenuOpen</div>
            <Safe name="DropdownMenu">
              <C.DropdownMenu button={{"label":"Actions"}} presentation="popover" items={[{"label":"Edit project","icon":"wrench"},{"label":"Duplicate project","icon":"copy"},{"label":"Share project","icon":"externalLink"},{"label":"Archive project","icon":"stop"}]} isMenuOpen />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasChevron</div>
            <Safe name="DropdownMenu">
              <C.DropdownMenu button={{"label":"Actions"}} presentation="popover" items={[{"label":"Edit project","icon":"wrench"},{"label":"Duplicate project","icon":"copy"},{"label":"Share project","icon":"externalLink"},{"label":"Archive project","icon":"stop"}]} hasChevron />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on dropdown-menu"}</code>
        </Cell>
        <Cell name="DropdownMenuGroup">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DropdownMenuGroup">
              <C.DropdownMenuGroup title="Version history" />
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="DropdownMenuItem">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DropdownMenuItem">
              <C.DropdownMenuItem label="Edit" description="Modify this item" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">default</div>
            <Safe name="DropdownMenuItem">
              <C.DropdownMenuItem label="Edit" description="Modify this item" variant="default" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">destructive</div>
            <Safe name="DropdownMenuItem">
              <C.DropdownMenuItem label="Edit" description="Modify this item" variant="destructive" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasCloseOnSelect</div>
            <Safe name="DropdownMenuItem">
              <C.DropdownMenuItem label="Edit" description="Modify this item" hasCloseOnSelect />
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="DropdownMenuSubMenu">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DropdownMenuSubMenu">
              <C.DropdownMenuSubMenu label="Move to">
                <C.DropdownMenuItem label="Item 1" icon="check" />
                <C.DropdownMenuItem label="Item 2" />
                <C.DropdownMenuItem label="Item 3" />
              </C.DropdownMenuSubMenu>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasSpinner</div>
            <Safe name="DropdownMenuSubMenu">
              <C.DropdownMenuSubMenu label="Move to" hasSpinner>
                <C.DropdownMenuItem label="Item 1" icon="check" />
                <C.DropdownMenuItem label="Item 2" />
                <C.DropdownMenuItem label="Item 3" />
              </C.DropdownMenuSubMenu>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="Link">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Link">
              <C.Link href="#">
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">primary</div>
            <Safe name="Link">
              <C.Link href="#" color="primary">
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">secondary</div>
            <Safe name="Link">
              <C.Link href="#" color="secondary">
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Link">
              <C.Link href="#" color="disabled">
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">placeholder</div>
            <Safe name="Link">
              <C.Link href="#" color="placeholder">
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">accent</div>
            <Safe name="Link">
              <C.Link href="#" color="accent">
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">inherit</div>
            <Safe name="Link">
              <C.Link href="#" color="inherit">
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasUnderline</div>
            <Safe name="Link">
              <C.Link href="#" hasUnderline>
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isExternalLink</div>
            <Safe name="Link">
              <C.Link href="#" isExternalLink>
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isStandalone</div>
            <Safe name="Link">
              <C.Link href="#" isStandalone>
                {"Learn more"}
              </C.Link>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on link"}</code>
        </Cell>
        <Cell name="MoreMenu">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="MoreMenu">
              <C.MoreMenu items={[{"label":"Edit","value":"edit"},{"label":"Duplicate","value":"duplicate"},{"label":"Delete","value":"delete"}]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isMenuOpen</div>
            <Safe name="MoreMenu">
              <C.MoreMenu items={[{"label":"Edit","value":"edit"},{"label":"Duplicate","value":"duplicate"},{"label":"Delete","value":"delete"}]} isMenuOpen />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> corners round --on more-menu"}</code>
        </Cell>
        <Cell name="Toolbar">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Toolbar">
              <C.Toolbar label="Table actions" size="sm" dividers={["bottom"]} startContent={<C.TabList value="overview" onChange={() => {}}>
                  <C.Tab label="Overview" value="overview" />
                  <C.Tab label="Activity" value="activity" />
                </C.TabList>} endContent={[<C.Selector key="0" label="Status" isLabelHidden placeholder="Status" size="sm" options={["Open","In progress","Done"]} />, <C.Button key="1" label="New item" variant="primary" size="sm" />]} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how toolbar"}</code>
        </Cell>
        </div>
      </section>
      <section>
        <h2 className="tp-group">inputs</h2>
        <div className="tp-grid">
        <Cell name="TextInput">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} status={{"type":"error"}} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} status={{"type":"warning"}} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} status={{"type":"success"}} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} isDisabled onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} isLabelHidden onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} isOptional onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} isRequired onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isReadOnly</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} isReadOnly onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} isLoading onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasClear</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} hasClear onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasAutoCorrect</div>
            <Safe name="TextInput">
              <C.TextInput label="Name" value="Jordan" hasAutoFocus={false} hasAutoCorrect onChange={() => {}} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on text-input"}</code>
        </Cell>
        <Cell name="TextArea">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} status={{"type":"warning"}} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} status={{"type":"error"}} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} status={{"type":"success"}} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} isDisabled onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} isLabelHidden onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} isOptional onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} isRequired onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isReadOnly</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} isReadOnly onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} isLoading onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasSpellCheck</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} hasSpellCheck onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasAutoCorrect</div>
            <Safe name="TextArea">
              <C.TextArea label="Notes" value="Some notes" hasAutoFocus={false} hasAutoCorrect onChange={() => {}} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on text-area"}</code>
        </Cell>
        <Cell name="NumberInput">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} status={{"type":"error"}} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} status={{"type":"warning"}} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} status={{"type":"success"}} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} isDisabled onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} isLabelHidden onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} isOptional onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} isRequired onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isReadOnly</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} isReadOnly onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isWheelEnabled</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} isWheelEnabled onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasNumberSteppers</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} hasNumberSteppers onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isIntegerOnly</div>
            <Safe name="NumberInput">
              <C.NumberInput label="Count" value={3} hasAutoFocus={false} isIntegerOnly onChange={() => {}} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on number-input"}</code>
        </Cell>
        <Cell name="Calendar">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Calendar">
              <C.Calendar />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">single</div>
            <Safe name="Calendar">
              <C.Calendar mode="single" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">range</div>
            <Safe name="Calendar">
              <C.Calendar mode="range" value={{"start":"2026-01-12","end":"2026-01-16"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasOutsideDays</div>
            <Safe name="Calendar">
              <C.Calendar hasOutsideDays />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasWeekNumbers</div>
            <Safe name="Calendar">
              <C.Calendar hasWeekNumbers />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasVariableRowCount</div>
            <Safe name="Calendar">
              <C.Calendar hasVariableRowCount />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how calendar"}</code>
        </Cell>
        <Cell name="DateInput">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DateInput">
              <C.DateInput label="DateInput" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="DateInput">
              <C.DateInput label="DateInput" status={{"type":"warning"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="DateInput">
              <C.DateInput label="DateInput" status={{"type":"error"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="DateInput">
              <C.DateInput label="DateInput" status={{"type":"success"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="DateInput">
              <C.DateInput label="DateInput" isDisabled />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="DateInput">
              <C.DateInput label="DateInput" isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="DateInput">
              <C.DateInput label="DateInput" isOptional />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="DateInput">
              <C.DateInput label="DateInput" isRequired />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="DateInput">
              <C.DateInput label="DateInput" isLoading />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasClear</div>
            <Safe name="DateInput">
              <C.DateInput label="DateInput" hasClear />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on date-input"}</code>
        </Cell>
        <Cell name="DateRangeInput">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} status={{"type":"warning"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} status={{"type":"error"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} status={{"type":"success"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} isDisabled />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} isOptional />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} isRequired />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} isLoading />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasClear</div>
            <Safe name="DateRangeInput">
              <C.DateRangeInput label="DateRangeInput" value={{"start":"2026-01-12","end":"2026-01-16"}} hasClear />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on date-range-input"}</code>
        </Cell>
        <Cell name="DateTimeInput">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" status={{"type":"warning"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" status={{"type":"error"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" status={{"type":"success"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" isDisabled />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" isOptional />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" isRequired />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" isLoading />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasSeconds</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" hasSeconds />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasClear</div>
            <Safe name="DateTimeInput">
              <C.DateTimeInput label="DateTimeInput" hasClear />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how date-time-input"}</code>
        </Cell>
        <Cell name="Field">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Field">
              <C.Field label="Email address" inputID="email-input" description="Use Field for controls that do not already provide field under the hood." descriptionID="email-help" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isGroupLabel</div>
            <Safe name="Field">
              <C.Field label="Email address" inputID="email-input" description="Use Field for controls that do not already provide field under the hood." descriptionID="email-help" isGroupLabel />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="Field">
              <C.Field label="Email address" inputID="email-input" description="Use Field for controls that do not already provide field under the hood." descriptionID="email-help" isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="Field">
              <C.Field label="Email address" inputID="email-input" description="Use Field for controls that do not already provide field under the hood." descriptionID="email-help" isOptional />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="Field">
              <C.Field label="Email address" inputID="email-input" description="Use Field for controls that do not already provide field under the hood." descriptionID="email-help" isRequired />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how field"}</code>
        </Cell>
        <Cell name="FieldStatus">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="FieldStatus">
              <C.FieldStatus type="error" message="FieldStatus" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="FieldStatus">
              <C.FieldStatus type="error" message="FieldStatus" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="FieldStatus">
              <C.FieldStatus type="warning" message="FieldStatus" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="FieldStatus">
              <C.FieldStatus type="success" message="FieldStatus" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">attached</div>
            <Safe name="FieldStatus">
              <C.FieldStatus type="error" message="FieldStatus" variant="attached" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">detached</div>
            <Safe name="FieldStatus">
              <C.FieldStatus type="error" message="FieldStatus" variant="detached" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on field-status"}</code>
        </Cell>
        <Cell name="FileInput">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">input</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} mode="input" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">dropzone</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} mode="dropzone" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} status={{"type":"error"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} status={{"type":"warning"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} status={{"type":"success"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isMultiple</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} isMultiple />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} isOptional />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} isRequired />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="FileInput">
              <C.FileInput label="FileInput" value={null} isLoading />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on file-input"}</code>
        </Cell>
        <Cell name="InputGroup">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="InputGroup">
              <C.InputGroup label="InputGroup">
                {"InputGroup"}
              </C.InputGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="InputGroup">
              <C.InputGroup label="InputGroup" status={{"type":"warning"}}>
                {"InputGroup"}
              </C.InputGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="InputGroup">
              <C.InputGroup label="InputGroup" status={{"type":"error"}}>
                {"InputGroup"}
              </C.InputGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="InputGroup">
              <C.InputGroup label="InputGroup" status={{"type":"success"}}>
                {"InputGroup"}
              </C.InputGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="InputGroup">
              <C.InputGroup label="InputGroup" isLabelHidden>
                {"InputGroup"}
              </C.InputGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="InputGroup">
              <C.InputGroup label="InputGroup" isOptional>
                {"InputGroup"}
              </C.InputGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="InputGroup">
              <C.InputGroup label="InputGroup" isRequired>
                {"InputGroup"}
              </C.InputGroup>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how input-group"}</code>
        </Cell>
        <Cell name="PowerSearch">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="PowerSearch">
              <C.PowerSearch config={{"name":"IssueSearch","fields":[{"key":"status","label":"Status","defaultOperator":"is","operators":[{"key":"is","label":"is","value":{"type":"enum","values":[{"value":"open","label":"Open"},{"value":"closed","label":"Closed"}]}}]},{"key":"title","label":"Title","defaultOperator":"contains","operators":[{"key":"contains","label":"contains","value":{"type":"string"}}]}]}} filters={[{"field":"status","operator":"is","value":{"type":"enum","value":"open"}}]} hasAutoFocus={false} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="PowerSearch">
              <C.PowerSearch config={{"name":"IssueSearch","fields":[{"key":"status","label":"Status","defaultOperator":"is","operators":[{"key":"is","label":"is","value":{"type":"enum","values":[{"value":"open","label":"Open"},{"value":"closed","label":"Closed"}]}}]},{"key":"title","label":"Title","defaultOperator":"contains","operators":[{"key":"contains","label":"contains","value":{"type":"string"}}]}]}} filters={[{"field":"status","operator":"is","value":{"type":"enum","value":"open"}}]} hasAutoFocus={false} isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasClear</div>
            <Safe name="PowerSearch">
              <C.PowerSearch config={{"name":"IssueSearch","fields":[{"key":"status","label":"Status","defaultOperator":"is","operators":[{"key":"is","label":"is","value":{"type":"enum","values":[{"value":"open","label":"Open"},{"value":"closed","label":"Closed"}]}}]},{"key":"title","label":"Title","defaultOperator":"contains","operators":[{"key":"contains","label":"contains","value":{"type":"string"}}]}]}} filters={[{"field":"status","operator":"is","value":{"type":"enum","value":"open"}}]} hasAutoFocus={false} hasClear />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isReadOnly</div>
            <Safe name="PowerSearch">
              <C.PowerSearch config={{"name":"IssueSearch","fields":[{"key":"status","label":"Status","defaultOperator":"is","operators":[{"key":"is","label":"is","value":{"type":"enum","values":[{"value":"open","label":"Open"},{"value":"closed","label":"Closed"}]}}]},{"key":"title","label":"Title","defaultOperator":"contains","operators":[{"key":"contains","label":"contains","value":{"type":"string"}}]}]}} filters={[{"field":"status","operator":"is","value":{"type":"enum","value":"open"}}]} hasAutoFocus={false} isReadOnly />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how power-search"}</code>
        </Cell>
        <Cell name="TimeInput">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" status={{"type":"warning"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" status={{"type":"error"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" status={{"type":"success"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" isDisabled />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" isOptional />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" isRequired />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" isLoading />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasSeconds</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" hasSeconds />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasClear</div>
            <Safe name="TimeInput">
              <C.TimeInput label="TimeInput" hasClear />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on time-input"}</code>
        </Cell>
        </div>
      </section>
      <section>
        <h2 className="tp-group">selection</h2>
        <div className="tp-grid">
        <Cell name="Selector">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">input</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} variant="input" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">secondary</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} variant="secondary" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">ghost</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} variant="ghost" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} status={{"type":"error"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} status={{"type":"warning"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} status={{"type":"success"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} isDisabled />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasClear</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} hasClear />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasSearch</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} hasSearch />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isReadOnly</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} isReadOnly />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="Selector">
              <C.Selector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} isLabelHidden />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on selector"}</code>
        </Cell>
        <Cell name="CheckboxInput">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="CheckboxInput">
              <C.CheckboxInput label="Add to calendar" value onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">indeterminate</div>
            <Safe name="CheckboxInput">
              <C.CheckboxInput label="Add to calendar" value="indeterminate" onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">off</div>
            <Safe name="CheckboxInput">
              <C.CheckboxInput label="Off" value={false} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="CheckboxInput">
              <C.CheckboxInput label="Add to calendar" value isDisabled onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="CheckboxInput">
              <C.CheckboxInput label="Add to calendar" value isLabelHidden onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="CheckboxInput">
              <C.CheckboxInput label="Add to calendar" value isLoading onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isReadOnly</div>
            <Safe name="CheckboxInput">
              <C.CheckboxInput label="Add to calendar" value isReadOnly onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="CheckboxInput">
              <C.CheckboxInput label="Add to calendar" value isOptional onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="CheckboxInput">
              <C.CheckboxInput label="Add to calendar" value isRequired onChange={() => {}} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how checkbox-input"}</code>
        </Cell>
        <Cell name="Switch">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Switch">
              <C.Switch label="Notify my team" value onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">off</div>
            <Safe name="Switch">
              <C.Switch label="Off" value={false} onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Switch">
              <C.Switch label="Notify my team" value isDisabled onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="Switch">
              <C.Switch label="Notify my team" value isLoading onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="Switch">
              <C.Switch label="Notify my team" value isLabelHidden onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="Switch">
              <C.Switch label="Notify my team" value isOptional onChange={() => {}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="Switch">
              <C.Switch label="Notify my team" value isRequired onChange={() => {}} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on switch"}</code>
        </Cell>
        <Cell name="SegmentedControl">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="SegmentedControl">
              <C.SegmentedControl label="Range" value="option-1" onChange={() => {}}>
                <C.SegmentedControlItem value="option-1" label="Day" />
                <C.SegmentedControlItem value="option-2" label="Week" />
              </C.SegmentedControl>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="SegmentedControl">
              <C.SegmentedControl label="Range" value="option-1" isDisabled onChange={() => {}}>
                <C.SegmentedControlItem value="option-1" label="Day" />
                <C.SegmentedControlItem value="option-2" label="Week" />
              </C.SegmentedControl>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on segmented-control"}</code>
        </Cell>
        <Cell name="CheckboxList">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="CheckboxList">
              <C.CheckboxList label="CheckboxList" value={["option-1"]}>
                <C.CheckboxListItem label="Option 1" value="option-1" />
                <C.CheckboxListItem label="Option 2" value="option-2" />
                <C.CheckboxListItem label="Option 3" value="option-3" />
              </C.CheckboxList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="CheckboxList">
              <C.CheckboxList label="CheckboxList" value={["option-1"]} isLabelHidden>
                <C.CheckboxListItem label="Option 1" value="option-1" />
                <C.CheckboxListItem label="Option 2" value="option-2" />
                <C.CheckboxListItem label="Option 3" value="option-3" />
              </C.CheckboxList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="CheckboxList">
              <C.CheckboxList label="CheckboxList" value={["option-1"]} isOptional>
                <C.CheckboxListItem label="Option 1" value="option-1" />
                <C.CheckboxListItem label="Option 2" value="option-2" />
                <C.CheckboxListItem label="Option 3" value="option-3" />
              </C.CheckboxList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="CheckboxList">
              <C.CheckboxList label="CheckboxList" value={["option-1"]} isRequired>
                <C.CheckboxListItem label="Option 1" value="option-1" />
                <C.CheckboxListItem label="Option 2" value="option-2" />
                <C.CheckboxListItem label="Option 3" value="option-3" />
              </C.CheckboxList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasDividers</div>
            <Safe name="CheckboxList">
              <C.CheckboxList label="CheckboxList" value={["option-1"]} hasDividers>
                <C.CheckboxListItem label="Option 1" value="option-1" />
                <C.CheckboxListItem label="Option 2" value="option-2" />
                <C.CheckboxListItem label="Option 3" value="option-3" />
              </C.CheckboxList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isReadOnly</div>
            <Safe name="CheckboxList">
              <C.CheckboxList label="CheckboxList" value={["option-1"]} isReadOnly>
                <C.CheckboxListItem label="Option 1" value="option-1" />
                <C.CheckboxListItem label="Option 2" value="option-2" />
                <C.CheckboxListItem label="Option 3" value="option-3" />
              </C.CheckboxList>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how checkbox-list"}</code>
        </Cell>
        <Cell name="DropdownMenuRadioGroup">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DropdownMenuRadioGroup">
              <C.DropdownMenu button={{"label":"Sort"}} presentation="popover">
                <C.DropdownMenuRadioGroup value="newest" label="Sort by">
                  <C.DropdownMenuRadioItem value="newest" label="Newest" />
                  <C.DropdownMenuRadioItem value="oldest" label="Oldest" />
                </C.DropdownMenuRadioGroup>
              </C.DropdownMenu>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasCloseOnSelect</div>
            <Safe name="DropdownMenuRadioGroup">
              <C.DropdownMenu button={{"label":"Sort"}} presentation="popover">
                <C.DropdownMenuRadioGroup value="newest" label="Sort by" hasCloseOnSelect>
                  <C.DropdownMenuRadioItem value="newest" label="Newest" />
                  <C.DropdownMenuRadioItem value="oldest" label="Oldest" />
                </C.DropdownMenuRadioGroup>
              </C.DropdownMenu>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="MultiSelector">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">input</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} variant="input" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">secondary</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} variant="secondary" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">ghost</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} variant="ghost" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} status={{"type":"error"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} status={{"type":"warning"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} status={{"type":"success"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} isDisabled />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasSelectAll</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} hasSelectAll />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasSearch</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} hasSearch />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasCreate</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} hasCreate />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isReadOnly</div>
            <Safe name="MultiSelector">
              <C.MultiSelector label="Fruit" options={[{"value":"apple","label":"Apple"},{"value":"orange","label":"Orange"},{"value":"banana","label":"Banana"}]} value={[]} isReadOnly />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on multi-selector"}</code>
        </Cell>
        <Cell name="RadioList">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="RadioList">
              <C.RadioList label="RadioList" value="RadioList" onChange={() => {}}>
                <C.RadioListItem label="Option 1" value="RadioList" />
                <C.RadioListItem label="Option 2" value="option-2" />
                <C.RadioListItem label="Option 3" value="option-3" />
              </C.RadioList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">vertical</div>
            <Safe name="RadioList">
              <C.RadioList label="RadioList" value="RadioList" orientation="vertical" onChange={() => {}}>
                <C.RadioListItem label="Option 1" value="RadioList" />
                <C.RadioListItem label="Option 2" value="option-2" />
                <C.RadioListItem label="Option 3" value="option-3" />
              </C.RadioList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">horizontal</div>
            <Safe name="RadioList">
              <C.RadioList label="RadioList" value="RadioList" orientation="horizontal" onChange={() => {}}>
                <C.RadioListItem label="Option 1" value="RadioList" />
                <C.RadioListItem label="Option 2" value="option-2" />
                <C.RadioListItem label="Option 3" value="option-3" />
              </C.RadioList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="RadioList">
              <C.RadioList label="RadioList" value="RadioList" isDisabled onChange={() => {}}>
                <C.RadioListItem label="Option 1" value="RadioList" />
                <C.RadioListItem label="Option 2" value="option-2" />
                <C.RadioListItem label="Option 3" value="option-3" />
              </C.RadioList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="RadioList">
              <C.RadioList label="RadioList" value="RadioList" isLabelHidden onChange={() => {}}>
                <C.RadioListItem label="Option 1" value="RadioList" />
                <C.RadioListItem label="Option 2" value="option-2" />
                <C.RadioListItem label="Option 3" value="option-3" />
              </C.RadioList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="RadioList">
              <C.RadioList label="RadioList" value="RadioList" isRequired onChange={() => {}}>
                <C.RadioListItem label="Option 1" value="RadioList" />
                <C.RadioListItem label="Option 2" value="option-2" />
                <C.RadioListItem label="Option 3" value="option-3" />
              </C.RadioList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="RadioList">
              <C.RadioList label="RadioList" value="RadioList" isOptional onChange={() => {}}>
                <C.RadioListItem label="Option 1" value="RadioList" />
                <C.RadioListItem label="Option 2" value="option-2" />
                <C.RadioListItem label="Option 3" value="option-3" />
              </C.RadioList>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how radio-list"}</code>
        </Cell>
        <Cell name="RadioListItem">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="RadioListItem">
              <C.RadioList value="option-1" label="Radio list" onChange={() => {}}>
                <C.RadioListItem value="option-1" label="Option" />
              </C.RadioList>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="SegmentedControlItem">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="SegmentedControlItem">
              <C.SegmentedControl value="item-1" label="Segmented control" onChange={() => {}}>
                <C.SegmentedControlItem value="item-1" label="Item" />
              </C.SegmentedControl>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="SegmentedControlItem">
              <C.SegmentedControl value="item-1" label="Segmented control" onChange={() => {}}>
                <C.SegmentedControlItem value="item-1" label="Item" isLabelHidden />
              </C.SegmentedControl>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="SelectableCard">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4}>
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">default</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="default">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">transparent</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="transparent">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">muted</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="muted">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">blue</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="blue">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">cyan</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="cyan">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">gray</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="gray">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">green</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="green">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">orange</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="orange">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">pink</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="pink">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">purple</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="purple">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">red</div>
            <Safe name="SelectableCard">
              <C.SelectableCard label="Pro plan" isSelected padding={4} variant="red">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Pro plan"}
                  </C.Heading>
                  <C.Text type="body">
                    {"$29/month, unlimited projects and priority support."}
                  </C.Text>
                </C.VStack>
              </C.SelectableCard>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on selectable-card"}</code>
        </Cell>
        <Cell name="Slider">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Slider">
              <C.Slider label="Volume" value={50} width={300} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">horizontal</div>
            <Safe name="Slider">
              <C.Slider label="Volume" value={50} width={300} orientation="horizontal" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">vertical</div>
            <Safe name="Slider">
              <C.Slider label="Volume" value={50} width={300} orientation="vertical" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Slider">
              <C.Slider label="Volume" value={50} width={300} isDisabled />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="Slider">
              <C.Slider label="Volume" value={50} width={300} isOptional />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="Slider">
              <C.Slider label="Volume" value={50} width={300} isRequired />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="Slider">
              <C.Slider label="Volume" value={50} width={300} isLabelHidden />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how slider"}</code>
        </Cell>
        <Cell name="ToggleButton">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="ToggleButton">
              <C.ToggleButton value="option-1" label="Toggle Group" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isPressed</div>
            <Safe name="ToggleButton">
              <C.ToggleButton value="option-1" label="Toggle Group" isPressed />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="ToggleButton">
              <C.ToggleButton value="option-1" label="Toggle Group" isLoading />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isIconOnly</div>
            <Safe name="ToggleButton">
              <C.ToggleButton value="option-1" label="Toggle Group" isIconOnly icon={<C.Icon icon="check" size="sm" />} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on toggle-button"}</code>
        </Cell>
        <Cell name="Tokenizer">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} status={{"type":"warning"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} status={{"type":"error"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} status={{"type":"success"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} isDisabled />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasClear</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} hasClear />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} isRequired />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} isOptional />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasEntriesOnFocus</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} hasEntriesOnFocus />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasCreate</div>
            <Safe name="Tokenizer">
              <C.Tokenizer label="Tags" placeholder="Search..." value={[{"id":"1","label":"Design"},{"id":"2","label":"Engineering"}]} searchSource={SAMPLE_SOURCE} hasAutoFocus={false} hasCreate />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on tokenizer"}</code>
        </Cell>
        <Cell name="Typeahead">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Typeahead">
              <C.Typeahead label="Typeahead" searchSource={SAMPLE_SOURCE} value={null} hasAutoFocus={false} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="Typeahead">
              <C.Typeahead label="Typeahead" searchSource={SAMPLE_SOURCE} value={null} hasAutoFocus={false} status={{"type":"warning"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="Typeahead">
              <C.Typeahead label="Typeahead" searchSource={SAMPLE_SOURCE} value={null} hasAutoFocus={false} status={{"type":"error"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="Typeahead">
              <C.Typeahead label="Typeahead" searchSource={SAMPLE_SOURCE} value={null} hasAutoFocus={false} status={{"type":"success"}} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasEntriesOnFocus</div>
            <Safe name="Typeahead">
              <C.Typeahead label="Typeahead" searchSource={SAMPLE_SOURCE} value={null} hasAutoFocus={false} hasEntriesOnFocus />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasClear</div>
            <Safe name="Typeahead">
              <C.Typeahead label="Typeahead" searchSource={SAMPLE_SOURCE} value={null} hasAutoFocus={false} hasClear />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="Typeahead">
              <C.Typeahead label="Typeahead" searchSource={SAMPLE_SOURCE} value={null} hasAutoFocus={false} isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isRequired</div>
            <Safe name="Typeahead">
              <C.Typeahead label="Typeahead" searchSource={SAMPLE_SOURCE} value={null} hasAutoFocus={false} isRequired />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="Typeahead">
              <C.Typeahead label="Typeahead" searchSource={SAMPLE_SOURCE} value={null} hasAutoFocus={false} isOptional />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on typeahead"}</code>
        </Cell>
        </div>
      </section>
      <section>
        <h2 className="tp-group">navigation</h2>
        <div className="tp-grid">
        <Cell name="TabList">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="TabList">
              <C.TabList value="tab-1" onChange={() => {}}>
                <C.Tab value="tab-1" label="Overview" />
                <C.Tab value="tab-2" label="Activity" />
              </C.TabList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasDivider</div>
            <Safe name="TabList">
              <C.TabList value="tab-1" hasDivider onChange={() => {}}>
                <C.Tab value="tab-1" label="Overview" />
                <C.Tab value="tab-2" label="Activity" />
              </C.TabList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isFullBleed</div>
            <Safe name="TabList">
              <C.TabList value="tab-1" isFullBleed onChange={() => {}}>
                <C.Tab value="tab-1" label="Overview" />
                <C.Tab value="tab-2" label="Activity" />
              </C.TabList>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> border \"1px solid <color>\" --on tab-list"}</code>
        </Cell>
        <Cell name="TopNav">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="TopNav">
              <C.TopNav label="Navigation" heading={<C.TopNavHeading heading="My App" />}>
                <C.TopNavItem label="Home" href="#" isSelected />
                <C.TopNavItem label="Projects" href="#" />
              </C.TopNav>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how top-nav"}</code>
        </Cell>
        <Cell name="SideNav">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="SideNav">
              <C.SideNav>
                <C.SideNavItem label="Dashboard" isSelected />
                <C.SideNavItem label="Projects" />
                <C.SideNavItem label="Settings" />
              </C.SideNav>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how side-nav"}</code>
        </Cell>
        <Cell name="Breadcrumbs">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Breadcrumbs">
              <C.Breadcrumbs>
                <C.BreadcrumbItem href="#">
                  {"Page"}
                </C.BreadcrumbItem>
                <C.BreadcrumbItem href="#">
                  {"Page"}
                </C.BreadcrumbItem>
                <C.BreadcrumbItem href="#">
                  {"Page"}
                </C.BreadcrumbItem>
              </C.Breadcrumbs>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">default</div>
            <Safe name="Breadcrumbs">
              <C.Breadcrumbs variant="default">
                <C.BreadcrumbItem href="#">
                  {"Page"}
                </C.BreadcrumbItem>
                <C.BreadcrumbItem href="#">
                  {"Page"}
                </C.BreadcrumbItem>
                <C.BreadcrumbItem href="#">
                  {"Page"}
                </C.BreadcrumbItem>
              </C.Breadcrumbs>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">supporting</div>
            <Safe name="Breadcrumbs">
              <C.Breadcrumbs variant="supporting">
                <C.BreadcrumbItem href="#">
                  {"Page"}
                </C.BreadcrumbItem>
                <C.BreadcrumbItem href="#">
                  {"Page"}
                </C.BreadcrumbItem>
                <C.BreadcrumbItem href="#">
                  {"Page"}
                </C.BreadcrumbItem>
              </C.Breadcrumbs>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how breadcrumbs"}</code>
        </Cell>
        <Cell name="NavHeadingMenu">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="NavHeadingMenu">
              <C.NavHeadingMenu>
                <C.NavHeadingMenuItem label="Dashboard" href="#" />
                <C.NavHeadingMenuItem label="Analytics" href="#" />
                <C.NavHeadingMenuItem label="Settings" href="#" />
              </C.NavHeadingMenu>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how nav-heading-menu"}</code>
        </Cell>
        <Cell name="NavIcon">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="NavIcon">
              <C.NavIcon icon={<C.Icon icon="check" size="sm" />} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on nav-icon"}</code>
        </Cell>
        <Cell name="Outline">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Outline">
              <C.Outline items={[{"id":"overview","label":"Overview","level":2},{"id":"installation","label":"Installation","level":2},{"id":"configuration","label":"Configuration","level":3},{"id":"api-reference","label":"API reference","level":2}]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasScrollOnClick</div>
            <Safe name="Outline">
              <C.Outline items={[{"id":"overview","label":"Overview","level":2},{"id":"installation","label":"Installation","level":2},{"id":"configuration","label":"Configuration","level":3},{"id":"api-reference","label":"API reference","level":2}]} hasScrollOnClick />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how outline"}</code>
        </Cell>
        <Cell name="Pagination">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Pagination">
              <C.Pagination page={1} totalItems={100} pageSize={10} variant="pages" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">pages</div>
            <Safe name="Pagination">
              <C.Pagination page={1} totalItems={100} pageSize={10} variant="pages" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">count</div>
            <Safe name="Pagination">
              <C.Pagination page={1} totalItems={100} pageSize={10} variant="count" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">compact</div>
            <Safe name="Pagination">
              <C.Pagination page={1} totalItems={100} pageSize={10} variant="compact" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">dots</div>
            <Safe name="Pagination">
              <C.Pagination page={1} totalItems={100} pageSize={10} variant="dots" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">input</div>
            <Safe name="Pagination">
              <C.Pagination page={1} totalItems={100} pageSize={10} variant="input" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">none</div>
            <Safe name="Pagination">
              <C.Pagination page={1} totalItems={100} pageSize={10} variant="none" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasMore</div>
            <Safe name="Pagination">
              <C.Pagination page={1} totalItems={100} pageSize={10} variant="pages" hasMore />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasFirstLast</div>
            <Safe name="Pagination">
              <C.Pagination page={1} totalItems={100} pageSize={10} variant="pages" hasFirstLast />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how pagination"}</code>
        </Cell>
        <Cell name="SideNavCollapseButton">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="SideNavCollapseButton">
              <C.SideNavCollapseButton collapsible={{"isCollapsed":false}} />
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="SideNavHeading">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="SideNavHeading">
              <C.SideNavHeading heading="Acme Console" subheading="Production" />
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="SideNavSection">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="SideNavSection">
              <C.SideNavSection title="Workspace">
                <C.SideNavItem label="Dashboard" isSelected />
                <C.SideNavItem label="Projects" />
                <C.SideNavItem label="Settings" />
              </C.SideNavSection>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isHeaderHidden</div>
            <Safe name="SideNavSection">
              <C.SideNavSection title="Workspace" isHeaderHidden>
                <C.SideNavItem label="Dashboard" isSelected />
                <C.SideNavItem label="Projects" />
                <C.SideNavItem label="Settings" />
              </C.SideNavSection>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="Step">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Step">
              <C.Stepper activeStep={1} orientation="vertical">
                <C.Step step={1} label="Billing address" description="Used for invoices and tax" />
              </C.Stepper>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isOptional</div>
            <Safe name="Step">
              <C.Stepper activeStep={1} orientation="vertical">
                <C.Step step={1} label="Billing address" description="Used for invoices and tax" isOptional />
              </C.Stepper>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="Stepper">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Stepper">
              <C.Stepper activeStep={1}>
                <C.Step step={0} label="Cart" />
                <C.Step step={1} label="Shipping" />
                <C.Step step={2} label="Payment" />
              </C.Stepper>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">horizontal</div>
            <Safe name="Stepper">
              <C.Stepper activeStep={1} orientation="horizontal">
                <C.Step step={0} label="Cart" />
                <C.Step step={1} label="Shipping" />
                <C.Step step={2} label="Payment" />
              </C.Stepper>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">vertical</div>
            <Safe name="Stepper">
              <C.Stepper activeStep={1} orientation="vertical">
                <C.Step step={0} label="Cart" />
                <C.Step step={1} label="Shipping" />
                <C.Step step={2} label="Payment" />
              </C.Stepper>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">separated</div>
            <Safe name="Stepper">
              <C.Stepper activeStep={1} indicatorPosition="separated">
                <C.Step step={0} label="Cart" />
                <C.Step step={1} label="Shipping" />
                <C.Step step={2} label="Payment" />
              </C.Stepper>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">on-track</div>
            <Safe name="Stepper">
              <C.Stepper activeStep={1} indicatorPosition="on-track">
                <C.Step step={0} label="Cart" />
                <C.Step step={1} label="Shipping" />
                <C.Step step={2} label="Payment" />
              </C.Stepper>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how stepper"}</code>
        </Cell>
        <Cell name="Tab">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Tab">
              <C.TabList value="tab-1" onChange={() => {}}>
                <C.Tab value="tab-1" label="Tab" />
              </C.TabList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="Tab">
              <C.TabList value="tab-1" onChange={() => {}}>
                <C.Tab value="tab-1" label="Tab" isLabelHidden />
              </C.TabList>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="TabMenu">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="TabMenu">
              <C.TabList value="overview" onChange={() => {}}>
                <C.TabMenu label="More" options={[{"value":"settings","label":"Settings"},{"value":"integrations","label":"Integrations"},{"value":"billing","label":"Billing"}]} />
              </C.TabList>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="TopNavHeading">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="TopNavHeading">
              <C.TopNavHeading superheading="Acme Suite" heading="Acme Console" />
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="TopNavMenu">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="TopNavMenu">
              <C.TopNavMenu label="Products" items={[{"title":"Analytics","description":"Usage metrics and trends","href":"#"},{"title":"Automation","description":"Workflows and rules","href":"#"},{"title":"Billing","href":"#"}]} />
            </Safe>
          </div>
          </div>
        </Cell>
        </div>
      </section>
      <section>
        <h2 className="tp-group">feedback</h2>
        <div className="tp-grid">
        <Cell name="Badge">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Badge">
              <C.Badge label="Badge" variant="neutral" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">neutral</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="neutral" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">info</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="info" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="success" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="warning" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="error" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">blue</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="blue" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">cyan</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="cyan" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">green</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="green" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">orange</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="orange" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">pink</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="pink" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">purple</div>
            <Safe name="Badge">
              <C.Badge label="Badge" variant="purple" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on badge"}</code>
        </Cell>
        <Cell name="Banner">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Banner">
              <C.Banner title="System maintenance scheduled" description="The platform will be briefly unavailable on Sunday from 2–4 AM PST." status="info" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">card</div>
            <Safe name="Banner">
              <C.Banner title="System maintenance scheduled" description="The platform will be briefly unavailable on Sunday from 2–4 AM PST." status="info" container="card" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">section</div>
            <Safe name="Banner">
              <C.Banner title="System maintenance scheduled" description="The platform will be briefly unavailable on Sunday from 2–4 AM PST." status="info" container="section" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isDismissable</div>
            <Safe name="Banner">
              <C.Banner title="System maintenance scheduled" description="The platform will be briefly unavailable on Sunday from 2–4 AM PST." status="info" isDismissable />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on banner"}</code>
        </Cell>
        <Cell name="ProgressBar">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="ProgressBar">
              <C.ProgressBar label="Uploading files" value={60} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">accent</div>
            <Safe name="ProgressBar">
              <C.ProgressBar label="Uploading files" value={60} variant="accent" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="ProgressBar">
              <C.ProgressBar label="Uploading files" value={60} variant="success" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="ProgressBar">
              <C.ProgressBar label="Uploading files" value={60} variant="warning" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="ProgressBar">
              <C.ProgressBar label="Uploading files" value={60} variant="error" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">neutral</div>
            <Safe name="ProgressBar">
              <C.ProgressBar label="Uploading files" value={60} variant="neutral" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLabelHidden</div>
            <Safe name="ProgressBar">
              <C.ProgressBar label="Uploading files" value={60} isLabelHidden />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasValueLabel</div>
            <Safe name="ProgressBar">
              <C.ProgressBar label="Uploading files" value={60} hasValueLabel />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isIndeterminate</div>
            <Safe name="ProgressBar">
              <C.ProgressBar label="Uploading files" value={60} isIndeterminate />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how progress-bar"}</code>
        </Cell>
        <Cell name="StatusDot">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="StatusDot">
              <C.StatusDot label="Online" variant="success" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="StatusDot">
              <C.StatusDot label="Online" variant="success" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="StatusDot">
              <C.StatusDot label="Online" variant="warning" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="StatusDot">
              <C.StatusDot label="Online" variant="error" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">accent</div>
            <Safe name="StatusDot">
              <C.StatusDot label="Online" variant="accent" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">neutral</div>
            <Safe name="StatusDot">
              <C.StatusDot label="Online" variant="neutral" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isPulsing</div>
            <Safe name="StatusDot">
              <C.StatusDot label="Online" variant="success" isPulsing />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on status-dot"}</code>
        </Cell>
        <Cell name="Skeleton">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Skeleton">
              <C.Skeleton width={320} height={80} />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on skeleton"}</code>
        </Cell>
        <Cell name="Spinner">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Spinner">
              <C.Spinner />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">default</div>
            <Safe name="Spinner">
              <C.Spinner shade="default" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">onMedia</div>
            <Safe name="Spinner">
              <C.Spinner shade="onMedia" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">subtle</div>
            <Safe name="Spinner">
              <C.Spinner shade="subtle" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">inherit</div>
            <Safe name="Spinner">
              <C.Spinner shade="inherit" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how spinner"}</code>
        </Cell>
        </div>
      </section>
      <section>
        <h2 className="tp-group">data display</h2>
        <div className="tp-grid">
        <Cell name="Heading">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Heading">
              <C.Heading level={1}>
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">primary</div>
            <Safe name="Heading">
              <C.Heading level={1} color="primary">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">secondary</div>
            <Safe name="Heading">
              <C.Heading level={1} color="secondary">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Heading">
              <C.Heading level={1} color="disabled">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">placeholder</div>
            <Safe name="Heading">
              <C.Heading level={1} color="placeholder">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">accent</div>
            <Safe name="Heading">
              <C.Heading level={1} color="accent">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">inherit</div>
            <Safe name="Heading">
              <C.Heading level={1} color="inherit">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">display-1</div>
            <Safe name="Heading">
              <C.Heading level={1} type="display-1">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">display-2</div>
            <Safe name="Heading">
              <C.Heading level={1} type="display-2">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">display-3</div>
            <Safe name="Heading">
              <C.Heading level={1} type="display-3">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">normal</div>
            <Safe name="Heading">
              <C.Heading level={1} weight="normal">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">medium</div>
            <Safe name="Heading">
              <C.Heading level={1} weight="medium">
                {"Heading"}
              </C.Heading>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="Text">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Text">
              <C.Text type="body">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">primary</div>
            <Safe name="Text">
              <C.Text type="body" color="primary">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">secondary</div>
            <Safe name="Text">
              <C.Text type="body" color="secondary">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Text">
              <C.Text type="body" color="disabled">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">placeholder</div>
            <Safe name="Text">
              <C.Text type="body" color="placeholder">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">accent</div>
            <Safe name="Text">
              <C.Text type="body" color="accent">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">inherit</div>
            <Safe name="Text">
              <C.Text type="body" color="inherit">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">body</div>
            <Safe name="Text">
              <C.Text type="body">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">large</div>
            <Safe name="Text">
              <C.Text type="large">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">label</div>
            <Safe name="Text">
              <C.Text type="label">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">supporting</div>
            <Safe name="Text">
              <C.Text type="supporting">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">code</div>
            <Safe name="Text">
              <C.Text type="code">
                {"The quick brown fox jumps over the lazy dog."}
              </C.Text>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> --color-text-primary \"<color>\""}</code>
        </Cell>
        <Cell name="Table">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Table">
              <C.Table data={[{"name":"Alice Chen","role":"Engineer","status":"Active"},{"name":"Bob Smith","role":"Designer","status":"Active"},{"name":"Carol Wu","role":"PM","status":"Away"}]} columns={[{"key":"name","header":"Name"},{"key":"role","header":"Role"},{"key":"status","header":"Status"}]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isStriped</div>
            <Safe name="Table">
              <C.Table data={[{"name":"Alice Chen","role":"Engineer","status":"Active"},{"name":"Bob Smith","role":"Designer","status":"Active"},{"name":"Carol Wu","role":"PM","status":"Away"}]} columns={[{"key":"name","header":"Name"},{"key":"role","header":"Role"},{"key":"status","header":"Status"}]} isStriped />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasHover</div>
            <Safe name="Table">
              <C.Table data={[{"name":"Alice Chen","role":"Engineer","status":"Active"},{"name":"Bob Smith","role":"Designer","status":"Active"},{"name":"Carol Wu","role":"PM","status":"Away"}]} columns={[{"key":"name","header":"Name"},{"key":"role","header":"Role"},{"key":"status","header":"Status"}]} hasHover />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> color \"<color>\" --on table"}</code>
        </Cell>
        <Cell name="Avatar">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Avatar">
              <C.Avatar />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">circle</div>
            <Safe name="Avatar">
              <C.Avatar shape="circle" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">rounded</div>
            <Safe name="Avatar">
              <C.Avatar shape="rounded" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">square</div>
            <Safe name="Avatar">
              <C.Avatar shape="square" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on avatar"}</code>
        </Cell>
        <Cell name="AvatarGroup">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="AvatarGroup">
              <C.AvatarGroup>
                <C.Avatar name="User" />
                <C.Avatar name="User" />
                <C.Avatar name="User" />
              </C.AvatarGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">circle</div>
            <Safe name="AvatarGroup">
              <C.AvatarGroup shape="circle">
                <C.Avatar name="User" />
                <C.Avatar name="User" />
                <C.Avatar name="User" />
              </C.AvatarGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">rounded</div>
            <Safe name="AvatarGroup">
              <C.AvatarGroup shape="rounded">
                <C.Avatar name="User" />
                <C.Avatar name="User" />
                <C.Avatar name="User" />
              </C.AvatarGroup>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">square</div>
            <Safe name="AvatarGroup">
              <C.AvatarGroup shape="square">
                <C.Avatar name="User" />
                <C.Avatar name="User" />
                <C.Avatar name="User" />
              </C.AvatarGroup>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how avatar-group"}</code>
        </Cell>
        <Cell name="AvatarGroupOverflow">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="AvatarGroupOverflow">
              <C.AvatarGroupOverflow count={2}>
                {"+2"}
              </C.AvatarGroupOverflow>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="Blockquote">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Blockquote">
              <C.Blockquote cite="Steve Jobs">
                {"Design is not just what it looks like and feels like. Design is how it works."}
              </C.Blockquote>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> color \"<color>\" --on blockquote"}</code>
        </Cell>
        <Cell name="Citation">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Citation">
              <C.Citation source={{"title":"Astryx Design","url":"https://example.com"}} number={1} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">label</div>
            <Safe name="Citation">
              <C.Citation source={{"title":"Astryx Design","url":"https://example.com"}} number={1} variant="label" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">number</div>
            <Safe name="Citation">
              <C.Citation source={{"title":"Astryx Design","url":"https://example.com"}} number={1} variant="number" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on citation"}</code>
        </Cell>
        <Cell name="Code">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Code">
              <C.Code>
                {"const count = 0"}
              </C.Code>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">primary</div>
            <Safe name="Code">
              <C.Code color="primary">
                {"const count = 0"}
              </C.Code>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">secondary</div>
            <Safe name="Code">
              <C.Code color="secondary">
                {"const count = 0"}
              </C.Code>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">inherit</div>
            <Safe name="Code">
              <C.Code color="inherit">
                {"const count = 0"}
              </C.Code>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on code"}</code>
        </Cell>
        <Cell name="CodeBlock">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="CodeBlock">
              <C.CodeBlock code={"import {Button} from '@astryxdesign/core/Button';\n\nexport function App() {\n  return <Button label=\"Hello\" variant=\"primary\" />;\n}"} language="tsx" hasCopyButton />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">card</div>
            <Safe name="CodeBlock">
              <C.CodeBlock code={"import {Button} from '@astryxdesign/core/Button';\n\nexport function App() {\n  return <Button label=\"Hello\" variant=\"primary\" />;\n}"} language="tsx" hasCopyButton container="card" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">section</div>
            <Safe name="CodeBlock">
              <C.CodeBlock code={"import {Button} from '@astryxdesign/core/Button';\n\nexport function App() {\n  return <Button label=\"Hello\" variant=\"primary\" />;\n}"} language="tsx" hasCopyButton container="section" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasLanguageLabel</div>
            <Safe name="CodeBlock">
              <C.CodeBlock code={"import {Button} from '@astryxdesign/core/Button';\n\nexport function App() {\n  return <Button label=\"Hello\" variant=\"primary\" />;\n}"} language="tsx" hasCopyButton hasLanguageLabel />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasLineNumbers</div>
            <Safe name="CodeBlock">
              <C.CodeBlock code={"import {Button} from '@astryxdesign/core/Button';\n\nexport function App() {\n  return <Button label=\"Hello\" variant=\"primary\" />;\n}"} language="tsx" hasCopyButton hasLineNumbers />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isDiff</div>
            <Safe name="CodeBlock">
              <C.CodeBlock code={"import {Button} from '@astryxdesign/core/Button';\n\nexport function App() {\n  return <Button label=\"Hello\" variant=\"primary\" />;\n}"} language="tsx" hasCopyButton isDiff />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isWrapped</div>
            <Safe name="CodeBlock">
              <C.CodeBlock code={"import {Button} from '@astryxdesign/core/Button';\n\nexport function App() {\n  return <Button label=\"Hello\" variant=\"primary\" />;\n}"} language="tsx" hasCopyButton isWrapped />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isCollapsible</div>
            <Safe name="CodeBlock">
              <C.CodeBlock code={"import {Button} from '@astryxdesign/core/Button';\n\nexport function App() {\n  return <Button label=\"Hello\" variant=\"primary\" />;\n}"} language="tsx" hasCopyButton isCollapsible />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on code-block"}</code>
        </Cell>
        <Cell name="EmptyState">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="EmptyState">
              <C.EmptyState title="No results found" description="Try adjusting your search or filter criteria." actions={<C.Button label="Clear filters" variant="secondary" />} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isCompact</div>
            <Safe name="EmptyState">
              <C.EmptyState title="No results found" description="Try adjusting your search or filter criteria." actions={<C.Button label="Clear filters" variant="secondary" />} isCompact />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how empty-state"}</code>
        </Cell>
        <Cell name="Icon">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Icon">
              <C.Icon icon="search" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">primary</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="primary" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">secondary</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="secondary" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">tertiary</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="tertiary" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="disabled" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">accent</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="accent" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">info</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="info" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">success</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="success" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="error" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">warning</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="warning" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">inherit</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="inherit" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">blue</div>
            <Safe name="Icon">
              <C.Icon icon="search" color="blue" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> color \"<color>\" --on icon"}</code>
        </Cell>
        <Cell name="Item">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Item">
              <C.Item label="Item label" description="Supporting text" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">center</div>
            <Safe name="Item">
              <C.Item label="Item label" description="Supporting text" align="center" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">start</div>
            <Safe name="Item">
              <C.Item label="Item label" description="Supporting text" align="start" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">first-line</div>
            <Safe name="Item">
              <C.Item label="Item label" description="Supporting text" align="first-line" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Item">
              <C.Item label="Item label" description="Supporting text" isDisabled />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isHighlighted</div>
            <Safe name="Item">
              <C.Item label="Item label" description="Supporting text" isHighlighted />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isSelected</div>
            <Safe name="Item">
              <C.Item label="Item label" description="Supporting text" isSelected />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on item"}</code>
        </Cell>
        <Cell name="Kbd">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Kbd">
              <C.Kbd keys="mod+k" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how kbd"}</code>
        </Cell>
        <Cell name="List">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="List">
              <C.List>
                <C.ListItem label="List item 1" />
                <C.ListItem label="List item 2" />
                <C.ListItem label="List item 3" />
              </C.List>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">none</div>
            <Safe name="List">
              <C.List listStyle="none">
                <C.ListItem label="List item 1" />
                <C.ListItem label="List item 2" />
                <C.ListItem label="List item 3" />
              </C.List>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disc</div>
            <Safe name="List">
              <C.List listStyle="disc">
                <C.ListItem label="List item 1" />
                <C.ListItem label="List item 2" />
                <C.ListItem label="List item 3" />
              </C.List>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">decimal</div>
            <Safe name="List">
              <C.List listStyle="decimal">
                <C.ListItem label="List item 1" />
                <C.ListItem label="List item 2" />
                <C.ListItem label="List item 3" />
              </C.List>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">circle</div>
            <Safe name="List">
              <C.List listStyle="circle">
                <C.ListItem label="List item 1" />
                <C.ListItem label="List item 2" />
                <C.ListItem label="List item 3" />
              </C.List>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasDividers</div>
            <Safe name="List">
              <C.List hasDividers>
                <C.ListItem label="List item 1" />
                <C.ListItem label="List item 2" />
                <C.ListItem label="List item 3" />
              </C.List>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how list"}</code>
        </Cell>
        <Cell name="Markdown">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Markdown">
              <C.Markdown>
                {"## Getting Started\n\nInstall the package:\n\n```bash\nnpm install @astryxdesign/core\n```\n\nThen import and use any component:\n\n```tsx\nimport {Button} from '@astryxdesign/core/Button';\n```\n\n**Bold**, *italic*, and `inline code` all work."}
              </C.Markdown>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isStreaming</div>
            <Safe name="Markdown">
              <C.Markdown isStreaming>
                {"## Getting Started\n\nInstall the package:\n\n```bash\nnpm install @astryxdesign/core\n```\n\nThen import and use any component:\n\n```tsx\nimport {Button} from '@astryxdesign/core/Button';\n```\n\n**Bold**, *italic*, and `inline code` all work."}
              </C.Markdown>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> color \"<color>\" --on markdown"}</code>
        </Cell>
        <Cell name="MetadataList">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="MetadataList">
              <C.MetadataList>
                <C.MetadataListItem label="Key 1">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 2">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 3">
                  {"Value"}
                </C.MetadataListItem>
              </C.MetadataList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">multi</div>
            <Safe name="MetadataList">
              <C.MetadataList columns="multi">
                <C.MetadataListItem label="Key 1">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 2">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 3">
                  {"Value"}
                </C.MetadataListItem>
              </C.MetadataList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">single</div>
            <Safe name="MetadataList">
              <C.MetadataList columns="single">
                <C.MetadataListItem label="Key 1">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 2">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 3">
                  {"Value"}
                </C.MetadataListItem>
              </C.MetadataList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">vertical</div>
            <Safe name="MetadataList">
              <C.MetadataList orientation="vertical">
                <C.MetadataListItem label="Key 1">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 2">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 3">
                  {"Value"}
                </C.MetadataListItem>
              </C.MetadataList>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">horizontal</div>
            <Safe name="MetadataList">
              <C.MetadataList orientation="horizontal">
                <C.MetadataListItem label="Key 1">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 2">
                  {"Value"}
                </C.MetadataListItem>
                <C.MetadataListItem label="Key 3">
                  {"Value"}
                </C.MetadataListItem>
              </C.MetadataList>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how metadata-list"}</code>
        </Cell>
        <Cell name="MetadataListItem">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="MetadataListItem">
              <C.MetadataList>
                <C.MetadataListItem label="Status">
                  {"Active"}
                </C.MetadataListItem>
              </C.MetadataList>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="OverflowList">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="OverflowList">
              <C.OverflowList behavior="observeParent">
                <C.Button label="Overview" variant="secondary" />
                <C.Button label="Activity" variant="secondary" />
                <C.Button label="Settings" variant="secondary" />
                <C.Button label="Members" variant="secondary" />
                <C.Button label="Billing" variant="secondary" />
              </C.OverflowList>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how overflow-list"}</code>
        </Cell>
        <Cell name="Thumbnail">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Thumbnail">
              <C.Thumbnail />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isLoading</div>
            <Safe name="Thumbnail">
              <C.Thumbnail isLoading />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how thumbnail"}</code>
        </Cell>
        <Cell name="Timer">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Timer">
              <C.Timer />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> color \"<color>\" --on timer"}</code>
        </Cell>
        <Cell name="Timestamp">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">body</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" type="body" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">large</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" type="large" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">label</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" type="label" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">supporting</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" type="supporting" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">code</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" type="code" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">display-1</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" type="display-1" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">display-2</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" type="display-2" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">display-3</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" type="display-3" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">inherit</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" type="inherit" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">primary</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" color="primary" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">secondary</div>
            <Safe name="Timestamp">
              <C.Timestamp value="2026-02-19T17:00:00Z" color="secondary" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> color \"<color>\" --on timestamp"}</code>
        </Cell>
        <Cell name="Token">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Token">
              <C.Token label="Token" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">default</div>
            <Safe name="Token">
              <C.Token label="Token" color="default" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">red</div>
            <Safe name="Token">
              <C.Token label="Token" color="red" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">orange</div>
            <Safe name="Token">
              <C.Token label="Token" color="orange" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">yellow</div>
            <Safe name="Token">
              <C.Token label="Token" color="yellow" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">green</div>
            <Safe name="Token">
              <C.Token label="Token" color="green" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">teal</div>
            <Safe name="Token">
              <C.Token label="Token" color="teal" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">cyan</div>
            <Safe name="Token">
              <C.Token label="Token" color="cyan" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">blue</div>
            <Safe name="Token">
              <C.Token label="Token" color="blue" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">purple</div>
            <Safe name="Token">
              <C.Token label="Token" color="purple" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">pink</div>
            <Safe name="Token">
              <C.Token label="Token" color="pink" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">gray</div>
            <Safe name="Token">
              <C.Token label="Token" color="gray" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on token"}</code>
        </Cell>
        <Cell name="TreeList">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="TreeList">
              <C.TreeList items={[{"id":"1","label":"Documents","children":[{"id":"1a","label":"Report.pdf"},{"id":"1b","label":"Notes.md"}]},{"id":"2","label":"Images","children":[{"id":"2a","label":"Photo.jpg"}]},{"id":"3","label":"README.md"}]} />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">lineGuides</div>
            <Safe name="TreeList">
              <C.TreeList items={[{"id":"1","label":"Documents","children":[{"id":"1a","label":"Report.pdf"},{"id":"1b","label":"Notes.md"}]},{"id":"2","label":"Images","children":[{"id":"2a","label":"Photo.jpg"}]},{"id":"3","label":"README.md"}]} variant="lineGuides" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">noGuides</div>
            <Safe name="TreeList">
              <C.TreeList items={[{"id":"1","label":"Documents","children":[{"id":"1a","label":"Report.pdf"},{"id":"1b","label":"Notes.md"}]},{"id":"2","label":"Images","children":[{"id":"2a","label":"Photo.jpg"}]},{"id":"3","label":"README.md"}]} variant="noGuides" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how tree-list"}</code>
        </Cell>
        </div>
      </section>
      <section>
        <h2 className="tp-group">containers</h2>
        <div className="tp-grid">
        <Cell name="Card">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Card">
              <C.Card>
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">default</div>
            <Safe name="Card">
              <C.Card variant="default">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">transparent</div>
            <Safe name="Card">
              <C.Card variant="transparent">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">muted</div>
            <Safe name="Card">
              <C.Card variant="muted">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">blue</div>
            <Safe name="Card">
              <C.Card variant="blue">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">cyan</div>
            <Safe name="Card">
              <C.Card variant="cyan">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">gray</div>
            <Safe name="Card">
              <C.Card variant="gray">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">green</div>
            <Safe name="Card">
              <C.Card variant="green">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">orange</div>
            <Safe name="Card">
              <C.Card variant="orange">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">pink</div>
            <Safe name="Card">
              <C.Card variant="pink">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">purple</div>
            <Safe name="Card">
              <C.Card variant="purple">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">red</div>
            <Safe name="Card">
              <C.Card variant="red">
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Card Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Card content goes here. This is a standard card with a heading and body text."}
                  </C.Text>
                </C.VStack>
              </C.Card>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on card"}</code>
        </Cell>
        <Cell name="AppShell">
          <div className="tp-row">
          <div className="tp-item tp-fill">
            <Safe name="AppShell">
              <C.AppShell variant="surface" contentPadding={4} topNav={<C.TopNav label="Navigation" heading={<C.TopNavHeading heading="My App" />} />} sideNav={<C.SideNav>
                  <C.SideNavItem label="Dashboard" isSelected />
                  <C.SideNavItem label="Settings" />
                  <C.SideNavItem label="Help" />
                </C.SideNav>}>
                <C.VStack gap={3}>
                  <C.Heading level={2}>
                    {"Dashboard"}
                  </C.Heading>
                  <C.Text type="body" color="secondary">
                    {"Welcome back. Here is an overview of your workspace."}
                  </C.Text>
                </C.VStack>
              </C.AppShell>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">wash</div>
            <Safe name="AppShell">
              <C.AppShell variant="wash" contentPadding={4} topNav={<C.TopNav label="Navigation" heading={<C.TopNavHeading heading="My App" />} />} sideNav={<C.SideNav>
                  <C.SideNavItem label="Dashboard" isSelected />
                  <C.SideNavItem label="Settings" />
                  <C.SideNavItem label="Help" />
                </C.SideNav>}>
                <C.VStack gap={3}>
                  <C.Heading level={2}>
                    {"Dashboard"}
                  </C.Heading>
                  <C.Text type="body" color="secondary">
                    {"Welcome back. Here is an overview of your workspace."}
                  </C.Text>
                </C.VStack>
              </C.AppShell>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">surface</div>
            <Safe name="AppShell">
              <C.AppShell variant="surface" contentPadding={4} topNav={<C.TopNav label="Navigation" heading={<C.TopNavHeading heading="My App" />} />} sideNav={<C.SideNav>
                  <C.SideNavItem label="Dashboard" isSelected />
                  <C.SideNavItem label="Settings" />
                  <C.SideNavItem label="Help" />
                </C.SideNav>}>
                <C.VStack gap={3}>
                  <C.Heading level={2}>
                    {"Dashboard"}
                  </C.Heading>
                  <C.Text type="body" color="secondary">
                    {"Welcome back. Here is an overview of your workspace."}
                  </C.Text>
                </C.VStack>
              </C.AppShell>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">section</div>
            <Safe name="AppShell">
              <C.AppShell variant="section" contentPadding={4} topNav={<C.TopNav label="Navigation" heading={<C.TopNavHeading heading="My App" />} />} sideNav={<C.SideNav>
                  <C.SideNavItem label="Dashboard" isSelected />
                  <C.SideNavItem label="Settings" />
                  <C.SideNavItem label="Help" />
                </C.SideNav>}>
                <C.VStack gap={3}>
                  <C.Heading level={2}>
                    {"Dashboard"}
                  </C.Heading>
                  <C.Text type="body" color="secondary">
                    {"Welcome back. Here is an overview of your workspace."}
                  </C.Text>
                </C.VStack>
              </C.AppShell>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">elevated</div>
            <Safe name="AppShell">
              <C.AppShell variant="elevated" contentPadding={4} topNav={<C.TopNav label="Navigation" heading={<C.TopNavHeading heading="My App" />} />} sideNav={<C.SideNav>
                  <C.SideNavItem label="Dashboard" isSelected />
                  <C.SideNavItem label="Settings" />
                  <C.SideNavItem label="Help" />
                </C.SideNav>}>
                <C.VStack gap={3}>
                  <C.Heading level={2}>
                    {"Dashboard"}
                  </C.Heading>
                  <C.Text type="body" color="secondary">
                    {"Welcome back. Here is an overview of your workspace."}
                  </C.Text>
                </C.VStack>
              </C.AppShell>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on app-shell"}</code>
        </Cell>
        <Cell name="Carousel">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Carousel">
              <C.Carousel>
                <C.Card padding={4}>
                  {"Slide 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Slide 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Slide 3"}
                </C.Card>
              </C.Carousel>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasButtons</div>
            <Safe name="Carousel">
              <C.Carousel hasButtons>
                <C.Card padding={4}>
                  {"Slide 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Slide 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Slide 3"}
                </C.Card>
              </C.Carousel>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasEdgeFade</div>
            <Safe name="Carousel">
              <C.Carousel hasEdgeFade>
                <C.Card padding={4}>
                  {"Slide 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Slide 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Slide 3"}
                </C.Card>
              </C.Carousel>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">hasLoop</div>
            <Safe name="Carousel">
              <C.Carousel hasLoop>
                <C.Card padding={4}>
                  {"Slide 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Slide 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Slide 3"}
                </C.Card>
              </C.Carousel>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> border \"1px solid <color>\" --on carousel"}</code>
        </Cell>
        <Cell name="Center">
          <div className="tp-row">
          <div className="tp-item tp-fill">
            <Safe name="Center">
              <C.Center width={240} height={120}>
                <C.Text type="body">
                  {"Centered content"}
                </C.Text>
              </C.Center>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">both</div>
            <Safe name="Center">
              <C.Center width={240} height={120} axis="both">
                <C.Text type="body">
                  {"Centered content"}
                </C.Text>
              </C.Center>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">horizontal</div>
            <Safe name="Center">
              <C.Center width={240} height={120} axis="horizontal">
                <C.Text type="body">
                  {"Centered content"}
                </C.Text>
              </C.Center>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">vertical</div>
            <Safe name="Center">
              <C.Center width={240} height={120} axis="vertical">
                <C.Text type="body">
                  {"Centered content"}
                </C.Text>
              </C.Center>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">isInline</div>
            <Safe name="Center">
              <C.Center width={240} height={120} isInline>
                <C.Text type="body">
                  {"Centered content"}
                </C.Text>
              </C.Center>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how center"}</code>
        </Cell>
        <Cell name="ClickableCard">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4}>
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">default</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="default">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">transparent</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="transparent">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">muted</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="muted">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">blue</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="blue">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">cyan</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="cyan">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">gray</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="gray">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">green</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="green">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">orange</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="orange">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">pink</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="pink">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">purple</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="purple">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">red</div>
            <Safe name="ClickableCard">
              <C.ClickableCard label="View product details" href="#" padding={4} variant="red">
                <C.VStack gap={1}>
                  <C.Heading level={3}>
                    {"Wireless Headphones"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Noise-cancelling over-ear headphones with 30-hour battery life."}
                  </C.Text>
                </C.VStack>
              </C.ClickableCard>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on clickable-card"}</code>
        </Cell>
        <Cell name="Collapsible">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Collapsible">
              <C.Collapsible trigger="Click to expand">
                <C.Text type="body">
                  {"This content is revealed when the collapsible is expanded. It can contain any components."}
                </C.Text>
              </C.Collapsible>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="Collapsible">
              <C.Collapsible trigger="Click to expand" isDisabled>
                <C.Text type="body">
                  {"This content is revealed when the collapsible is expanded. It can contain any components."}
                </C.Text>
              </C.Collapsible>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how collapsible"}</code>
        </Cell>
        <Cell name="Divider">
          <div className="tp-row">
          <div className="tp-item tp-fill">
            <Safe name="Divider">
              <C.Divider />
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">horizontal</div>
            <Safe name="Divider">
              <C.Divider orientation="horizontal" />
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">vertical</div>
            <Safe name="Divider">
              <C.Divider orientation="vertical" />
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">subtle</div>
            <Safe name="Divider">
              <C.Divider variant="subtle" />
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">strong</div>
            <Safe name="Divider">
              <C.Divider variant="strong" />
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">isFullBleed</div>
            <Safe name="Divider">
              <C.Divider isFullBleed />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> --color-border \"<color>\" --on divider"}</code>
        </Cell>
        <Cell name="FormLayout">
          <div className="tp-row">
          <div className="tp-item tp-fill">
            <Safe name="FormLayout">
              <C.FormLayout>
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.FormLayout>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">vertical</div>
            <Safe name="FormLayout">
              <C.FormLayout direction="vertical">
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.FormLayout>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">horizontal</div>
            <Safe name="FormLayout">
              <C.FormLayout direction="horizontal">
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.FormLayout>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">horizontal-labels</div>
            <Safe name="FormLayout">
              <C.FormLayout direction="horizontal-labels">
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.FormLayout>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how form-layout"}</code>
        </Cell>
        <Cell name="Grid">
          <div className="tp-row">
          <div className="tp-item tp-fill">
            <Safe name="Grid">
              <C.Grid columns={3} gap={2}>
                <C.Card padding={4}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 3"}
                </C.Card>
              </C.Grid>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">start</div>
            <Safe name="Grid">
              <C.Grid columns={3} gap={2} align="start">
                <C.Card padding={4}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 3"}
                </C.Card>
              </C.Grid>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">center</div>
            <Safe name="Grid">
              <C.Grid columns={3} gap={2} align="center">
                <C.Card padding={4}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 3"}
                </C.Card>
              </C.Grid>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">end</div>
            <Safe name="Grid">
              <C.Grid columns={3} gap={2} align="end">
                <C.Card padding={4}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 3"}
                </C.Card>
              </C.Grid>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">stretch</div>
            <Safe name="Grid">
              <C.Grid columns={3} gap={2} align="stretch">
                <C.Card padding={4}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 3"}
                </C.Card>
              </C.Grid>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">fill</div>
            <Safe name="Grid">
              <C.Grid columns="fill" gap={2}>
                <C.Card padding={4}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 3"}
                </C.Card>
              </C.Grid>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">fit</div>
            <Safe name="Grid">
              <C.Grid columns="fit" gap={2}>
                <C.Card padding={4}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={4}>
                  {"Item 3"}
                </C.Card>
              </C.Grid>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how grid"}</code>
        </Cell>
        <Cell name="GridSpan">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="GridSpan">
              <C.Grid columns={3} gap={2}>
                <C.GridSpan columns={2}>
                  {"Spans 2 columns"}
                </C.GridSpan>
              </C.Grid>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="Layout">
          <div className="tp-row">
          <div className="tp-item tp-fill">
            <Safe name="Layout">
              <C.Layout header={<C.LayoutHeader>
                  <C.Heading level={3}>
                    {"Page Title"}
                  </C.Heading>
                </C.LayoutHeader>} content={<C.LayoutContent>
                  <C.Text type="body" color="secondary">
                    {"Main content area. This is the scrollable center section of the layout."}
                  </C.Text>
                </C.LayoutContent>} footer={<C.LayoutFooter>
                  <C.Text type="supporting" color="secondary">
                    {"Footer: status bar or actions"}
                  </C.Text>
                </C.LayoutFooter>}>
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.Layout>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">fill</div>
            <Safe name="Layout">
              <C.Layout header={<C.LayoutHeader>
                  <C.Heading level={3}>
                    {"Page Title"}
                  </C.Heading>
                </C.LayoutHeader>} content={<C.LayoutContent>
                  <C.Text type="body" color="secondary">
                    {"Main content area. This is the scrollable center section of the layout."}
                  </C.Text>
                </C.LayoutContent>} footer={<C.LayoutFooter>
                  <C.Text type="supporting" color="secondary">
                    {"Footer: status bar or actions"}
                  </C.Text>
                </C.LayoutFooter>} height="fill">
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.Layout>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">auto</div>
            <Safe name="Layout">
              <C.Layout header={<C.LayoutHeader>
                  <C.Heading level={3}>
                    {"Page Title"}
                  </C.Heading>
                </C.LayoutHeader>} content={<C.LayoutContent>
                  <C.Text type="body" color="secondary">
                    {"Main content area. This is the scrollable center section of the layout."}
                  </C.Text>
                </C.LayoutContent>} footer={<C.LayoutFooter>
                  <C.Text type="supporting" color="secondary">
                    {"Footer: status bar or actions"}
                  </C.Text>
                </C.LayoutFooter>} height="auto">
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.Layout>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how layout"}</code>
        </Cell>
        <Cell name="LayoutFooter">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="LayoutFooter">
              <C.Layout content={<C.LayoutContent>
                  {"Main content area"}
                </C.LayoutContent>}>
                <C.LayoutFooter hasDivider>
                  {"Footer content: status bar or actions"}
                </C.LayoutFooter>
              </C.Layout>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="LayoutHeader">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="LayoutHeader">
              <C.Layout>
                <C.LayoutHeader hasDivider>
                  {"Page Title"}
                </C.LayoutHeader>
              </C.Layout>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="LayoutPanel">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="LayoutPanel">
              <C.Layout content={<C.LayoutContent>
                  {"Main content area"}
                </C.LayoutContent>}>
                <C.LayoutPanel hasDivider width={200}>
                  {"Panel Content"}
                </C.LayoutPanel>
              </C.Layout>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isScrollable</div>
            <Safe name="LayoutPanel">
              <C.Layout content={<C.LayoutContent>
                  {"Main content area"}
                </C.LayoutContent>}>
                <C.LayoutPanel hasDivider width={200} isScrollable>
                  {"Panel Content"}
                </C.LayoutPanel>
              </C.Layout>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="ScrollableArea">
          <div className="tp-row">
          <div className="tp-item tp-fill">
            <Safe name="ScrollableArea">
              <C.ScrollableArea axis="block" label="Scrollable example">
                {"Add enough content to exceed a constrained viewport."}
              </C.ScrollableArea>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">inline</div>
            <Safe name="ScrollableArea">
              <C.ScrollableArea axis="inline" label="Scrollable example">
                {"Add enough content to exceed a constrained viewport."}
              </C.ScrollableArea>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">block</div>
            <Safe name="ScrollableArea">
              <C.ScrollableArea axis="block" label="Scrollable example">
                {"Add enough content to exceed a constrained viewport."}
              </C.ScrollableArea>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">both</div>
            <Safe name="ScrollableArea">
              <C.ScrollableArea axis="both" label="Scrollable example">
                {"Add enough content to exceed a constrained viewport."}
              </C.ScrollableArea>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">isFullBleed</div>
            <Safe name="ScrollableArea">
              <C.ScrollableArea axis="block" label="Scrollable example" isFullBleed>
                {"Add enough content to exceed a constrained viewport."}
              </C.ScrollableArea>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> border \"1px solid <color>\" --on scrollable-area"}</code>
        </Cell>
        <Cell name="Section">
          <div className="tp-row">
          <div className="tp-item tp-fill">
            <Safe name="Section">
              <C.Section>
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.Section>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">section</div>
            <Safe name="Section">
              <C.Section variant="section">
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.Section>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">transparent</div>
            <Safe name="Section">
              <C.Section variant="transparent">
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.Section>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">muted</div>
            <Safe name="Section">
              <C.Section variant="muted">
                <C.Text>
                  {"Sample content"}
                </C.Text>
              </C.Section>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on section"}</code>
        </Cell>
        <Cell name="Stack">
          <div className="tp-row">
          <div className="tp-item tp-fill">
            <Safe name="Stack">
              <C.Stack direction="horizontal" gap={2}>
                <C.Card padding={3}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 3"}
                </C.Card>
              </C.Stack>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">horizontal</div>
            <Safe name="Stack">
              <C.Stack direction="horizontal" gap={2}>
                <C.Card padding={3}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 3"}
                </C.Card>
              </C.Stack>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">vertical</div>
            <Safe name="Stack">
              <C.Stack direction="vertical" gap={2}>
                <C.Card padding={3}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 3"}
                </C.Card>
              </C.Stack>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">nowrap</div>
            <Safe name="Stack">
              <C.Stack direction="horizontal" gap={2} wrap="nowrap">
                <C.Card padding={3}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 3"}
                </C.Card>
              </C.Stack>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">wrap</div>
            <Safe name="Stack">
              <C.Stack direction="horizontal" gap={2} wrap="wrap">
                <C.Card padding={3}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 3"}
                </C.Card>
              </C.Stack>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">wrap-reverse</div>
            <Safe name="Stack">
              <C.Stack direction="horizontal" gap={2} wrap="wrap-reverse">
                <C.Card padding={3}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 3"}
                </C.Card>
              </C.Stack>
            </Safe>
          </div>
          <div className="tp-item tp-fill">
            <div className="tp-label">isScrollable</div>
            <Safe name="Stack">
              <C.Stack direction="horizontal" gap={2} isScrollable>
                <C.Card padding={3}>
                  {"Item 1"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 2"}
                </C.Card>
                <C.Card padding={3}>
                  {"Item 3"}
                </C.Card>
              </C.Stack>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how stack"}</code>
        </Cell>
        </div>
      </section>
      <section>
        <h2 className="tp-group">overlays (shown open)</h2>
        <div className="tp-grid">
        <Cell name="AlertDialog">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="AlertDialog">
              <C.AlertDialog isOpen isInline title="Delete item?" description="This action cannot be undone. The item and all its data will be permanently removed." actionLabel="Delete" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on alert-dialog"}</code>
        </Cell>
        <Cell name="CommandPalette">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="CommandPalette">
              <C.CommandPalette isOpen isInline searchSource={SAMPLE_SOURCE} label="CommandPalette example" />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> color \"<color>\" --on command-palette-empty"}</code>
        </Cell>
        <Cell name="CommandPaletteEmpty">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="CommandPaletteEmpty">
              <C.CommandPalette isOpen isInline searchSource={SAMPLE_SOURCE}>
                <C.CommandPaletteEmpty>
                  {"No results found. Try a different search."}
                </C.CommandPaletteEmpty>
              </C.CommandPalette>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="CommandPaletteGroup">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="CommandPaletteGroup">
              <C.CommandPalette isOpen isInline searchSource={SAMPLE_SOURCE}>
                <C.CommandPaletteGroup heading="Navigation">
                  <C.CommandPaletteItem value="home">
                    {"Go Home"}
                  </C.CommandPaletteItem>
                  <C.CommandPaletteItem value="settings">
                    {"Open Settings"}
                  </C.CommandPaletteItem>
                  <C.CommandPaletteItem value="profile">
                    {"View Profile"}
                  </C.CommandPaletteItem>
                </C.CommandPaletteGroup>
              </C.CommandPalette>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="CommandPaletteInput">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="CommandPaletteInput">
              <C.CommandPalette isOpen isInline searchSource={SAMPLE_SOURCE}>
                <C.CommandPaletteInput placeholder="Search commands, files, or actions..." hasAutoFocus={false} />
              </C.CommandPalette>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="CommandPaletteItem">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="CommandPaletteItem">
              <C.CommandPalette isOpen isInline searchSource={SAMPLE_SOURCE}>
                <C.CommandPaletteItem value="go-home">
                  {"Go to Dashboard"}
                </C.CommandPaletteItem>
              </C.CommandPalette>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">disabled</div>
            <Safe name="CommandPaletteItem">
              <C.CommandPalette isOpen isInline searchSource={SAMPLE_SOURCE}>
                <C.CommandPaletteItem value="go-home" isDisabled>
                  {"Go to Dashboard"}
                </C.CommandPaletteItem>
              </C.CommandPalette>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isHighlighted</div>
            <Safe name="CommandPaletteItem">
              <C.CommandPalette isOpen isInline searchSource={SAMPLE_SOURCE}>
                <C.CommandPaletteItem value="go-home" isHighlighted>
                  {"Go to Dashboard"}
                </C.CommandPaletteItem>
              </C.CommandPalette>
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isSelected</div>
            <Safe name="CommandPaletteItem">
              <C.CommandPalette isOpen isInline searchSource={SAMPLE_SOURCE}>
                <C.CommandPaletteItem value="go-home" isSelected>
                  {"Go to Dashboard"}
                </C.CommandPaletteItem>
              </C.CommandPalette>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="CommandPaletteList">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="CommandPaletteList">
              <C.CommandPalette isOpen isInline searchSource={SAMPLE_SOURCE}>
                <C.CommandPaletteList>
                  <C.CommandPaletteItem value="home">
                    {"Go Home"}
                  </C.CommandPaletteItem>
                  <C.CommandPaletteItem value="settings">
                    {"Open Settings"}
                  </C.CommandPaletteItem>
                  <C.CommandPaletteItem value="profile">
                    {"View Profile"}
                  </C.CommandPaletteItem>
                </C.CommandPaletteList>
              </C.CommandPalette>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="Dialog">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Dialog">
              <C.Dialog isOpen isInline width={400}>
                <C.VStack gap={2}>
                  <C.Heading level={3}>
                    {"Dialog Title"}
                  </C.Heading>
                  <C.Text type="body">
                    {"Are you sure you want to proceed? This action can be undone later from settings."}
                  </C.Text>
                </C.VStack>
              </C.Dialog>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on dialog"}</code>
        </Cell>
        <Cell name="DialogHeader">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DialogHeader">
              <C.Dialog isOpen isInline width={400}>
                <C.DialogHeader title="Delete file?" subtitle="This action cannot be undone." hasDivider />
              </C.Dialog>
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="DrawerHeader">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="DrawerHeader">
              <C.DrawerHeader title="Host details" subtitle="web-prod-04" hasDivider />
            </Safe>
          </div>
          </div>
        </Cell>
        <Cell name="HoverCard">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="HoverCard">
              <C.HoverCard content={<C.Text type="body">
                  {"Additional details shown on hover."}
                </C.Text>} isOpen label="HoverCard example">
                <C.Link href="#">
                  {"Hover for details"}
                </C.Link>
              </C.HoverCard>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on hover-card"}</code>
        </Cell>
        <Cell name="Overlay">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Overlay">
              <C.Overlay content={<C.Button label="Quick view" variant="secondary" size="sm" />} isOpen>
                <C.AspectRatio ratio={1.7777777777777777} style={{"width":320,"borderRadius":12,"overflow":"clip"}} />
              </C.Overlay>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor how overlay"}</code>
        </Cell>
        <Cell name="Popover">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Popover">
              <C.Popover content={<C.Text type="body">
                  {"Popover content goes here."}
                </C.Text>} hasAutoFocus={false} isOpen label="Popover example">
                <C.Button label="Open popover" variant="secondary" />
              </C.Popover>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on popover"}</code>
        </Cell>
        <Cell name="Toast">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Toast">
              <C.Toast body="Changes saved" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">info</div>
            <Safe name="Toast">
              <C.Toast body="Changes saved" type="info" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">error</div>
            <Safe name="Toast">
              <C.Toast body="Changes saved" type="error" />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isAutoHide</div>
            <Safe name="Toast">
              <C.Toast body="Changes saved" isAutoHide />
            </Safe>
          </div>
          <div className="tp-item">
            <div className="tp-label">isExiting</div>
            <Safe name="Toast">
              <C.Toast body="Changes saved" isExiting />
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on toast"}</code>
        </Cell>
        <Cell name="Tooltip">
          <div className="tp-row">
          <div className="tp-item">
            <Safe name="Tooltip">
              <C.Tooltip content="Helpful tooltip text" isOpen>
                <C.Button label="Hover me" variant="secondary" />
              </C.Tooltip>
            </Safe>
          </div>
          </div>
          <code className="tp-cmd">{"astryx experimental theme editor set <theme> background \"<color>\" --on tooltip"}</code>
        </Cell>
        </div>
      </section>
    </div>
  );
}
