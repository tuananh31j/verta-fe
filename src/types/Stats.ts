export type IOrderStatsResponse = {
    data: [
        {
            date: string;
            totalOrders: number;
            totalRevenue: number;
        },
    ];
};

export type IProductStatsResponse = {
    data: {
        topSellingProducts: {
            _id: string;
            name: string;
            image: string;
            price: number;
            totalQuantity: number;
            totalRevenue: number;
            percentageOfTotal: string;
        }[];
        leastSellingProducts: {
            _id: string;
            name: string;
            image: string;
            price: number;
            totalQuantity: number;
            totalRevenue: number;
            percentageOfTotal: string;
        }[];
        dateRange: {
            start: string;
            end: string;
        };
    };
};
export type IPendingTask = {
    pendingOrders: number;
    confirmedOrders: number;
    shippingOrders: number;
    cancelledOrders: number;
    outOfStockProducts: number;
};
export interface IYearlyStatsData {
    totalOrders: number;
    totalRevenue: number;
    month: number;
}

export interface IYearlyStatsResponse {
    data: {
        year: number;
        months: IYearlyStatsData[];
        totalOrders: number;
        totalRevenue: number;
    };
}
interface DateRange {
    start: string;
    end: string;
}

interface TotalStatsData {
    totalOrders: number;
    cancelledOrders: number;
    successfulOrders: number;
    totalRevenue: number;
    orderSuccessRate: number;
    orderCancelRate: number;
    newUsers: number;
    newProducts: number;
    averageDailyRevenue: number;
    dateRange: DateRange;
}

export interface ITotalStatsResponse {
    data: TotalStatsData;
}
