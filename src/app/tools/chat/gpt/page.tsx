"use client"
import { Icon } from "@iconify/react";
import { Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popper, TextField } from "@mui/material";
import classNames from "classnames";
import "./page.scss"
import { useState, MouseEvent } from "react";
import Apis from "@/plugins/api";
type Role = 'user' | 'system'
interface submitMessageOptions {
  role: Role, msg: string
}
interface InputBox {
  submitMessage?({ role, msg }: submitMessageOptions): void
}
/**
 * 消息输入框
 * 
 * @param param0 
 * @returns 
 */
function InputBox({ submitMessage }: InputBox) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null),
    [role, setRole] = useState<Role>('user'),
    [message, setMessage] = useState<string>('');

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  },
    itemClick = (r: Role) => () => {
      setAnchorEl(null)
      setRole(r)
    },
    inputKeyDown = (event: any) => {
      if (event.keyCode == 13 && !event.shiftKey) {
        event.preventDefault()
        if (message.trim()) {
          submitMessage?.({
            role: role,
            msg: message
          })
        }
      }
    };

  return <>
    <div className="pt-2 px-3">
      <Button type="button" onClick={handleClick}>
        {role}
        <Icon icon='tabler:corner-right-up' />
      </Button>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top-start" className="z-10">
        <div className="shadow-xl border rounded">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={itemClick('system')}>
                <ListItemIcon>
                  <Icon icon='tabler:server' />
                </ListItemIcon>
                <ListItemText>
                  SYSTEM
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={itemClick('user')}>
                <ListItemIcon>
                  <Icon icon='tabler:user' />
                </ListItemIcon>
                <ListItemText>
                  USER
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Popper>
    </div>
    <div className="flex flex-row input px-3 pb-2">
      <TextField
        className="w-full" id='msg-input'
        label="说点什么吧……" onChange={e => setMessage(e.target.value)}
        multiline onKeyDown={inputKeyDown}
        maxRows={10}
      />
      <Button variant="outlined" className="h-auto rounded-l-none">发送</Button>
    </div>
  </>
}

export default function ChatGPT() {

  const submitMessage = ({ role, msg }:submitMessageOptions) => {
    Apis.index().then(res=>{
      console.log(res);
      
    })
    // fetch(`${process.env.API_BASE_URL}`)
  }
  return <div className={classNames("flex", "flex-row", 'h-full')}>
    <div className="w-52 flex-none h-full bg-gray-50 dark:bg-gray-950">
      <ListItemButton component="a" className="menu-list">
        <ListItemText primary="Spam" />
        <div className="menu-list-item">
          <IconButton>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton>
            <Icon icon='tabler:trash' />
          </IconButton>
        </div>
      </ListItemButton>
    </div>
    <div className="h-full w-full flex flex-col">
      <div className="h-full">
        message list
      </div>
      <div className="">
        <InputBox submitMessage={submitMessage} />
      </div>
    </div>
  </div>
  }