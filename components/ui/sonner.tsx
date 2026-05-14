"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#0a0a14] group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl",
          description: "group-[.toast]:text-white/60",
          actionButton:
            "group-[.toast]:bg-violet-500 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white/60",
          error: "group-[.toast]:border-red-500/30 group-[.toast]:bg-red-500/10",
          success: "group-[.toast]:border-emerald-500/30 group-[.toast]:bg-emerald-500/10",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }