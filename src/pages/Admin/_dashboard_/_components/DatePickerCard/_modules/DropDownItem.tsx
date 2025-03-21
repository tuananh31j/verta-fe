import { ArrowRightOutlined } from '@ant-design/icons';

type DropDownItemProps = {
    handleClick: () => void;
    title: string;
    labelId?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

const DropDownItem: React.FC<DropDownItemProps> = ({ handleClick, title, labelId, onMouseEnter, onMouseLeave }) => {
    if (labelId)
        return (
            <div className='my-1.5'>
                <label
                    onClick={handleClick}
                    htmlFor={labelId}
                    className='my-3 flex items-center justify-between gap-x-7'
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <span>{title}</span> <ArrowRightOutlined />
                </label>
            </div>
        );
    return (
        <div className='my-1.5'>
            <span
                onClick={handleClick}
                className='my-3 flex items-center justify-between gap-x-7'
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span>{title}</span> <ArrowRightOutlined />
            </span>
        </div>
    );
};

export default DropDownItem;
