import "dotenv/config";
import mongoose from "mongoose";
import colors from "colors";
import { users } from "./data/users.js";
import { UserModel } from "./models/UserModel.js";
import { products } from "./data/products.js";
import { ProdModel } from "./models/ProdModel.js";
import { OrderModel } from "./models/OrderModel.js";

(async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is now Connected!"))
    .catch((error) => console.log(error))
})();

const importData = async () => {
    try {
        await OrderModel.deleteMany();        
        await ProdModel.deleteMany();        
        await UserModel.deleteMany();        
        const createdUsers = await UserModel.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser};
        });
        await ProdModel.insertMany(sampleProducts);
        console.log("Data was Imported".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
    }
};

const destroyData = async () => {
    try {
        await OrderModel.deleteMany();
        await ProdModel.deleteMany();
        await UserModel.deleteMany();
        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
};


