require('dotenv').config();
const app = require('./app');
const port = 7888;

app.listen(port, () => console.log(`Server running on port ${port}`));
