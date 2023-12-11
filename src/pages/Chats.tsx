import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import red from '@mui/material/colors/red';
import { useAuth } from '../context/AuthContext';
import  ChatItem  from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
  
  type Message = {
    role: 'user' | 'assistant',
    content: string;
  }
const Chats = () => {

    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const auth = useAuth();

    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const handleSubmit = async () => {
        const content = inputRef.current?.value as string;
        if (inputRef && inputRef.current) {
            inputRef.current.value = "";
        }
        const newMessage: Message = { role: "user", content };
        setChatMessages((prev) => [...prev, newMessage]);

        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);
    }

    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting Chats", {id: "deletechat"});
            await deleteUserChats();
            setChatMessages([]);
            toast.success("Deleted chats successfully", {id: "deletechat"});
        } catch(err) {
            console.log(err);
            toast.error("Could not clear chat", { id: "deletechat"});
        }
    }

    useLayoutEffect(() => {
        if(auth?.isLoggedIn && auth.user) {
            toast.loading("Loading Chats", {id: 'loadchats'});
            getUserChats().then((data) => {
                setChatMessages([...data.chats]);
                toast.success("Chats Loaded", { id: 'loadchats'});
            }).catch((err) => {
                console.log(err.message);
                toast.error('Loading chats failed', {id: 'loadchats'});
            })
        }
    }, [auth]);

    useEffect(() => {
        if(!auth?.user) {
            navigate("/login");
        }
    }, [auth]);

    return <Box sx={{ 
        display: 'flex',
        flex: 1, 
        width: '100%', 
        height: '100%',
        mt: 3,
        gap: 3 
    }}>
        <Box sx={{
            display: {md: 'flex', xs: 'none', sm: 'none'},
            flex: 0.2,
            flexDirection: 'column'
        }}>
            <Box sx={{
                display: 'flex',
                width: '100%',
                height: '60vh',
                bgcolor: 'rgb(17, 29, 39)',
                borderRadius: 5,
                flexDirection: 'column',
                mx: 3
            }}>
                <Avatar sx={{
                    mx: 'auto',
                    my: 2,
                    bgcolor: 'white',
                    color: 'black',
                    fontWeight: 700
                }}>
                    {auth?.user?.name[0]}
                </Avatar>
                <Typography sx={{
                    mx: 'auto',
                    fontFamily: 'work sans',
                    my: 4,
                    p: 3
                }}>
                    I'll be assisting you today.
                </Typography>
                <Typography sx={{
                    mx: 'auto',
                    fontFamily: 'work sans',
                    p: 3
                }}>
                   Feel free to ask questions about any topic you have in mind. Please refrain from sharing personal and sensitive information.
                </Typography>
                <Button onClick={handleDeleteChats} sx={{
                    width: '200px',
                    my: '50px',
                    color: 'white',
                    fontWeight: '700',
                    borderRadius: 4,
                    mx: 'auto',
                    bgcolor: red[300],
                    ":hover": {
                        bgcolor: red.A400
                    }
                }}>Clear Conversation</Button>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            flex: { md: 0.8, xs: 1, sm: 1},
            flexDirection: 'column',
            px: 3
        }}>
            <Typography sx={{
                textAlign: 'center',
                fontSize: '40px',
                color: 'white',
                mb: 2,
                mx: 'auto'
            }}>Model GPT-3.5 Turbo</Typography>
            <Box sx={{
                width: '100%',
                height: '60vh',
                mx: 'auto',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'scroll',
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                overflowY: 'auto',

            }}>

                {chatMessages.map((chat) => <ChatItem content={chat.content} role={chat.role} />)}
            </Box>
            <div style={{
                width: '100%',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: 'rgb(17, 27, 39)',
                display: 'flex',
                marginRight: 'auto',

            }}>
                {" "}
                <input ref={inputRef} type="text" style={{
                width: '100%',
                backgroundColor: 'transparent',
                padding: '10px',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontSize: '20px'
            }}></input>
            <IconButton onClick={handleSubmit} sx={{
                ml: 'auto',
                color: 'white',

            }}><IoMdSend /></IconButton>
            </div>
        </Box>
    </Box>
}

export default Chats;