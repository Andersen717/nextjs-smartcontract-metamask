import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    pp: {
        height: "25px",
        marginTop: "4px"
    },
    icon: {
        marginLeft: "20px",
        paddingTop: "-4px"
    },
    link: {
        marginLeft: '20px',
        color: "#1E2329"
    },
    TR: {
        textAlign: 'right'
    },
    cbtn: {
        backgroundColor: "#F8D12F",
        color: "black"

    },
    hesder: {
        backgroundColor: "white",
        boxShadow: "1px 1px white"

    },
    hebtn: {
        textAlign: 'right'
    },
    //body
    fonts: {
        lineHeight: "48px",
        fontSize: "40px",
        color: "#1E2329",
        fontWeight: "600",

    },
    fonchid: {
        marginTop: "4px",
        lineHeight: "32px",
        fontSize: "24px",
        color: "#1E2329",
        fontWeight: "600"
    },
    content: {
        marginTop: "24px",
        color: "#474D57",
        lineHeight: "24px",
        fontSize: "16px",
        fontFamily: "BinancePlex, Arial, sans- serif!important"
    },
    button: {
        flex: "none",
        fontSize: "16px",
        lineHeight: "24px",
        paddingTop: "12px",
        paddingBottom: "12px",
        backgroundColor: "#F8D12F",
        color: "#212833",
        borderRadius: "4px",
        '&:hover': {
            background: 'green'
        }

    },
    buttonone: {
        flex: "none",
        fontSize: "16px",
        lineHeight: "24px",
        paddingTop: "12px",
        paddingBottom: "12px",
        backgroundColor: "#EAECEF",
        color: "#212833",
        borderRadius: "4px",
        marginTop: '20px'

    },
    detail: {
        color: "#C99400",
        lineHeight: "20px",
        fontSize: "14px",
        cursor: "pointer",
        fontWeight: "500",
    },
    kk: {
        color: "black",
        textTransform: 'none',
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    tr: {
        textAlign: 'right'
    },
    tc: {
        textAlign: 'center'
    },
    contentBG: {
        background: 'linear-gradient(rgb(234, 242, 246) 0%, rgb(111, 182, 241) 100%);',
        height: '760px',
        width: '100%',
        marginLeft: '-7px',
        paddingRight: '15px',
        marginTop: '100px'
    },
    headerBG: {
        background: 'linear-gradient(rgb(111, 182, 241) 0%, rgb(234, 242, 246) 100%);',
    },
    myInput: {
        width: '100%',
        margin: '0',
        padding: '0.6em 0.7em',
        border: '2px solid black',
        borderRadius: '3px',
        backgroundColor: 'var(--white)',
        color: 'var(--fc-dark)',
        fontSize: '13px',
        fontFamily: 'inherit',
    }
});
