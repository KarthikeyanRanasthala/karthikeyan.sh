import mongoose from 'mongoose';

const connection = {
  state: 0,
};

export default async (): Promise<void> => {
  if (connection.state === 1) return;

  const db = await mongoose.connect(process.env.MONGO_DB_URI || '', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  connection.state = db.connections[0].readyState;
};
