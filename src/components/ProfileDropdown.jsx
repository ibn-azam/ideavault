import { authClient } from "@/lib/auth-client";
import {ArrowRightFromSquare, Bulb, Comment, Gear, Person, Persons} from "@gravity-ui/icons";
import {Avatar, Button, Dropdown, Label} from "@heroui/react";
import Link from "next/link";

export function ProfileDropdown({user}) {
  const {name,email,image} = user;
  const handleSignout= async()=>{
        await authClient.signOut();
    }
  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt={name}
            src={image}
          />
          <Avatar.Fallback delayMs={600}><Person/></Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt={name}
                src={image}
              />
              <Avatar.Fallback delayMs={600}><Person/></Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{name}</p>
              <p className="text-xs leading-none text-muted">{email}</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          
          
          <Dropdown.Item id="profile" textValue="profile">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Profile</Label>
              <Persons className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="my-ideas" textValue="My-ideas">
            <div className="flex w-full items-center justify-between gap-2">
              <Link href='/ideas'>
                <Label>My-Ideas</Label>
              </Link>
              <Bulb className="size-3.5 text-muted"/>
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="my-interactions" textValue="My-interactions">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>My-Interactions</Label>
              <Comment className="size-3.5 text-muted"/>
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="profile-management" textValue="Profile-management">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Profile Management</Label>
              <Gear className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="logout" textValue="Logout" variant="danger">
            <div onClick={handleSignout} className="flex w-full items-center justify-between gap-2">
              <Link href='/'>
                <Button variant="none" onClick={handleSignout}>
                <Label>Log Out</Label>
              </Button>
              </Link>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}