"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Gift, Clock } from 'lucide-react'

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react"
import { client } from "@/app/client"
import { WalletComponents } from "./Wallet"
import ConnectWalletButton from "./ConnectWallet"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Donate", href: "/donate", icon: Gift },
  { name: "History", href: "/history", icon: Clock },
]

export default function Navbar() {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  const account = useActiveAccount();

  return (
    <NavigationMenu className="flex justify-between items-center px-4 py-2 bg-background border-b">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink asChild>
              <Link 
                href={item.href}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary relative"
                )}
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
                {activeItem === item.name && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <div className="flex items-center ml-auto">
          <ConnectButton
            client={client}
            theme={lightTheme()}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
          <ConnectWalletButton/>
          {/* <WalletComponents/> */}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}