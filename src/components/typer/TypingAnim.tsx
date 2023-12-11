import { TypeAnimation } from 'react-type-animation';

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        `What's on your mind? 🤔`,
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Chat with your own personal AI bot! 🤖',
        1500,
        'Good Luck, Have Fun',
        2000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '50px', display: 'inline-block', color: 'white', textShadow: '1px 1px 20px #000' }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;