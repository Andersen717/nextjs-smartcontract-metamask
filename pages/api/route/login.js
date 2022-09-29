import nextConnect from 'next-connect';
import con from '../controller/userContoller';
const handler = nextConnect();
handler.post(async (req, res) => {
    con.loginUser(req, res);
})

export default handler;