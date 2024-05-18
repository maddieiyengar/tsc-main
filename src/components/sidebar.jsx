"use client";
import React from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut, ArrowLeftCircle } from "lucide-react";
// Json
const commandData = {
  groups: [
    {
      heading: "Reservations",
      items: [
        { name: "Upcoming Reservations", path: "/equipments/checked-out" },
      ],
    },
    {
      heading: "Equipments",
      items: [{ name: "Checked-Out Equipments", path: "/upcomingReservation" }],
    },
    {
      heading: "Simplified Studio",
      items: [{ name: "Studio Reservation", path: "/studio/reservation" }],
    },
    {
      heading: "Pending Approvals",
      items: [{ name: "Pending Approvals", path: "/approvals/data" }],
    },
    {
      heading: "Quick Checkout",
      items: [
        { name: "Small Tech", path: "/SmallTech" },
        { name: "Short-Term Laptops", path: "/checkout/short-term-laptops" },
        {
          name: "Administrative Laptop Checkout",
          path: "/checkout/administrative-laptop",
        },
      ],
    },
    {
      heading: "Administrative",
      items: [
        {
          name: "Add/Edit/Remove Equipments",
          path: "/administrative/manage-equipments",
        },
        { name: "Maintain user banlist", path: "/administrative/user-banlist" },
        { name: "Shift Report", path: "/administrative/shift-report" },
        {
          name: "Apple Connector Chart",
          path: "/administrative/apple-connector-chart",
        },
        { name: "Package Check In", path: "/administrative/package-check-in" },
        {
          name: "Equipment/Person History",
          path: "/administrative/equipment-history",
        },
        {
          name: "Flagged Banned Users",
          path: "/BannedUsers",
        },
      ],
    },
  ],
};

const Nav = () => {
  const { setTheme } = useTheme();
  return (
    <div className="w-1/5 border-r h-screen p-5 flex  ">
      <div className="grow">
        {/* Avatar with Dialog */}
        <div className="flex flex-col items-center ">
          <Dialog>
            <DialogTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Account Options</DialogTitle>
                <DialogDescription>
                  Choose one of the following options:
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex gap-2 items-center"
                >
                  <LogOut size={18} />
                  Log Out
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex gap-1 items-center"
                >
                  <ArrowLeftCircle size={18} />
                  Return to Main Menu
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* Email below the avatar */}
          <span className="text-sm text-gray-600 dark:text-gray-400">
            sejalsankhe25@gmail.com
          </span>
        </div>

        <Command>
          {commandData.groups.map((group, index) => (
            <CommandList key={index}>
              <CommandGroup heading={group.heading}>
                {group.items.map((item, itemIndex) => (
                  <CommandItem className="cursor-pointer" key={itemIndex}>
                    <Link href={item.path}>{item.name}</Link>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          ))}
        </Command>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Nav;
