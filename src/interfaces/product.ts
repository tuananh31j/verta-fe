interface Size {
    _id: string;
    value: string;
}

interface Item {
    _id: string;
    image: string;
    imageRef: string;
    size: Size;
    stock: number;
}

interface Color {
    _id: string;
    name: string;
    hex: string;
}

interface Variant {
    color: Color;
    items: Item[];
}

interface IProductDetail {
    _id: string;
    name: string;
    price: string;
    summary: string;
    thumbnail: string;
    thumbnailRef: string;
    sold: number;
    variants: Variant[];
    categories: string[];
    filterSize: string[];
    filterColor: string[];
    createdAt: string;
    updatedAt: string;
}
