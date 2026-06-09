import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
const PORT = process.env.PORT ?? 5599;
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map