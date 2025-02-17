import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, Dropdown, MenuProps, Popover } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.png';
import { logout } from '~/store/slice/authSlice';
import { useTypedSelector } from '~/store/store';

const Header = () => {
    const user = useTypedSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    const dropDownItems: MenuProps['items'] = user
        ? [
              {
                  key: '1',
                  label: (
                      <Link className='pr-10 capitalize' to='/profile'>
                          Tài khoản của tôi
                      </Link>
                  ),
              },
              {
                  key: '2',
                  label: (
                      <Link className='pr-10 capitalize' to='/orders'>
                          Đơn hàng của tôi
                      </Link>
                  ),
              },
              {
                  key: '3',
                  label: (
                      <button onClick={handleLogout} className='cursor-pointer pr-10 capitalize'>
                          Đăng xuất
                      </button>
                  ),
              },
          ]
        : [
              {
                  key: '1',
                  label: (
                      <Link className='pr-10 capitalize' to='/auth'>
                          Đăng nhập
                      </Link>
                  ),
              },
              {
                  key: '2',
                  label: (
                      <Link className='pr-10 capitalize' to='/auth'>
                          Đăng ký
                      </Link>
                  ),
              },
          ];
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const content = <div>Chưa có sản phẩm nào trong giỏ hàng lor</div>;

    return (
        <header
            className={`sticky top-0 right-0 left-0 z-50 border-b border-gray-300 bg-white transition-all duration-300`}
        >
            <div className='mx-2 flex items-center justify-between py-3'>
                <div className='mx-6 grid w-full max-w-7xl grid-cols-3 items-center justify-between xl:mx-auto'>
                    <Link to='/' className='w-24'>
                        <img src={logo} alt='logo' className='w-full' />
                    </Link>
                    <div className='flex'>
                        <ul className='flex gap-5'>
                            <li className='text-sm font-semibold whitespace-nowrap text-[#8e8e8e] uppercase duration-300 hover:text-black'>
                                <Link to='/'>Sản phẩm</Link>
                            </li>
                            <li className='text-sm font-semibold whitespace-nowrap text-[#8e8e8e] uppercase duration-300 hover:text-black'>
                                <Link to='/'>Danh mục</Link>
                            </li>
                            <li className='text-sm font-semibold whitespace-nowrap text-[#8e8e8e] uppercase duration-300 hover:text-black'>
                                <Link to='/'>Bán chạy</Link>
                            </li>
                            <li className='text-sm font-semibold whitespace-nowrap text-[#8e8e8e] uppercase duration-300 hover:text-black'>
                                <Link to='/'>Về chúng tôi</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='flex items-center justify-end gap-3'>
                        <div className='cursor-pointer'>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        boxShadowSecondary: '',
                                    },
                                }}
                            >
                                <Popover
                                    content={
                                        <div>
                                            <div className='flex'>
                                                <input
                                                    type='text'
                                                    placeholder='Tìm kiếm...'
                                                    className='border border-[#d8d3d3] bg-white px-3 py-2 outline-none'
                                                />
                                                <div className='flex items-center justify-between bg-black px-2.5'>
                                                    <SearchOutlined style={{ fontSize: 16, color: '#fff' }} />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    trigger={['hover']}
                                    placement='bottomLeft'
                                    arrow={false}
                                    color='#00000000'
                                >
                                    <SearchOutlined className='my-3 px-2' style={{ fontSize: 24, color: '#000' }} />
                                </Popover>
                            </ConfigProvider>
                        </div>
                        <span className='text-xl text-[#8e8e8e]'>|</span>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Dropdown: {
                                        paddingBlock: 8,
                                    },
                                },
                            }}
                        >
                            <Dropdown
                                menu={{ items: dropDownItems }}
                                overlayStyle={{ marginTop: 32 }}
                                trigger={['hover']}
                                placement='bottomLeft'
                            >
                                <div className='flex cursor-pointer items-center gap-2 text-[#070707]'>
                                    {user ? (
                                        <div className='px-2 py-3'>
                                            <img src={user.avatar} className='inline w-6 rounded-full' alt='' />
                                        </div>
                                    ) : (
                                        <UserOutlined className='px-2 py-3' style={{ fontSize: 24 }} />
                                    )}

                                    <span>{user?.name ? truncateText(user.name, 8) : 'Tài khoản'}</span>
                                </div>
                            </Dropdown>
                        </ConfigProvider>
                        <span className='text-xl text-[#8e8e8e]'>|</span>
                        <div className='cursor-pointer text-[#070707]'>
                            <Popover content={content} placement='bottomRight' trigger={['click', 'hover']}>
                                <ShoppingCartOutlined className='px-2 py-3' style={{ fontSize: 24 }} />{' '}
                                <span>Giỏ hàng</span>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
