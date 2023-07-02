import { products } from "../data/products.js";

class ProdClass {
    All = (req, res) => {
        res.json(products);
    };

    One = (req, res) => {
        const product = products.find(
            (prod) => prod._id === req.params.id);
        res.json(product);
    };
};

export const PROD = new ProdClass();




