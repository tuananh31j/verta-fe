type CartColor = {
    _id: string;
    name: string;
    hex: string;
};

type CartSize = {
    _id: string;
    value: string;
    type: string;
};

interface ICartItem {
    _id: string;
    product: {
        _id: string;
        name: string;
        price: number;
        summary: string;
        thumbnail: string;
        thumbnailRef: string;
        sold: number;
        isDeleted: boolean;
        isHide: boolean;
        variants: string[];
        categories: string[];
        filterSize: string[];
        filterColor: string[];
        createdAt: string;
        updatedAt: string;
        type: {
            hasColor: boolean;
            sizeType: string[];
        };
    };
    variant: {
        _id: string;
        image: string;
        size: CartSize;
        stock: number;
        color: CartColor;
        createdAt: string;
        updatedAt: string;
    };
    quantity: number;
}

interface ICartResponse {
    userId: string;
    items: ICartItem[];
    _id: string;
}
