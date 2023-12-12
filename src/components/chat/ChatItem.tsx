import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import {Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import hljs from "highlight.js";
import { topProgrammingLanguages } from '../../constants/constants';

const extractCodeBlocks = (message: string) =>  {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}

const codeIdentifier = [ ';', '//', '=', '[', ']', '{', '}', '(', , ')'];

function isCodeBlock (str: string) {
    for (let i = 0; i < str.length - 1; i++) {
        if (codeIdentifier.includes(str[i])) {
            return true;
        }
    }
    return false;
}

function detectLanguage(code: string, languages: string[]) {
    let maxRelevance = 0;
    let detectedLanguage = 'plaintext';
  
    for (const language of languages) {
      const result = hljs.highlight(code, { language });
  
      if (result.secondBest && result.secondBest.relevance > maxRelevance) {
        maxRelevance = result.secondBest.relevance;
        detectedLanguage = language;
      } else if (result.relevance > maxRelevance) {
        maxRelevance = result.relevance;
        detectedLanguage = language;
      }
    }
  
    return detectedLanguage;
  }



const ChatItem = ({content, role} : {content: string, role: "user" | "assistant"}) => {

    const language = detectLanguage(content, topProgrammingLanguages);
    const codeBlocks = extractCodeBlocks(content);
    const auth = useAuth();
    return role === 'assistant' ? 
    <Box 
        sx={{
        display: 'flex',
        p: 2,
        bgcolor: '#004d5612',
        my: 2,
        gap: 2
    }}>
        <Avatar sx={{ ml: '0'}}>
            <img src='openai.png' alt='openai' width={'30px'} />
        </Avatar>
        <Box>
            <Typography color={'white'} fontSize={'20px'}>
                {content}
            </Typography>
        </Box>
    </Box> : <Box sx={{
        display: 'flex',
        p: 2,
        bgcolor: '#004d56',
        gap: 2,
        my: 2
    }}>
        <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white'}}>
            {auth?.user?.name[0]}
        </Avatar>
        <Box>
            {!codeBlocks && (<Typography sx={{fontSize: '20px'}}>{content}</Typography>)}
            {codeBlocks && codeBlocks.length && codeBlocks.map((block) => (isCodeBlock(block) ? (
            <SyntaxHighlighter style={coldarkDark} language={language}>
                {block}
            </SyntaxHighlighter>)  :  <Box>
            <Typography color={'white'} fontSize={'20px'}>
                {content}
            </Typography>
        </Box>))}
        </Box>
    </Box> ; 
}

export default ChatItem;