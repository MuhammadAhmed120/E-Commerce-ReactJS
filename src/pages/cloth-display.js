import Navbar from '../components/navbar'
import { useState, useEffect, useContext } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Card from '../components/card.js';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
// import ReactImageMagnify from 'react-image-magnify';

import { notification } from 'antd';

import { Fade, Slide, Zoom } from 'react-awesome-reveal';

import CartContext from '../config/cartContext.js';
import QuanContext from '../config/quanContext.js';

import cartInc from '../function/cartInc';
import Footer from '../components/footer.js';

const ProductDisplay = () => {
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    let { productId } = useParams()
    const [clothData, setClothData] = useState([])
    const [relatedCloth, setRelatedCloth] = useState([])
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [quantity, setQuantity] = useState(1);

    const [size, setSize] = useState('S');

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchDataFunc() {
            try {
                const fetchData = await axios.get('http://localhost:3001/home')
                setClothData(fetchData.data.cloth)
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

    const [selectedImage, setSelectedImage] = useState(0);

    if (clothData.length >= 1) {
        let { clothStatus, clothImg, clothImgHover, clothTitle, clothCon, clothPrice } = clothData[productId];

        let galleryImages = Object.values(clothData[productId].galleryImages);

        const handleImageChange = (index) => {
            setSelectedImage(index);
        };

        const handlePrevImage = () => {
            setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
        };

        const handleNextImage = () => {
            setSelectedImage((selectedImage + 1) % galleryImages.length);
        };

        return (
            <div>
                <Navbar />

                {notificationContextHolder}

                {/* <h1 className={`${isSticky ? 'pos-mar' : ''}`} style={{ marginTop: 20, color: 'black' }}>1</h1> */}

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
                    <div className='cloth-display-con'>
                        <div className='img-con'>
                            <div className='slider-con'>
                                <Carousel
                                    showArrows={false}
                                    showStatus={false}
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    stopOnHover={true}
                                    // showThumbs={true}
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
                            <h3 className='display-status'>{clothStatus}</h3>
                            <h1 className='display-title'>{clothTitle}</h1>
                            <p className='display-con'>{clothCon}</p>
                            <h2 className='display-price'>RS {clothPrice}/-</h2>

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
                                    {/* <MenuItem value='Extra Extra Large'>Extra Extra Large (XXL)</MenuItem> */}
                                </Select>
                            </div>

                            <div className='buy-add-con'>
                                <div className='btn-container'>
                                    <Button
                                        className={`add-button ${clothStatus !== 'In Stock' ? `btn-disabled` : ``}`}
                                        variant="outlined"
                                        size="large"
                                        onClick={(event) => cartInc(event, clothData[productId], setCartNum, setQuanNum, quantity, size)}
                                    >ADD TO CART</Button>
                                </div>
                                <div className='btn-container'>
                                    <Button
                                        className={`add-button ${clothStatus !== 'In Stock' ? `btn-disabled` : ``}`}
                                        variant="contained"
                                        size='large'
                                        onClick={(event) => { cartInc(event, clothData[productId], setCartNum, setQuanNum, quantity, size); navigate('/home/checkout') }}
                                    >
                                        <span style={{ flex: 1, color: '#ffffff' }}>
                                            BUY
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>

                <div className='section-separator'></div>

                <div className='cloth-showcase-con'>
                    <h2 className='showcase-title'>You might also like:</h2>
                    <div className='card-con'>
                        {relatedCloth.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item.clothID !== productId ? <NavLink className="card-link" to={`/home/product/${item.clothID}`}>
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
                                    </NavLink> : ``}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <Footer />
            </div >
        );
    }
    return null;
};

export default ProductDisplay;