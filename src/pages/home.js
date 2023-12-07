import { useState, useContext, useEffect } from 'react';
import Navbar from '../components/navbar'
import Card from '../components/card.js';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import '../index.css'

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import CartContext from '../config/cartContext.js';
import QuanContext from '../config/quanContext.js';

import { notification } from 'antd';

import cartInc from '../function/cartInc';
import { Fade } from 'react-awesome-reveal';

import Footer from '../components/footer.js';

export default function Home() {
    const { REACT_APP_BACKEND_PORT } = process.env

    const [clothData, setClothData] = useState([])
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const [sorting, setSorting] = useState('featured');
    const [loader, setLoader] = useState(true)
    const { category } = useParams()


    useEffect(() => {
        async function fetchDataFunc() {
            setLoader(false)
            try {
                if (category) {
                    const fetchData = await axios.get(`${REACT_APP_BACKEND_PORT}/home/${category}`)
                    setLoader(true)
                    return setClothData(fetchData.data.cloth)
                } else {
                    const fetchData = await axios.get(`${REACT_APP_BACKEND_PORT}/home`)
                    setLoader(true)
                    return setClothData(fetchData.data.cloth)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataFunc()
    }, [category])


    const handleSort = (sortType) => {
        let sortedClothData = [...clothData];

        switch (sortType) {
            case 'featured':
                sortedClothData = sortedClothData.sort((a, b) => a.clothID - b.clothID);
                break;
            case 'price,_high_to_low':
                sortedClothData = sortedClothData.sort((a, b) => b.clothPrice - a.clothPrice);
                break;
            case 'price,_low_to_high':
                sortedClothData = sortedClothData.sort((a, b) => a.clothPrice - b.clothPrice);
                break;
            case 'alphabetically_a-z':
                sortedClothData = sortedClothData.sort((a, b) => a.clothTitle.localeCompare(b.clothTitle));
                break;
            case 'alphabetically_z-a':
                sortedClothData = sortedClothData.sort((a, b) => b.clothTitle.localeCompare(a.clothTitle));
                break;
            case 'newest_arrivals':
                sortedClothData = sortedClothData.sort((a, b) => b.clothID - a.clothID);
                break;
            default:
                break;
        }

        setClothData(sortedClothData);
        setSorting(sortType);
    };

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 700) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <Navbar />

            <div className={`${isSticky ? "top-arrow" : "dis"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                    }}
                    style={{ width: 36, height: 36, cursor: 'pointer' }}
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 10h3l-4-4-4 4h3v4h2v-4z" />
                </svg>
            </div>

            {notificationContextHolder}
            <section>

                <div className='land-sec'>
                    <div className='land-sec-left'>
                        <h2 className='land-day'>Outfit of the day</h2>
                        <h1 className='land-title'>
                            All your <br />
                            <span>
                                styles are here
                            </span>
                        </h1>
                        <p className='land-desc'>Consectetur adipiscing elit. Cursus condimentum donec non dictum. Id et sed ac mauris, adipiscing tincidunt amet vel at. Quis lobortis id. consectetur adipiscing elit. </p>
                    </div>
                    <div className='land-sec-right'>
                        <Fade style={{ zIndex: 99 }} fraction={0.3} direction='right' triggerOnce>
                            <img src={require('../pic.png')} alt="land-img" className='land-img' />
                        </Fade>
                        <Fade delay={450} fraction={0.3} triggerOnce>
                            <img src={require('../rectangles.png')} alt="img-vector" className='land-vector2' />
                        </Fade>
                    </div>
                    <img src={require('../vector1.png')} alt="land-vector" className='land-vector' />
                </div>
            </section>

            <div className='land-quote-con' >
                <p>"Elevate your style with our unique anime-inspired t-shirt designs that blend fashion and fandom seamlessly."
                </p>
            </div>

            <div className='section-separator'></div>

            <section>
                <div className='anime-title-con' >
                    <p>
                        Anime Legends Fusion
                    </p>
                </div>

                <div style={{ textAlign: 'center', position: 'relative', paddingBottom: 20 }}>
                    {
                        loader ?
                            <>
                                <div className='home-sort-con'>
                                    <div>
                                        <Select
                                            value={sorting}
                                            onChange={(event) => handleSort(event.target.value)}
                                            autoWidth={true}
                                            sx={{ borderRadius: 1.5 }}
                                            size='small'
                                        >
                                            <MenuItem value="featured">Featured</MenuItem>
                                            <MenuItem value="price,_high_to_low">Price, High to Low</MenuItem>
                                            <MenuItem value="price,_low_to_high">Price, Low to High</MenuItem>
                                            <MenuItem value="alphabetically_a-z">Alphabetically A-Z</MenuItem>
                                            <MenuItem value="alphabetically_z-a">Alphabetically Z-A</MenuItem>
                                            <MenuItem value="newest_arrivals">Newest Arrivals</MenuItem>
                                        </Select>
                                    </div>
                                </div>

                                <div className='card-con'>
                                    {clothData.map((item, index) => (
                                        <NavLink className="card-link" to={`/home/product/${item.clothID}`} key={index}>
                                            <Fade fraction={0.4} triggerOnce>
                                                <Card
                                                    AddCartFunc={(event) => cartInc(event, item, setCartNum, setQuanNum)}
                                                    clothStatus={item.clothStatus}
                                                    clothImg={item.clothImg}
                                                    clothImgHover={item.clothImgHover}
                                                    clothTitle={item.clothTitle}
                                                    clothPrice={item.clothPrice}
                                                    showBtn={false}
                                                    className="card"
                                                />
                                            </Fade>
                                        </NavLink>
                                    ))}
                                </div>
                            </>
                            : <span className='loader'></span>
                    }
                </div>
            </section>

            <div className='section-separator'></div>

            <section>
                <div className='why-con'>
                    <Fade direction='left' fraction={0.3} delay={300} triggerOnce>
                        <div className='why-con-img'>
                            <img src={'https://d9jhi50qo719s.cloudfront.net/340/samples/4cw_800.gif?230831030803'} alt="img" />
                        </div>
                    </Fade>
                    <Fade direction='left' fraction={0.3} triggerOnce>
                        <div className='why-con-desc'>
                            <h3>
                                <Fade delay={800} cascade damping={0.1} triggerOnce>
                                    a good change
                                </Fade>
                            </h3>
                            <h1>
                                WHY SHOP WITH US
                            </h1>
                            <p>
                                Along with hundreds of online stores, you might think as to what makes Flexus any different?
                                And the difference is how we treat our customers. Developing a long-term relationship demands that we give our best. The quality of our products speaks for itself!
                            </p>
                        </div>
                    </Fade>
                </div>
            </section>

            <Footer />
        </div >
    )
}