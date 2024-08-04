import { Logo } from "@/components/logo"
import { Avatar } from "@/components/ui/avatar"
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/ui/dropdown"
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/ui/navbar"
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from "@/components/ui/sidebar"
import { StackedLayout } from "@/components/ui/stacked-layout"
import { Text } from "@/components/ui/text"
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  PlusIcon,
  Cog6ToothIcon,
} from "@heroicons/react/20/solid"
import { DateTime } from "luxon"

const navItems = [
  { label: "Home", url: "/" },
  { label: "Settings", url: "/settings" },
]

function TeamDropdownMenu() {
  return (
    <DropdownMenu
      className="min-w-80 lg:min-w-64"
      anchor="bottom start"
    >
      <DropdownItem href="/teams/1/settings">
        <Cog8ToothIcon />
        <DropdownLabel>Settings</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/teams/1">
        <Avatar
          slot="icon"
          src="/tailwind-logo.svg"
        />
        <DropdownLabel>Tailwind Labs</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="/teams/2">
        <Avatar
          slot="icon"
          initials="WC"
          className="bg-purple-500 text-white"
        />
        <DropdownLabel>Workcation</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/teams/create">
        <PlusIcon />
        <DropdownLabel>New team&hellip;</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}
export default function ApplicationLayout({ children }: React.PropsWithChildren) {
  return (
    <StackedLayout
      navbar={
        <Navbar>
          <div className="flex gap-1 items-center">
            <Logo />
            <div className="font-medium text-lg">Shmoodle Meet</div>
          </div>

          <NavbarSpacer />
          <Text> {DateTime.now().toLocaleString(DateTime.DATETIME_MED)}</Text>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem
              href="/inbox"
              aria-label="Inbox"
            >
              <Cog6ToothIcon />
            </NavbarItem>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar square={true} />
              </DropdownButton>
              <DropdownMenu
                className="min-w-64"
                anchor="bottom end"
              >
                <DropdownItem href="/logout">
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton
                as={SidebarItem}
                className="lg:mb-2.5"
              >
                <Avatar src="/tailwind-logo.svg" />
                <SidebarLabel>Tailwind Labs</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <TeamDropdownMenu />
            </Dropdown>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              {navItems.map(({ label, url }) => (
                <SidebarItem
                  key={label}
                  href={url}
                >
                  {label}
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </StackedLayout>
  )
}
