"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User } from "next-auth"
import {
  LayoutDashboard,
  ClipboardList,
  Lightbulb,
  UserCircle,
  Settings,
  Shield,
} from "lucide-react"

interface DashboardNavProps {
  user: User
}

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Assessment",
    href: "/assessment",
    icon: ClipboardList,
  },
  {
    title: "Recommendations",
    href: "/recommendations",
    icon: Lightbulb,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

const adminNavItems = [
  {
    title: "Admin Panel",
    href: "/admin",
    icon: Shield,
  },
]

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-1 p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}

      {user.role === "ADMIN" && (
        <>
          <div className="my-4 border-t" />
          <p className="px-3 text-xs font-semibold text-muted-foreground mb-2">
            Admin
          </p>
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </>
      )}
    </nav>
  )
}
