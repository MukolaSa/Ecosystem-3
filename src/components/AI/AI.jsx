// import React, { useState } from 'react';
// import { Button, TextField, IconButton, Box } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import AI from './OpenAi.svg';
// import styled from 'styled-components';
// import { sendMsToOpenAI } from './openai';


// const Container = styled.div`
//   display: flex;
//   font-family: 'Arial', sans-serif;
// `;

// const Sidebar = styled.div`
//   margin-top: 20px;
//   border-radius: 20px 0px 0px 20px;
//   margin-left: 15px;
//   width: 250px;
//   background-color: #7070f5;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   height: 700px;
// `;

// const Logo = styled.img`
//   margin-top: 15px;
//   margin-bottom: 35px;
//   width: 150px;
// `;

// const SidebarButton = styled.button`
//   background-color: #5d21f5;
//   color: #fff;
//   padding: 12px;
//   border: none;
//   border-radius: 10px;
//   margin-bottom: 10px;
//   font-size: 16px;
//   font-weight: 600;
//   transition: all 0.3s ease;
//   display: block;
//   align-items: center;
//   justify-content: center;

//   width: 210px;
//   height: 46px;

//   &:hover {
//     background-color: #4e1bb8;
//     cursor: pointer;
//   }

//   &:first-child {
//     margin-top: 50px;
//   }

//   &:last-child {
//     margin-bottom: 0;
//   }
// `;

// const SidebarBottom = styled.div`
//   margin-top: auto;
// `;

// const ChatWindow = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   margin-top: 20px;
//   margin-right: 15px;
//   border-radius: 0px 20px 20px 0px;
//   background: rgba(255, 255, 255, 0.92);
// `;

// const MessageContainer = styled.div`
//   flex: 1;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   overflow-y: auto;
// `;

// const UserMessage = styled.div`
//   background-color: #f0f0f1;
//   padding: 15px;
//   border-radius: 20px;
//   margin-bottom: 10px;
//   width: fit-content;

//   font-weight: 700;
//   font-size: 12px;
//   letter-spacing: 0.02em;
//   text-transform: uppercase;
//   color: #434242;
// `;

// const BotMessage = styled.div`
//   background-color: #f0f0f1;
//   padding: 15px;
//   border-radius: 20px;
//   margin-left: auto;
//   width: fit-content;

//   font-weight: 700;
//   font-size: 12px;
//   letter-spacing: 0.02em;
//   text-transform: uppercase;
//   color: #434242;
// `;

// const MessageInputContainer = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px;
// `;

// const StyledTextField = styled.input`
//   width: 841px;
//   height: 52px;
//   border-radius: 67px;
//   background: #f4f4f4;
//   padding-left: 30px;
//   border: none;
//   margin-left: 50px;

//   font-weight: 700;
//   font-size: 12px;
//   letter-spacing: 0.02em;
//   text-transform: uppercase;
//   color: #000000;
//   margin-bottom: 8px;
// `;


// const SendButton = styled(IconButton)`
//   color: #7a5fff;
//   margin-bottom: 8px;
// `;

// function ChatUI() {
//   const [input, setInput] = useState("")
//   const [messages, setMessages] = useState([
//     {
//       text: "Hi",
//       isBot: true,
//     }
//   ]);

//   const handleSend = async() => {
//     const res = await sendMsToOpenAI(input)
//     setMessages([
//       ...messages,
//       { text: input, isBot: false },
//       { text: res, isBot: true}
//     ])
//   }


//   return (
//     <Container>
//       <Sidebar>
//         <Logo src={AI} alt="OpenAI Logo" />
//         <SidebarButton>New Chat</SidebarButton>
//         <SidebarButton>What's Programming?</SidebarButton>
//         <SidebarButton>How to Use API?</SidebarButton>
//         <SidebarBottom>
//           <SidebarButton style={{ width: '100%' }}>Home</SidebarButton>
//           <SidebarButton style={{ width: '100%' }}>Saved</SidebarButton>
//           <SidebarButton style={{ width: '100%' }}>Questions</SidebarButton>
//         </SidebarBottom>
//       </Sidebar>

//       <ChatWindow>
//         <MessageContainer>
//           <UserMessage>Привіт! Як справи? Чим можу допомогти?</UserMessage>
//           <BotMessage>Привіт</BotMessage>
//         </MessageContainer>

//         <MessageInputContainer>
//           <StyledTextField
//             value={input}
//             onChange={(e)=>{setInput(e.target.value)}}
//             variant="outlined"
//             placeholder="Повідомлення для Chat GPT"
//           />
//           <SendButton onClick={handleSend}>
//             <SendIcon />
//           </SendButton>
//         </MessageInputContainer>
//       </ChatWindow>
//     </Container>
//   );
// }

// export default ChatUI;