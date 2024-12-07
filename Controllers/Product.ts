import { Request, Response } from "express";
import { ProductServices } from "services/ProductServices";
import { IProduct } from './../interface/index';

// دي الكلاس اللي بتتحكم في المنتجات
export class ProductController {

    // الكونستركتور بياخد اوبجكت من الخدمات بتاعة المنتجات
    constructor(private productService: ProductServices) {}

    // دي فانكشن بتجيب كل المنتجات بناءً على الكويري برامز
    getAllProducts(req: Request): IProduct[] {
        const filterQuery = req.query.filter as string;
        if (filterQuery) {
            return this.productService.filterdByQuary(filterQuery);
        }
        return this.productService.findAll();
    }

    // دي فانكشن بتجيب المنتج على اساس الايدي بتاعه
    getProductById(req: Request, res: Response) {
        const productId = +req.params.id;
        if (isNaN(productId)) {
            res.status(404).send("Invalid product id");
        } 
        const product: IProduct | undefined = this.productService.findById(productId);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send("Product not found");
        }
    }

    // دي فانكشن بتضيف منتج جديد
    addNewProduct(req: Request, res: Response) {
        const productBody = req.body;

        this.productService.addProduct(productBody);
        res.status(200).send({
            id: this.productService.findAll().length + 1,
            name: productBody.productName,
            description: productBody.productDescription,
            price: +productBody.productPrice,
        });
        res.redirect('/');
    }

    // دي فانكشن بتعمل تحديث للمنتج
    updateProduct(req: Request, res: Response) {
        const productId = +req.params.id;
        const productIndex: number | undefined = this.productService.findAll().findIndex(product => product.id === productId);
        const productBody = req.body;
        if (productIndex !== -1) {
            this.productService.updateProductByIndex(productIndex, productBody);
            return res.status(200).send({
                message: "Product has been updated"
            });
        } else {
            return res.status(404).send("Product not found");
        }
    }

    // دي فانكشن بتحذف المنتج على اساس الايدي بتاعه
    deleteProduct(req: Request, res: Response) {
        const productId = +req.params.id;
        if (isNaN(productId)) {
            return res.status(400).send('Invalid product id');  
        }
        const productIndex = this.productService.findAll().findIndex(product => product.id == productId);
        if (productIndex === -1) {
            return res.status(404).send('Product not found');
        }
        this.productService.deleteProductByIndex(productIndex);
        res.send(this.productService.findAll());
    }
    

    // دي فانكشن بترندر صفحة المنتجات
    renderProductList(req: Request, res: Response) {
        res.render("products", {
            product: this.productService.findAll(),
            title: "This is products"
        });
    }

    // دي فانكشن بترندر صفحة منتج معين
    renderProduct(req: Request, res: Response) {
        const productId = +req.params.id;
        res.render("product", {
            product: this.productService.findById(productId)
        });
    }
}
