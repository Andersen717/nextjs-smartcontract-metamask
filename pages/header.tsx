import * as React from 'react';
import { Modal, AppBar, Box, Toolbar, Typography, Button, Grid, styled, Link, Stack } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import { useStyles } from './Style';
import Axios from 'axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import jwt from 'jsonwebtoken';
// import { decode } from 'jwt-simple';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function header(props) {
    // login and reg
    const [l_mail, setL_mail] = React.useState('');
    const [l_pass, setL_pass] = React.useState('');
    const [r_mail, setR_mail] = React.useState('');
    const [r_pass, setR_pass] = React.useState('');
    const [r_con, setR_con] = React.useState('');

    // modal
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    // alert
    const [openLA, setOpenLA] = React.useState(false);
    const [loginAlertText, setloginAlertText] = React.useState('');
    const [LStateIcon, setLStateIcon] = React.useState('success');

    const login = async () => {
        if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(l_mail)) {
            alert("invalid mail")
            return;
        }
        if (l_mail == '' || l_pass == '') {
            setLStateIcon('warning')
            setOpenLA(true);
            setloginAlertText('Please enter all values');
            return;
        }
        const res = await Axios("/api/route/login", {
            method: "POST",
            data: {
                l_mail,
                l_pass
            }
        });
        if (res.data.length > 16) {
            setLStateIcon('success')
            setOpenLA(true);
            setloginAlertText('Login success');
            localStorage.setItem('token', res.data);
            props.loginedF(true);
            setTimeout(() => {
                setOpenLA(false);
                handleClose1()
            }, 1500)
        } else {
            setLStateIcon('error')
            setOpenLA(true);
            setloginAlertText('password or mail incorrect');
        }
    }
    const regist = async () => {
        if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(r_mail)) {
            alert("invalid mail")
            return;
        }
        const res = await Axios("/api/route/regist", {
            method: "POST",
            data: {
                r_mail,
                r_pass,
                r_con
            }
        });
        if (res.data == 'pass_err') alert('password error')
        if (res.data == 'empty') alert('Please enter all values')
        if (res.data == 'success') {
            alert('Registry Success');
            setTimeout(() => {
                handleClose2()
            }, 1500)
        }
        if (res.data == 'exist') alert('Already exist user')
    }

    const logout = async () => {
        const res = await Axios("/api/route/logout", {
            method: "POST",
        });
        if (res.data == 'logout') {
            localStorage.clear();
            props.loginedF(false);

        }
    }

    React.useEffect(() => {
        const decoded = jwt.decode(localStorage.getItem('token'), { complete: true });
        console.log(decoded)
    })

    const classes = useStyles();
    return (
        <div >
            <Box sx={{ flexGrow: 1 }} className={classes.headerBG}>
                <AppBar position="static" className={classes.hesder}>
                    <Toolbar >
                        <Grid container spacing={1}>
                            <Grid item xs={6} >
                                <div>
                                    <img src="/myfirst.svg" alt="Vercel" className={classes.pp} />
                                    <IconButton
                                        size="large"
                                        color="inherit"
                                        aria-label="open drawer"
                                        sx={{ ml: 2, mt: -1 }}
                                    >
                                        <AppsIcon style={{ color: "black" }} />
                                    </IconButton>
                                    <Link href="#" underline="none" className={classes.link}>
                                        {"Buy Crypto"}
                                    </Link>
                                    <Link href="#" underline="none" className={classes.link}>
                                        {'Markect'}
                                    </Link>
                                    <Link href="#" underline="none" className={classes.link}>
                                        {'Trade'}
                                    </Link>
                                    <Link href="#" underline="none" className={classes.link}>
                                        {'Derivative'}
                                    </Link>
                                    <Link href="#" underline="none" className={classes.link}>
                                        {'Earn'}
                                    </Link>
                                    <Link href="#" underline="none" className={classes.link}>
                                        {'Fince'}
                                    </Link>
                                    <Link href="#" underline="none" className={classes.link}>
                                        {'Net'}
                                    </Link>
                                </div>

                            </Grid>
                            {!props.loginedV &&
                                <Grid item xs={6} className={classes.TR}>
                                    <Stack spacing={1} direction="row" className={classes.hebtn}>
                                        <Button onClick={handleOpen1} variant="text" className={classes.cbtn} >Login</Button>
                                        <Button onClick={handleOpen2} variant="contained" className={classes.cbtn}>Register</Button>
                                    </Stack>
                                </Grid>
                            }
                            {props.loginedV &&
                                <Grid item xs={6} className={classes.TR}>
                                    <Stack spacing={1} direction="row" className={classes.hebtn}>
                                        <Button onClick={logout} variant="contained" className={classes.cbtn}>Logout</Button>
                                    </Stack>
                                </Grid>
                            }
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>

            {/* Modals */}
            <div>
                <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className={classes.tc}>
                        <Box sx={{ width: '100%' }}>
                            <Collapse in={openLA}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity={LStateIcon}
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setOpenLA(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                        sx={{ mb: 2 }}
                                    >
                                        {loginAlertText}
                                    </Alert>
                                </Stack>
                            </Collapse>
                        </Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            mail <input onChange={(e) => { setL_mail(e.target.value) }} type='input' />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            password <input onChange={(e) => { setL_pass(e.target.value) }} type='password' />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button onClick={login} variant="contained" className={classes.cbtn}>Signin</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <div>
                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className={classes.tc}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            mail <input onChange={(e) => setR_mail(e.target.value)} type='input' />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            password <input onChange={(e) => setR_pass(e.target.value)} type='password' />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            confirm <input onChange={(e) => setR_con(e.target.value)} type='password' />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button onClick={regist} variant="contained" className={classes.cbtn}>Signup</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>


        </div >
    )

}






export default header;
