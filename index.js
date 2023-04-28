const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5001;
require('dotenv').config();

// MADIALWARE
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://test:${process.env.DB_PASS}@cluster0.dussar6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

app.get('/', (req, res) => {
	res.send('<h1>How are you?</h1>');
});

const run = async () => {
	try {
		await client.connect();

		const dataCollaction = client.db('test').collection('test');

		app.get('/data', async (req, res) => {
			const data = await dataCollaction.find().toArray();
			res.send(data);
		});
	} finally {
		// await client.close();
	}
};

run().catch(console.dir);

app.listen(port, (req, res) => {
	console.log('Server is running successfully', port);
});
