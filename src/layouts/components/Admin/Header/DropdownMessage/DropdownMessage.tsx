import MessageItem from './MessageItem';
import Dropdown from '../_module/Dropdown';
import MessageIcon from '~/components/_common/Icons/MesageIcon';

const DropdownMessage = () => {
    return (
        <Dropdown title='Message' icon={<MessageIcon />}>
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
        </Dropdown>
    );
};

export default DropdownMessage;
