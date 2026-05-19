const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../../.env' });

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for migration.');

    const db = mongoose.connection.db;
    const collection = db.collection('datas');

    console.log('Starting data migration on "datas" collection...');

    // We use aggregation pipeline in updateMany to process fields
    const result = await collection.updateMany(
      {}, // Match all documents
      [
        {
          $set: {
            // Convert types
            time: { $toDate: "$time" },
            latitude: { $convert: { input: "$latitude", to: "double", onError: 0, onNull: 0 } },
            longitude: { $convert: { input: "$longitude", to: "double", onError: 0, onNull: 0 } },
            depth: { $convert: { input: "$depth", to: "double", onError: 0, onNull: 0 } },
            mag: { $convert: { input: "$mag", to: "double", onError: 0, onNull: 0 } },
            gap: { $convert: { input: "$gap", to: "double", onError: null, onNull: null } },
            dmin: { $convert: { input: "$dmin", to: "double", onError: null, onNull: null } },
            rms: { $convert: { input: "$rms", to: "double", onError: null, onNull: null } },
            horizontalError: { $convert: { input: "$horizontalError", to: "double", onError: null, onNull: null } },
            depthError: { $convert: { input: "$depthError", to: "double", onError: null, onNull: null } },
            magError: { $convert: { input: "$magError", to: "double", onError: null, onNull: null } },
            magNst: { $convert: { input: "$magNst", to: "double", onError: null, onNull: null } },
            updated: { $toDate: "$updated" },
            
            // Extract country from place
            country: {
              $let: {
                vars: {
                  parts: { $split: ["$place", ", "] }
                },
                in: {
                  $cond: {
                    if: { $gt: [{ $size: "$$parts" }, 1] },
                    then: { $arrayElemAt: ["$$parts", -1] },
                    else: "Unknown"
                  }
                }
              }
            },
            
            // Calculate date fields
            year: { $year: { $toDate: "$time" } },
            month: { $month: { $toDate: "$time" } },
            day: { $dayOfMonth: { $toDate: "$time" } },
            hour: { $hour: { $toDate: "$time" } },
            
            // Calculate depth category
            depthCategory: {
              $switch: {
                branches: [
                  { case: { $lt: [{ $convert: { input: "$depth", to: "double", onError: 0, onNull: 0 } }, 70] }, then: "shallow" },
                  { case: { $lt: [{ $convert: { input: "$depth", to: "double", onError: 0, onNull: 0 } }, 300] }, then: "intermediate" }
                ],
                default: "deep"
              }
            },
            
            // Calculate magnitude category
            magnitudeCategory: {
              $switch: {
                branches: [
                  { case: { $lt: [{ $convert: { input: "$mag", to: "double", onError: 0, onNull: 0 } }, 4] }, then: "minor" },
                  { case: { $lt: [{ $convert: { input: "$mag", to: "double", onError: 0, onNull: 0 } }, 5] }, then: "light" },
                  { case: { $lt: [{ $convert: { input: "$mag", to: "double", onError: 0, onNull: 0 } }, 6] }, then: "moderate" },
                  { case: { $lt: [{ $convert: { input: "$mag", to: "double", onError: 0, onNull: 0 } }, 7] }, then: "strong" },
                  { case: { $lt: [{ $convert: { input: "$mag", to: "double", onError: 0, onNull: 0 } }, 8] }, then: "major" }
                ],
                default: "great"
              }
            }
          }
        }
      ]
    );

    console.log(`Migration completed successfully. Modified ${result.modifiedCount} documents.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();
