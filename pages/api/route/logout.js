import nextConnect from 'next-connect';
const handler = nextConnect();
handler.post(async (req, res) => {
    //logout
    res.send('logout');
})

export default handler;