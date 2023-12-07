import Navbar from '../components/navbar'
import { useState, useEffect, useContext } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Card from '../components/card.js';
import { GoDotFill } from "react-icons/go";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { notification } from 'antd';

import { Fade } from 'react-awesome-reveal';

import CartContext from '../config/cartContext.js';
import QuanContext from '../config/quanContext.js';

import cartInc from '../function/cartInc';
import Footer from '../components/footer.js';

const ProductDisplay = () => {
    const { REACT_APP_BACKEND_PORT } = process.env

    const [notificationApi, notificationContextHolder] = notification.useNotification();
    let { productId } = useParams()
    const [clothData, setClothData] = useState([])
    const [relatedCloth, setRelatedCloth] = useState([])
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [quantity, setQuantity] = useState(1);
    const [loader, setLoader] = useState(true)
    const [size, setSize] = useState('S');
    const navigate = useNavigate()

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    useEffect(() => {
        async function fetchDataFunc() {
            setLoader(true)
            try {
                const fetchData = await axios.get(`${REACT_APP_BACKEND_PORT}/home`)
                setClothData(fetchData.data.cloth)
                setLoader(false)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchDataFunc()
    }, [])


    useEffect(() => {
        async function fetchRelatedCloth() {
            try {
                if (clothData.length > 0) {
                    // Filter out the current cloth from relatedCloth
                    const currentCloth = clothData[productId];
                    const filteredCloth = clothData.filter((cloth, index) => index != productId);

                    const sameCategory = filteredCloth.filter((cloth, index) => cloth.category === currentCloth.category)

                    setRelatedCloth(sameCategory);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchRelatedCloth();
    }, [clothData, productId]);


    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
    };

    const handleCheckValue = (e) => {
        const blurQuan = e.target.value
        if (!blurQuan.trim()) {
            setQuantity(1)
        }
    }
    const handleCardClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (clothData.length >= 1) {
        let { clothStatus, clothImg, clothImgHover, clothTitle, clothCon, clothPrice } = clothData[productId];

        let galleryImages = Object.values(clothData[productId].galleryImages);

        return (
            <div>
                <Navbar />

                {notificationContextHolder}

                <div className='navs'>
                    <NavLink className='navs-link' to={'/home'}>
                        Home { }
                    </NavLink>
                    / { }
                    Product { }
                    / { }
                    { } {clothTitle} {` (${productId}) `} { }
                    /
                </div>


                <Fade>
                    {!loader ?
                        <div className='cloth-display-con'>
                            <div className='img-con'>
                                <div className='slider-con'>
                                    <Carousel
                                        showArrows={false}
                                        showStatus={false}
                                        infiniteLoop={true}
                                        autoPlay={true}
                                        stopOnHover={true}
                                        showIndicators={false}
                                    >
                                        {Object.values(galleryImages).map((image, index) => (
                                            <div key={index}>
                                                <img className='cloth-img' src={image} alt={clothTitle} />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>

                            <div className='display-det'>
                                <h1 className='display-title'>{clothTitle}</h1>
                                <p className='display-con'>{clothCon}</p>
                                <h3 className='display-status'>
                                    <GoDotFill color={`${clothStatus === 'In Stock' ? '#00ccff' : '#016f8a'}`} />
                                    <span>
                                        {clothStatus}
                                    </span>
                                </h3>
                                <h2 className='display-price'>Rs {clothPrice}</h2>

                                <div className='display-quan-con'>
                                    <div>
                                        <p>QUANTITY: </p>
                                    </div>
                                    <span className='quan-count-con'>
                                        <button
                                            className={`quan-count-btn minus-btn ${quantity === 1 && 'btn-disabled'}`}
                                            onClick={handleDecrement}
                                        >-</button>

                                        <input
                                            className='quan-inp'
                                            type='number'
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            onBlur={handleCheckValue}
                                        />

                                        <button
                                            className='quan-count-btn plus-btn'
                                            onClick={handleIncrement}
                                        >+</button>
                                    </span>
                                </div>

                                <div className='display-quan-con'>
                                    <div>
                                        <p>SIZE:</p>
                                    </div>
                                    <Select
                                        value={size}
                                        onChange={handleChange}
                                        size='small'
                                        className='size-select'
                                    >
                                        <MenuItem value='XS'>Extra Small (XS)</MenuItem>
                                        <MenuItem value='S'>Small (S)</MenuItem>
                                        <MenuItem value='M'>Medium (M)</MenuItem>
                                        <MenuItem value='L'>Large (L)</MenuItem>
                                        <MenuItem value='XL'>Extra Large (XL)</MenuItem>
                                    </Select>
                                </div>

                                <div className='buy-add-con'>
                                    <div className='btn-container'>
                                        <Button
                                            className={`add-button ${clothStatus !== 'In Stock' ? `btn-disabled` : ``}`}
                                            variant="outlined"
                                            size="large"
                                            onClick={(event) => cartInc(event, clothData[productId], setCartNum, setQuanNum, quantity, size)}
                                        >
                                            <span>
                                                ADD TO CART
                                            </span>
                                        </Button>
                                    </div>
                                    <div className='btn-container'>
                                        <Button
                                            className={`add-button ${clothStatus !== 'In Stock' ? `btn-disabled` : ``}`}
                                            variant="contained"
                                            size='large'
                                            onClick={(event) => { cartInc(event, clothData[productId], setCartNum, setQuanNum, quantity, size); navigate('/home/checkout/order') }}
                                        >
                                            <span>
                                                BUY it now
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='cloth-display-con' style={{ height: '60vh', position: 'relative' }}>
                            <span className='loader'></span>
                        </div>
                    }
                </Fade>


                <div className='section-separator'></div>

                <div className='cloth-showcase-con'>
                    <h2 className='showcase-title'>Related items:</h2>
                    <div className='card-con'>
                        {relatedCloth.map((item, index) => {
                            return (
                                <span key={index}>
                                    {
                                        item.clothID !== productId ? <NavLink className="card-link" to={`/home/product/${item.clothID}`} >
                                            <Card
                                                AddCartFunc={(event) => cartInc(event, clothData[productId], setCartNum, setQuanNum)}
                                                clothStatus={item.clothStatus}
                                                clothImg={item.clothImg}
                                                clothImgHover={item.clothImgHover}
                                                clothTitle={item.clothTitle}
                                                clothPrice={item.clothPrice}
                                                className='card'
                                                onCardClick={handleCardClick}
                                                showBtn={false}
                                            />
                                        </NavLink> : ``
                                    }
                                </span>
                            )
                        })}
                    </div>
                </div>

                <Footer />
            </div >
        );
    } else {
        return (
            <>
                <Navbar />
                <span className='loader'></span>
                <p style={{ color: 'black', fontSize: 'clamp(1.05rem, 1.45vh, 1.75rem)', position: 'fixed', transform: 'translate(-50%)', top: '53%', left: '50%', whiteSpace: 'nowrap', overflow: 'hidden' }}>Something went wrong.</p>
            </>
        );
    }
};

export default ProductDisplay;