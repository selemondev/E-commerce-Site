export interface ProductType {
    _id:        string;
    title:      string;
    desc:       string;
    image:      string;
    categories: string[];
    price:      string;
    inStock:    boolean;
    __v:        number;
    color?:     string;
}
