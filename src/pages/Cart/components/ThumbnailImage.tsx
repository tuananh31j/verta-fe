import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeCart } from '~/store/slice/cartSlice';

type Props = {
    productId: string;
    thumbnail: string;
};

const ThumbnailImage = ({ productId, thumbnail }: Props) => {
    const dispatch = useDispatch();

    return (
        <Link
            onClick={() => dispatch(closeCart())}
            to={`/product/${productId}`}
            className='block h-40 w-30 min-w-10 rounded-md object-cover p-2'
        >
            <img src={thumbnail} alt={`cart thumbnail`} className='w-full object-contain' />
        </Link>
    );
};

export default ThumbnailImage;
