import { generateProducts } from "../data";
import { IAdd, IProduct } from "interface";

// هنا بنجيب الداتا الوهميه اللي هنشتغل عليها
const fakeData = generateProducts()

// دي الكلاس اللي بنعمل فيها الخدمات المختلفه للمنتجات
export class ProductServices{

    // الكونستركتور بتاع الكلاس بياخد ارراي من المنتجات وبيحفظها في الخاصية products
    constructor(private products : IProduct[]){
        this.products = products;
    }

    // دي فانكشن بترجع كل المنتجات اللي عندنا
    findAll():IProduct[]{
        return this.products
    }

    // دي فانكشن بتفلتر المنتجات بناءً على الكويري اللي بتيجي في الريكوست
    filterdByQuary(filterQuery?:string){
        // لو فيه كويري
        if(filterQuery){
            // بنقسم الكويري اللي جايه على اساس الكوما
            const propertisToFilter = filterQuery.split(",")
            let filterProduct = [];
            // بنعمل ماب على المنتجات وبنفلترها
            filterProduct =  this.findAll().map(product =>{
                const filteredProduct: any = {};

                propertisToFilter.forEach(property=>{
                    // لو المنتج فيه الخاصيه اللي بنفلتر عليها
                    if(product.hasOwnProperty(property as keyof typeof product)){
                        filteredProduct[property]=product[property as keyof typeof product]
                    }
                })
                return { id: product.id, ...filteredProduct };
            })
            return filterProduct
        } else {
            return this.findAll()
        }
    }

    // دي فانكشن بتجيب المنتج على اساس الايدي بتاعه
    findById(productId?:number){
        if(productId){
            const product = this.findAll().find(product=> product.id == productId)
            return product
        }
    }

    // دي فانكشن بتضيف منتج جديد
    addProduct(productBody:IAdd){
        return  this.findAll().push({id:this.findAll().length + 1, ...productBody})
    }

    // دي فانكشن بتعمل تحديث للمنتج بناءً على الانديكس بتاعه
    updateProductByIndex(index:number,productBody:IAdd){
        return this.findAll()[index] = {...this.findAll()[index],...productBody}
    }

    // دي فانكشن بتحذف المنتج بناءً على الانديكس بتاعه
    deleteProductByIndex(index:number){
        this.findAll().splice(index,1)
    }
}
