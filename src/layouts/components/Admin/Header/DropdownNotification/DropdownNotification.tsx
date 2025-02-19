import BellIcon from '~/components/_common/Icons/BellIcon';
import NotificationItem from './NotificationItem';
import Dropdown from '../_module/Dropdown';

const DropdownNotification = () => {
    return (
        <Dropdown title='Notification' icon={<BellIcon />}>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
        </Dropdown>
    );
};

export default DropdownNotification;
