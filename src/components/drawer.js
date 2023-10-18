import { Drawer } from 'antd';
import Lists from './list';
import { BsCart4 } from 'react-icons/bs'
import { RiShoppingBasketFill } from 'react-icons/ri'

const CartDrawer = ({ open, onClose }) => {
    const width = window.innerWidth <= 480 ? 320 : 400

    const handleCloseDrawer = () => {
        onClose(false);
    };

    return (
        <div>
            <Drawer
                title={
                    <>
                        <div className='cart-drawer'>
                            <span style={{ display: 'flex', gap: '0.2rem' }}>
                                CART <RiShoppingBasketFill size={20} />
                            </span>
                            <span className='cross-btn'
                                style={{}}
                                onClick={() => onClose(false)}
                            >
                                X
                            </span>
                        </div>
                    </>
                }
                width={width}
                placement="right"
                closable={false}
                onClose={() => onClose(false)}
                open={open}
                className='custom-scrollbar'
            >
                <Lists onClose={handleCloseDrawer} />
            </Drawer>
        </div>
    );
};
export default CartDrawer;