import { Box, useMediaQuery, useTheme } from '@mui/material';
import TypingAnim from '../components/typer/TypingAnim';
import Footer from '../components/footer/Footer';

const Home = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    return <Box sx={{
        width: isBelowMd ? '80%' : '100%',
        height: '100%',
    }}>
        <Box sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 'auto',

        }}>
            <Box><TypingAnim/></Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: {md: 'row', xs: 'column'},
                gap: '5',
                my: '10'
            }}>
                <img src='cute.png' alt='cute-robot-from-the-nineties' style={{height: '300px   ',width: '200px', margin: 'auto'}} />
                <img className='imageInverted rotate'   src='croppedai.png' alt='open-ai-logo' style={{width: '200px', margin: 'auto'}} />
            </Box>
            <Box sx={{
                display: 'flex',
                width: '100%',
                mx: 'auto',
                flexDirection: { md: 'row',  xs: 'column', sm: 'column'}
            }}>
                <img src='display.jpg' alt='chat example'  style= {{
                    display: 'flex',
                    margin: 'auto',
                    width: '60%',
                    borderRadius: '20',
                    boxShadow: '-5px -5px 105px #64f3d5',
                    marginTop: 20,
                    marginBottom: 20

                }}/>
            </Box>
        </Box>
        <Footer/>
    </Box>
}

export default Home;