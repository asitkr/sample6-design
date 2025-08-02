import "./App.css";
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Avatar, Box, Button, Paper, TextField, Tooltip, Typography, styled } from '@mui/material';

const Header = () => {
    return (
        <Box
            component="header"
            sx={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '1.8rem',
                    }}
                >
                    Ciplteam
                </Typography>
            </Box>

            <Box>
                <Button
                    variant="contained"
                    sx={{
                        px: 4,
                        py: 1,
                        borderRadius: '20px',
                        color: '#fff',
                        fontWeight: 'bold',
                        backgroundColor: 'black',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(6px)',
                        textTransform: 'none',
                        // transition: 'all 0.3s ease',
                    }}
                >
                    Log In
                </Button>
            </Box>
        </Box>
    );
};

const gradientStyles = [
    'linear-gradient(to bottom right, #a78bfa, #f472b6)',
    'linear-gradient(to bottom right, #60a5fa, #22d3ee)',
    'linear-gradient(to bottom right, #4ade80, #10b981)',
    'linear-gradient(to bottom right, #facc15, #fb923c)',
    'linear-gradient(to bottom right, #f87171, #ec4899)',
    'linear-gradient(to bottom right, #818cf8, #a78bfa)',
    'linear-gradient(to bottom right, #f472b6, #fb7185)',
    'linear-gradient(to bottom right, #22d3ee, #3b82f6)',
];

const getGradient = (name = '') => {
    const index = name.length % gradientStyles.length;
    return gradientStyles[index];
};

const GlowBox = styled(Box)(({ gradient }) => ({
    position: 'absolute',
    inset: 0,
    borderRadius: '9999px',
    background: gradient,
    opacity: 0,
    filter: 'blur(8px)',
    transition: 'opacity 0.3s',
    zIndex: -1,
}));

const StyledBox = styled(Box)(({ gradient }) => ({
    position: 'relative',
    width: '40px',
    height: '40px',
    borderRadius: '9999px',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 600,
    fontSize: '1rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s, box-shadow 0.3s, border 0.3s',
    '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
        border: '2px solid rgba(255, 255, 255, 0.5)',
    },
    '&:hover ~ .glow': {
        opacity: 0.3,
    },
}));

const TalentAvatar = ({ src, name, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const gradient = getGradient(name);

    return (
        <Box
            sx={{
                transition: 'all 1s',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.5)',
            }}
        >
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Tooltip title={name} arrow placement="top">
                    <StyledBox gradient={gradient}>
                        {src ? (
                            <Avatar
                                src={src}
                                alt={name}
                                sx={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <span>{name?.charAt(0).toUpperCase() || '?'}</span>
                        )}
                    </StyledBox>
                </Tooltip>
                <GlowBox className="glow" gradient={gradient} />
            </Box>
        </Box>
    );
};

const AnimatedOrbit = () => {
    const [rotation, setRotation] = useState(0);
    const [pulseAnimation, setPulseAnimation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 0.5) % 360);
            setPulseAnimation(prev => (prev + 2) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const conicBackground = (deg, colors) =>
        `conic-gradient(from ${deg}deg, ${colors})`;

    return (
        <Box sx={{ position: 'relative', width: 450, height: 450 }}>
            {/* Animated gradient rings */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    opacity: 0.3,
                    background: conicBackground(rotation, 'transparent 0deg, rgba(147,51,234,0.3) 90deg, rgba(236,72,153,0.3) 180deg, transparent 270deg'),
                    transform: `rotate(${rotation}deg)`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 70,
                    bottom: 70,
                    left: 70,
                    right: 70,
                    borderRadius: '100%',
                    opacity: 0.4,
                    background: conicBackground(-rotation, 'transparent 0deg, rgba(59,130,246,0.4) 120deg, rgba(147,51,234,0.4) 240deg, transparent 360deg'),
                    transform: `rotate(${-rotation * 0.8}deg)`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 120,
                    bottom: 120,
                    left: 120,
                    right: 120,
                    borderRadius: '50%',
                    opacity: 0.5,
                    background: conicBackground(rotation * 2, 'transparent 0deg, rgba(236,72,153,0.5) 60deg, rgba(59,130,246,0.5) 180deg, transparent 300deg'),
                    transform: `rotate(${rotation * 1.5}deg)`,
                }}
            />

            {/* Static ring outlines */}
            {[0, 30, 70, 120].map((offset, i) => (
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        top: offset,
                        bottom: offset,
                        left: offset,
                        right: offset,
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                />
            ))}

            {/* Center pulse text */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    textAlign: 'center',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: '#fff',
                        fontWeight: 'bold',
                        mb: 1,
                        transition: 'all 0.3s',
                        textShadow: `0 0 ${10 + Math.sin(pulseAnimation * Math.PI / 180) * 5}px rgba(147, 51, 234, 0.5)`,
                        transform: `scale(${1 + Math.sin(pulseAnimation * Math.PI / 180) * 0.05})`,
                    }}
                >
                    20k+
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Specialists
                </Typography>
            </Box>

            {/* Orbiting avatars */}
            {/* Outer */}
            <Box sx={{ position: 'absolute', inset: 0, transform: `rotate(${rotation}deg)` }}>
                {[
                    { top: 0, left: '50%', translate: '-50%, -50%', name: 'Sarah', delay: 0 },
                    { top: '50%', right: 0, translate: '50%, -50%', name: 'Mike', delay: 200 },
                    { bottom: 0, left: '50%', translate: '-50%, 50%', name: 'Lisa', delay: 400 },
                    { top: '50%', left: 0, translate: '-50%, -50%', name: 'John', delay: 600 },
                ].slice(0, 6).map((a, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: 'absolute',
                            ...a,
                            transform: `translate(${a.translate}) rotate(${-rotation}deg)`,
                        }}
                    >
                        <TalentAvatar name={a.name} delay={a.delay} />
                    </Box>
                ))}
            </Box>

            {/* Inner */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 70,
                    bottom: 70,
                    left: 70,
                    right: 70,
                    transform: `rotate(${rotation * 1.3}deg)`,
                }}
            >
                {[
                    { top: '50%', right: 0, translate: '50%, -50%', name: 'Zoe', delay: 1600 },
                    { top: '50%', left: 0, translate: '-50%, -50%', name: 'Ryan', delay: 1800 },
                    { top: 0, left: '50%', translate: '-50%, -50%', name: 'Amy', delay: 2000 },
                ].map((a, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: 'absolute',
                            ...a,
                            transform: `translate(${a.translate}) rotate(${-rotation * 1.3}deg)`,
                        }}
                    >
                        <TalentAvatar name={a.name} delay={a.delay} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const LoginForm = () => {
    const handleLoginSubmit = (values) => {
        console.log('Submitted:', values);
        // Add your login logic here
    };

    return (
        <Paper
            elevation={6}
            sx={{
                width: 360,
                borderRadius: 3,
                p: 4,
                backgroundColor: 'transparent',
            }}
        >
            <Typography variant="h5" mb={3} fontWeight="bold" align="center" color='white' fontSize={30}>
                Login
            </Typography>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                validateOnChange
                onSubmit={handleLoginSubmit}
            >
                {({ errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        {/* <TextField
                            fullWidth
                            size="small"
                            label="Email"
                            name="email"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{
                                fontWeight: 600,
                                backgroundColor: 'transparent',
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                    caretColor: 'white',
                                    backgroundColor: 'transparent !important',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused': {
                                        color: 'white',
                                    },
                                },
                                '& input': {
                                    color: 'white',
                                    fontSize: "20px",
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'white',
                                },
                                '& input:-webkit-autofill': {
                                    boxShadow: '0 0 0 1000px transparent inset !important',
                                    WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                                    WebkitTextFillColor: 'white !important',
                                    transition: 'background-color 5000s ease-in-out 0s',
                                },
                            }}
                        /> */}

                        <TextField
                            fullWidth
                            size="small"
                            label="Email"
                            name="email"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{
                                backgroundColor: 'transparent',
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                    caretColor: 'white',
                                    backgroundColor: 'transparent !important',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                                '& input': {
                                    color: 'white',
                                    fontSize: '20px', // ✅ FONT SIZE APPLIED HERE
                                    fontWeight: 600,
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                    fontSize: '18px',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'white',
                                },
                                '& input:-webkit-autofill': {
                                    boxShadow: '0 0 0 1000px transparent inset !important',
                                    WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                                    WebkitTextFillColor: 'white !important',
                                    fontSize: '20px !important', // ✅ APPLY FOR AUTOFILL AS WELL
                                    transition: 'background-color 5000s ease-in-out 0s',
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            size="small"
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{
                                fontWeight: 600,
                                backgroundColor: 'transparent',
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                    caretColor: 'white',
                                    backgroundColor: 'transparent !important',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused': {
                                        color: 'white',
                                    },
                                },
                                '& input': {
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'white',
                                },
                                '& input:-webkit-autofill': {
                                    boxShadow: '0 0 0 1000px transparent inset !important',
                                    WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                                    WebkitTextFillColor: 'white !important',
                                    transition: 'background-color 5000s ease-in-out 0s',
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                background: 'black',
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >
                            LOGIN
                        </Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
};

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: '100vh',
                background: `linear-gradient(
                    135deg,
                    #fceabb 0%,
                    #eecde9 15%,
                    #c88dea 30%,
                    #6f5aa2 50%,
                    #403a78 70%,
                    #201d47 100%
                    )`,
                overflow: 'hidden',
                position: 'relative',
                margin: "0 !important"
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: -1,
                    background: `linear-gradient(to right, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))`,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: '5rem',      // Tailwind: top-20 = 5rem
                    left: '5rem',     // Tailwind: left-20 = 5rem
                    width: '8rem',    // Tailwind: w-32 = 8rem
                    height: '8rem',   // Tailwind: h-32 = 8rem
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    background: `linear-gradient(to bottom right, rgba(250, 204, 21, 0.2), rgba(249, 115, 22, 0.2))`, // yellow-400/20 to orange-500/20
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: '5rem',   // Tailwind: bottom-20 = 5rem
                    right: '5rem',    // Tailwind: right-20 = 5rem
                    width: '10rem',   // Tailwind: w-40 = 10rem
                    height: '10rem',  // Tailwind: h-40 = 10rem
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    background: `linear-gradient(to bottom right, rgba(244, 114, 182, 0.2), rgba(168, 85, 247, 0.2))`, // pink-400/20 to purple-500/20
                }}
            />

            <Header />

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 6,
                    py: 10,
                    maxWidth: '1280px',
                    margin: '0 auto',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: '50rem',
                        transition: 'all 1s',
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'translateX(0)' : 'translateX(-2.5rem)',
                    }}
                >
                    <LoginForm />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'all 1s ease',
                        transitionDelay: '0.5s',
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'translateX(0)' : 'translateX(2.5rem)',
                    }}
                >
                    <AnimatedOrbit />
                </Box>
            </Box>
        </Box>
    )
}

export default App;
