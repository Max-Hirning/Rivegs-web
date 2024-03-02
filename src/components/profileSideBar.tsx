"use client";

import Link from "next/link";
import {IUserSession} from "@/types";
import {useTheme} from "@mui/system";
import React, {ReactNode} from "react";
import {AvatarUI} from "@/UI/avatarUI";
import {IUser} from "@/modules/settings";
import {Theme} from "@mui/material/styles";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import {Stack, Typography, ListItemIcon, ListItemText, ListItemButton, List, ListItem} from "@mui/material";

interface IProps {
  styles?: string;
  user: IUserSession;
}
interface IRoute {
  href: string;
  title: string;
  icon: (width: number, height: number, color: string) => ReactNode;
}

const routes: IRoute[] = [
  {
    href: "/profile",
    title: "My profile",
    icon: (width: number, height: number, color: string) => <AccountCircleIcon sx={{fontSize: width, color: color}}/>
  },
  {
    title: "Favorites",
    href: "/recipe/favorites",
    icon: (width: number, height: number, color: string) => <FavoriteRoundedIcon sx={{fontSize: width, color: color}}/>
  },
  {
    title: "Settings",
    href: "/profile/settings",
    icon: (width: number, height: number, color: string) => <SettingsSuggestRoundedIcon sx={{fontSize: width, color: color}}/>
  },
  {
    title: "Security",
    href: "/profile/settings/security",
    icon: (width: number, height: number, color: string) => <AdminPanelSettingsRoundedIcon sx={{fontSize: width, color: color}}/>
  }
];

export function ProfileSideBar({user, styles}: IProps) {
  const pathname = usePathname();
  const {palette} = useTheme<Theme>();
  const {data: session} = useSession();

  return (
    <aside className={`w-[250px] border-r border-[#EAECF0] ${styles || ""}`}>
      <Stack 
        spacing="20px"
        direction="row"
        component="div"
        className="p-[20px] border-b border-[#EAECF0]"
      >
        <AvatarUI
          name=""
          // styles?: string;
          size="normal"
          // widthBorder?: boolean;
          avatarUrl={(session?.user as IUser)?.image || user.image}
        />
        <article className="justify-center flex flex-col w-[141px]">
          <Typography 
            gutterBottom
            variant="body2"
          >Welcome</Typography>
          <Typography variant="body1">{(session?.user as IUser)?.login || user.login}</Typography>
        </article>
      </Stack>
      <List className="p-[20px]">
        {routes.map(({title, href, icon}: IRoute, index: number) => (
          <Link 
            href={href}
            key={index}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {icon(25, 25, href === pathname ? palette.primary.main : "#6E7378")}
                </ListItemIcon>
                <ListItemText 
                  primary={title} 
                  sx={{color: href === pathname ? palette.primary.main : palette.text.primary}}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <ListItem 
          disablePadding
          className="mt-[25px]"
          onClick={() => signOut()}
        >
          <ListItemButton>
            <ListItemIcon>
              <LogoutRoundedIcon sx={{fontSize: "25px", color: "#6E7378"}}/>
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </aside>
  );
}