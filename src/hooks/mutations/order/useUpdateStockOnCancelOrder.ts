import { useMutation } from '@tanstack/react-query';
import { inventoryService } from '~/services/inventory.service';
import { errorResponse } from '~/types/ErrorResponse';

const useUpdateStockOnCancelOrder = () => {
    return useMutation({
        mutationKey: ['update-stock-on-cancel-order'],
        mutationFn: (orderData: { orderId: string }) => inventoryService.updateStockOnCancelOrder(orderData),
        onSuccess() {},
        onError(error: errorResponse) {
            console.log(error.message);
        },
    });
};

export default useUpdateStockOnCancelOrder;
