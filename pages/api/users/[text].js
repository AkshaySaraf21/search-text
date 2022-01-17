import { connectToDatabase } from "../../../util/mongodb";



export default async (req, res) => {
    const { db } = await connectToDatabase();
    const collection = db.collection('users');
    const { text } = req.query
    console.log(req.query);
    collection.aggregate([
        {
            $search: {
                index: 'users-index',
                text: {
                    query: text,
                    path: {
                        'wildcard': '*'
                    },
                    fuzzy: {
                        maxEdits: 1,
                        prefixLength: 2
                    }
                }
            }
        }
    ]).toArray(function (err, docs) {

        console.log({ err });
        console.log("Found the following records");
        res.json(docs)
    });
};