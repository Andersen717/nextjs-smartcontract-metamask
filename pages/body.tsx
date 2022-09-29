import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useStyles } from './Style';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// metamask install module
import MetaMaskOnboarding from '@metamask/onboarding';
// components
import { NoWalletDetected } from "./components/NoWalletDetected";
// import { _ConnectWallet } from "./components_/ConnectWallet";
import { Loading } from "./components/Loading";
import { Transfer } from "./components/Transfer";
import { TransactionErrorMessage } from "./components/TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./components/WaitingForTransactionMessage";
import { NoTokensMessage } from "./components/NoTokensMessage";
//

import { ethers } from 'ethers'
import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";
import { Balance } from '@mui/icons-material';

const HARDHAT_NETWORK_ID = '31337';
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;


function content(props) {
    const classes = useStyles();

    // metamask
    const forwarderOrigin = 'http://localhost:3000';
    const [stateMetamask, setStateMetamask] = React.useState('');
    const [setupMetamask, setSetupMetamask] = React.useState('');
    const [setupMetamaskConfirm, setSetupMetamaskConfirm] = React.useState(false);
    const [metamaskState, setMetamaskState] = React.useState('this site is disconnect on metamask');
    const [windowEtherem, setWindowEtherem] = React.useState('');

    // Dapp
    const [conS, setConS] = React.useState(false);
    const [to, setTo] = React.useState('');
    const [mount, setMount] = React.useState('');
    // The info of the token (i.e. It's Name and symbol)
    const [tokenData, setTokenData] = React.useState(undefined);
    // The user's address and balance
    const [selectedAddress, setSelectedAddress] = React.useState(undefined);
    const [balance, setBalance] = React.useState(0);
    // The ID about trans actions being sent, and any possible error with them
    const [txBeingSent, setTxBeingSent] = React.useState(undefined);
    const [transactionError, setTransactionError] = React.useState(undefined);
    const [networkError, setNetworkError] = React.useState(undefined);

    // function Variables
    const [__token, set__Token] = React.useState(undefined);
    const [__pollDataInterval, set__PollDataInterval] = React.useState(undefined);

    ///////////////////////////////////////////////////////////////////////////


    React.useEffect(() => {
        initialize();
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // // const contract = new ethers.Contract(profile.kovan, profile.abi, signer);
        // const UserAddress = await signer.getAddress();
        // console.log('UserAddress: ', UserAddress);
        _initSet();
        _stopPollingData();

    }, [selectedAddress])

    const isMetaMaskInstalled = () => {
        const ether = window.ethereum;
        if (typeof ether !== undefined) {
            setWindowEtherem(ether);
        }
        return Boolean(ether && ether.isMetaMask);
    };

    const MetaMaskClientCheck = () => {
        if (!isMetaMaskInstalled()) {
            setStateMetamask('No Metamask installed');
            setSetupMetamask('Metamask install');
        } else {
            setStateMetamask('Metamask connect');
            setSetupMetamask('Metamask installed');
            setSetupMetamaskConfirm(true);
        }
    }

    const _initSet = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // When, we initialize the contract using that provider and the token's
        // artifact. You can do this same thing with your contracts.
        const _token = new ethers.Contract(
            contractAddress.Token,
            TokenArtifact.abi,
            provider.getSigner(0)
        );
        set__Token(_token);
    }

    const initialize = async () => {
        MetaMaskClientCheck();
    };

    const MetamaskInstall = () => {
        if (setupMetamaskConfirm) {
            alert('Metamask is already installed on your Browser '); return false;
        }
        const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
        const _MetamaskInstall = () => {
            onboarding.startOnboarding();
        };
        _MetamaskInstall();
    }

    const MetamaskConnect = async () => {
        try {
            const state = await windowEtherem.request({ method: 'eth_requestAccounts' });
            setMetamaskState('connected account: ' + state)
            if (state) {
                alert('this site is aleady connected on metamask ');
                return;
            } else {
                setMetamaskState('this site is disconnect on metamask')
            }
        } catch (error) {
            alert('err')
            console.error(error);
        }
    }

    const _checkNetwork = () => {
        if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
            return true;
        }
        setNetworkError('Please connect Metamask to Localhost:8545');
        return false;
    }

    // ***********************************************************************************
    const __connectWallet = async () => {
        const [selectedAddress] = await window.ethereum.enable();
        setSelectedAddress(selectedAddress);
        if (!_checkNetwork()) {
            return;
        }
        setConS(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _token = new ethers.Contract(
            contractAddress.Token,
            TokenArtifact.abi,
            provider.getSigner(0)
        );
        console.log(_token);
        const balance = await _token.balanceOf(selectedAddress);
        console.log(balance);
        //await _initialize(selectedAddress);

        // // We reinitialize it whenever the user changes their account.
        // window.ethereum.on("accountsChanged", ([newAddress]) => {
        //     _stopPollingData();
        //     // `accountsChanged` event can be triggered with an undefined newAddress.
        //     // This happens when the user removes the Dapp from the "Connected
        //     // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
        //     // To avoid errors, we reset the dapp state 
        //     if (newAddress === undefined) {
        //         return _resetState();
        //     }

        //     _initialize(newAddress);
        // });

        // We reset the dapp state if the network is changed
        // window.ethereum.on("networkChanged", ([networkId]) => {
        //     _stopPollingData();
        //     _resetState();
        // });
    }

    const _stopPollingData = () => {
        clearInterval(__pollDataInterval);
        set__PollDataInterval(undefined);
    }
    const _initialize = async (userAddress) => {
        setSelectedAddress(userAddress);
        await _intializeEthers();
        _startPollingData();
    }

    const _intializeEthers = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _token = new ethers.Contract(
            contractAddress.Token,
            TokenArtifact.abi,
            provider.getSigner(0)
        );
        set__Token(_token);
        const name = await _token.name();
        const symbol = await _token.symbol();
        setTokenData({ name, symbol });
    }

    const _startPollingData = () => {
        const _pollDataInterval = setInterval(() => _updateBalance(), 1000);
        set__PollDataInterval(_pollDataInterval);
        // We run it once immediately so we don't have to wait for it
        _updateBalance();
    }


    const _updateBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _token = new ethers.Contract(
            contractAddress.Token,
            TokenArtifact.abi,
            provider.getSigner(0)
        );
        const balance = await _token.balanceOf(selectedAddress);
        setBalance(balance);
    }

    const _transferTokens = async () => {
        try {
            _dismissTransactionError();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const _token = new ethers.Contract(
                contractAddress.Token,
                TokenArtifact.abi,
                provider.getSigner(0)
            );
            const tx = await _token.transfer(to, mount);
            setTxBeingSent(tx.hash)
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }

            await _updateBalance();
        } catch (error) {
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }

            console.error(error);
            setTransactionError(error)
        } finally {
            setTxBeingSent(undefined)
        }
    }

    // This method just clears part of the state.
    const _dismissTransactionError = () => {
        setTransactionError(undefined)
    }

    // This method just clears part of the state.
    const _dismissNetworkError = () => {
        setNetworkError(undefined);
    }

    // This is an utility method that turns an RPC error into a human readable
    // message.
    const _getRpcErrorMessage = (error) => {
        if (error.data) {
            return error.data.message;
        }
        return error.message;
    }

    // This method resets the state
    const _resetState = () => {
        setTokenData(undefined);
        setSelectedAddress(undefined);
        setBalance(undefined);
        setTxBeingSent(undefined);
        setTransactionError(undefined);
        setNetworkError(undefined);
    }


    return (
        <div className={classes.contentBG}>
            <Container maxWidth="lg" sx={{ mt: 9 }} >
                <Box sx={{ height: '60vh' }} >
                    <Grid container spacing={12}>
                        {props.loginedV &&
                            <Grid item lg={6} >
                                <div className={classes.fonts}>Hello <b style={{ color: 'red' }}>{props.name}</b></div>
                                <div className={classes.fonchid}>My name is Blockchain:  smartcontract</div>
                                <div className={classes.content}>
                                    I worked 6 years in blockchain ecosystem and financial parts.
                                    In blockchain Part, My skill is smart contract by solidity, NFT marketplace and new token deploy, staking and farming, Bot.
                                    I can do your project successfully.
                                    These are my building site with integrating blockchain and front end!
                                    https://overworldlife.com/
                                    https://deworkspace.site/
                                    If you hire me, I can start immediately.
                                    Looking forward to your response.
                                    Best regards.
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <Grid container spacing={1}>
                                        <Grid item lg={12}>
                                            <Button onClick={MetamaskConnect} className={classes.cbtn}>{stateMetamask}</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Button onClick={MetamaskInstall} id='MTState' className={classes.cbtn}>{setupMetamask}</Button>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item lg={12}>
                                            <h1 style={{ color: 'green' }}>{metamaskState}</h1>
                                            {/* <Button className={classes.buttonone}>Smart Contract</Button> */}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item lg={12}>
                                            <button className="btn btn-warning" type="button" onClick={__connectWallet}> Connect Wallet </button>
                                            {conS &&
                                                <div>
                                                    My balance : {balance}<br />
                                                    My address : {selectedAddress} <br />
                                                    amount: <input onChange={(e) => setMount(e.target.value)} ></input>
                                                    To:<input onChange={(e) => setTo(e.target.value)}></input>
                                                    <button className="btn btn-warning" type="button" onClick={_transferTokens}> send </button>

                                                </div>
                                            }
                                        </Grid>
                                    </Grid>
                                    <p className={classes.detail}> Learn more</p>
                                </div>
                            </Grid>
                        }
                        <Grid item lg={6}>
                            <div>
                                <img src='./banner-img-min.png' style={{ width: "100%" }} />
                            </div>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </div >
    )

};

export default content;