import Navbar from '../components/navbar'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

import Card from '../components/card.js';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { notification } from 'antd';

import CartContext from '../config/cartContext.js';
import QuanContext from '../config/quanContext.js';

import cartInc from '../function/cartInc';

const ProductDisplay = ({ v1, v2 }) => {
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    let { productId } = useParams()
    const [clothData, setClothData] = useState([])
    const [relatedCloth, setRelatedCloth] = useState([])
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [quantity, setQuantity] = useState(1);


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
        console.log(e.target)
        console.log(newQuantity)
        console.log('quantity--->', quantity)
        // if (e.target.value) {
        setQuantity(newQuantity);
        // }
    };


    const handleCardClick = (event) => {
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
                <h1></h1>

                <span className='navs'>Home/Product/{clothTitle}/</span>

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
                        <div className='count-add-con'>
                            <span className='quan-count-con'>
                                <button
                                    className={`quan-count-btn minus-btn ${quantity === 1 && 'btn-disabled'}`}
                                    onClick={handleDecrement}
                                >-</button>

                                <input
                                    className='quan-inp custom-input'
                                    type='number'
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    inputMode='none'
                                    defaultValue={1}
                                />

                                <button
                                    className='quan-count-btn plus-btn'
                                    onClick={handleIncrement}
                                >+</button>
                            </span>
                            <div>
                                <Button
                                    className={`add-button ${clothStatus !== 'In Stock' ? `btn-disabled` : ``}`}
                                    variant="contained"
                                    size="large"
                                    onClick={(event) => cartInc(event, clothData[productId], setCartNum, setQuanNum, quantity)}
                                >ADD TO CART</Button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='cloth-showcase-con'>
                    <h2 className='showcase-title'>You might also like:</h2>
                    <div className='card-con'>
                        {relatedCloth.map((item, index) => {
                            return (
                                <>
                                    {item.clothID !== productId ? <NavLink className="card-link" to={`/home/product/${item.clothID}`} key={index}>
                                        <Card
                                            AddCartFunc={(event) => cartInc(event, clothData[productId], setCartNum, setQuanNum)}
                                            clothStatus={item.clothStatus}
                                            clothImg={item.clothImg}
                                            clothImgHover={item.clothImgHover}
                                            clothTitle={item.clothTitle}
                                            clothPrice={item.clothPrice}
                                            className='card'
                                            onCardClick={(event) => handleCardClick(event)}
                                            showBtn={false}
                                        />
                                    </NavLink> : ``}
                                </>
                            )
                        })}
                    </div>
                </div>

            </div >
        );
    }
    return null;
};

export default ProductDisplay
// https://mui.com/material-ui/getting-started/templates/checkout/