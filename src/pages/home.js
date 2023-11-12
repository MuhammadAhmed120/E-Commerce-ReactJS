import { useState, useContext, useRef, useEffect } from 'react';
import Navbar from '../components/navbar'
import Card from '../components/card.js';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import '../index.css'

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { BsArrowRight } from 'react-icons/bs'

import CartContext from '../config/cartContext.js';
import QuanContext from '../config/quanContext.js';

import { notification } from 'antd';

import cartInc from '../function/cartInc';
import { Button } from '@mui/material';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';

export default function Home() {
    const [clothData, setClothData] = useState([])
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const [sorting, setSorting] = useState('featured');
    const [loader, setLoader] = useState(true)
    const { category } = useParams()
    const [position, setPosition] = useState("static")
    const con = useRef(null)


    useEffect(() => {
        async function fetchDataFunc() {
            try {
                // setLoader(false)
                if (category) {
                    const fetchData = await axios.get(`http://localhost:3001/home/${category}`)
                    return setClothData(fetchData.data.cloth)
                } else {
                    const fetchData = await axios.get(`http://localhost:3001/home`)
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

        con.current.classList.add('animateCard')

        setTimeout(() => {
            con.current.classList.remove('animateCard')
        }, 550);

        setClothData(sortedClothData);
        setSorting(sortType);
    };

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        // Add an event listener to handle scroll events
        const handleScroll = () => {
            // console.log("Scroll-Y ~", window.scrollY.toFixed())
            if (window.scrollY >= 310) {
                setIsSticky(true);
            } else if (window.scrollY === 0) {
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
            <Navbar position={position} isSticky={isSticky} />

            {notificationContextHolder}


            <div className={`land-sec ${isSticky ? 'home-mar' : ''}`}>
                <div className='land-sec-left'>
                    <h2 className='land-day'>Outfit of the day</h2>
                    <h1 className='land-title'>
                        All your <br />
                        <span>
                            styles are here
                        </span>
                    </h1>
                    <p className='land-desc'>Consectetur adipiscing elit. Cursus condimentum donec non dictum. Id et sed ac mauris, adipiscing tincidunt amet vel at. Quis lobortis id. consectetur adipiscing elit. </p>
                    <Button variant='contained' size='large' className='land-buy-btn'>
                        <span>
                            BUY NOW
                        </span>
                        <BsArrowRight className='btn-arrow' />
                    </Button>
                </div>
                <div className='land-sec-right'>
                    <Fade style={{ zIndex: 99 }} direction='right' triggerOnce>
                        <img src={require('../pic.png')} alt="" className='land-img' />
                    </Fade>
                    <Fade delay={450} triggerOnce>
                        <img src={require('../rectangles.png')} alt="" className='land-vector2' />
                    </Fade>
                </div>
                <img src={require('../vector1.png')} alt="" className='land-vector' />
            </div>

            {/* <p style={{ color: '#000', margin: 0, fontSize: 28, fontWeight: 500, width: "fit-content", borderBottom: "2px solid #2c69eb" }}>Products{category ? ` / ${category.toUpperCase()}` : ''}</p> */}

            <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 0, marginTop: 0, padding: "0", textAlign: 'center' }} >
                <p style={{ color: '#fff', margin: 0, fontSize: 22, fontWeight: 400, width: "fit-content", backgroundColor: '#2c69eb', padding: "12px" }}>"Elevate your style with our unique anime-inspired t-shirt designs that blend fashion and fandom seamlessly."
                </p>
            </div>

            <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 50, marginTop: 90 }} >
                <p style={{ color: '#333333', margin: 0, fontSize: 43, fontWeight: 900, borderBottom: "3px solid #2c69eb", textAlign: "center" }}>
                    {/* <Fade delay={400} cascade damping={0.05} triggerOnce> */}
                        Anime Legends Fusion
                    {/* </Fade> */}
                </p>
            </div>

            {/* <p style={{ color: '#000', margin: 0, fontSize: 20 }}>{sorting.split("_").join(" ").toUpperCase()}</p> */}
            {/* <div>
                    <p style={{ color: '#000', margin: 0, fontSize: 20 }}>{category ? ` / ${category.toUpperCase()}` : ''} {`(${sorting.split("_").join(" ").toUpperCase()})`}</p>
                </div> */}


            {/* <div className='home-sort-con'>

                <div>
                    <p>Sort By:</p>
                    <Select
                        value={sorting}
                        onChange={(event) => handleSort(event.target.value)}
                        autoWidth={true}
                        sx={{ borderRadius: 30 }}
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
            </div> */}
            {/* <GrSort size={20} /> */}


            {
                loader ?
                    <div style={{ textAlign: 'center' }}>
                        <div className='card-con' ref={con}>
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
                        <Button variant='contained' size='large' className='land-buy-btn'>
                            <span>
                                View all
                            </span>
                            <BsArrowRight className='btn-arrow' />
                        </Button>
                    </div>
                    : <span className='loader'></span>
            }




            <div className='why-con'>
                <Fade direction='left' fraction={0.3} triggerOnce>
                    <div className='why-con-img'>
                        <img src={require('../shirt1.jpeg')} alt="" />
                    </div>
                </Fade>
                <Fade direction='right' fraction={0.3} triggerOnce>
                    <div className='why-con-desc'>
                        <h3>
                            <Fade delay={650} cascade damping={0.1} triggerOnce>
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
                        <Button variant='contained' size='small' className='land-buy-btn'>
                            <span>
                                shop now
                            </span>
                            <BsArrowRight className='btn-arrow' />
                        </Button>
                    </div>
                </Fade>
            </div>

            {/* <Fade cascade>
                <ul style={{ color: 'black' }}>
                    <li>I enter first...</li>
                    <li>...then comes my turn...</li>
                    <li>...and finally you see me!</li>
                </ul>
            </Fade> */}

            <footer class="footer">
                <div class="container">
                    <div class="footer_inner">
                        <div class="c-footer">
                            <div class="layout">
                                <div class="layout_item w-50">
                                    <div class="newsletter">
                                        {/* <h3 style={{ color: 'black' }} class="newsletter_title">Get updates on fun stuff you probably want to know about in your inbox.</h3> */}
                                        <form action="">
                                            <input type="text" placeholder="Email Address" />
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div class="layout_item w-25">
                                    <nav class="c-nav-tool">
                                        <h4 class="c-nav-tool_title">Menu</h4>
                                        <ul class="c-nav-tool_list">
                                            <li>
                                                <a href="/collections/all" class="c-link">Shop All</a>
                                            </li>

                                            <li>
                                                <a href="/pages/about-us" class="c-link">About Us</a>
                                            </li>

                                            <li>
                                                <a href="/blogs/community" class="c-link">Community</a>
                                            </li>
                                            <li>
                                                <a href="#" class="c-link">Vibes</a>
                                            </li>
                                        </ul>
                                    </nav>

                                </div>

                                <div class="layout_item w-25">
                                    <nav class="c-nav-tool">
                                        <h4 class="c-nav-tool_title">Support</h4>
                                        <ul class="c-nav-tool_list">

                                            <li class="c-nav-tool_item">
                                                <a href="/pages/shipping-returns" class="c-link">Shipping &amp; Returns</a>
                                            </li>

                                            <li class="c-nav-tool_item">
                                                <a href="/pages/help" class="c-link">Help &amp; FAQ</a>
                                            </li>

                                            <li class="c-nav-tool_item">
                                                <a href="/pages/terms-conditions" class="c-link">Terms &amp; Conditions</a>
                                            </li>

                                            <li class="c-nav-tool_item">
                                                <a href="/pages/privacy-policy" class="c-link">Privacy Policy</a>
                                            </li>

                                            <li class="c-nav-tool_item">
                                                <a href="/pages/contact" class="c-link">Contact</a>
                                            </li>

                                            <li class="c-nav-tool_item">
                                                <a href="/account/login" class="c-link">
                                                    Login
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>

                                </div>
                            </div>
                            <div class="layout c-2">
                                <div class="layout_item w-50">
                                    <ul class="flex">
                                        <li>

                                        </li>
                                        <li>

                                        </li>
                                        <li>

                                        </li>
                                        <li>

                                        </li>
                                        <li>

                                        </li>
                                    </ul>
                                </div>
                                <div class="layout_item w-25">
                                    <ul class="flex">
                                        <li>
                                            <a href="https://www.facebook.com/" target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                                </svg>
                                            </a>
                                        </li>
                                        {/* <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                                                </svg>
                                            </a>
                                        </li> */}
                                        <li>
                                            <a href="https://www.instagram.com/" target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="layout_item w-25" style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
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
                            </div>
                        </div>
                    </div>
                    <div class="footer_copyright">
                        <p>&copy; 2023 FLEXUS, Made by Muhammad Ahmed</p>
                    </div>
                </div>
            </footer >
        </div >
    )
}



// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css'

// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Unstable_Grid2';




// const PrevArrow = ({ onClick }) => (
//     <div className="custom-arrow prev" onClick={onClick}>
//         <FaChevronLeft />
//     </div>
// );

// const NextArrow = ({ onClick }) => (
//     <div className="custom-arrow next" onClick={onClick}>
//         <FaChevronRight />
//     </div>
// );

// const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5, // Number of cards to show at a time
//     slidesToScroll: 1, // Number of cards to scroll at a time
//     autoplay: true,
//     autoplaySpeed: 2000, // Adjust the autoplay interval as needed
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />,
//     responsive: [
//         {
//             breakpoint: 1500,
//             settings: {
//                 slidesToShow: 4,
//             },
//         },
//         {
//             breakpoint: 1200,
//             settings: {
//                 slidesToShow: 3,
//             },
//         },
//         {
//             breakpoint: 900,
//             settings: {
//                 slidesToShow: 2,
//             },
//         },
//         {
//             breakpoint: 710,
//             settings: {
//                 slidesToShow: 0,
//                 slidesToScroll: 0, // Set slidesToScroll to 0 at 710px and below 
//             },
//         },
//     ],
// };

{/* <Slider {...settings} className="carousel-wrapper centered-carousel"> */ }
{/* </Slider> */ }




// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: 'grey',
//     ...theme.typography.body2,
//     padding: theme.spacing(7),
//     textAlign: 'center',
//     color: 'white',
//     fontSize: '34px',
//     fontFamily: 'Teko, sans-serif',
//     fontWeight: '100'
// }));




{/* {contextHolder} */ }
{/* <div className='item-grid-con'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container rowSpacing={1} >
                        md = 900px+, sm = 600px - 900px, xs = 600px-
                        <Grid xs={14} sm={7} md={8}>
                            <Item style={{ backgroundColor: 'black', }} className='items-grid'>MEN's COLLECTION</Item>
                        </Grid>
                        {window.innerWidth >= 600 &&
                            <>
                                <Grid xs={4} sm={5} md={4}>
                                    <Item style={{ backgroundColor: 'grey' }} className='items-grid'>HOODIES</Item>
                                </Grid>
                                <Grid xs={4} sm={5} md={4}>
                                    <Item style={{ backgroundColor: 'greenyellow', color: 'black' }} className='items-grid'>JACKETS</Item>
                                </Grid>
                            </>
                        }
                        <Grid xs={14} sm={7} md={8}>
                            <Item style={{ backgroundColor: 'green', }} className='items-grid'>WOMEN's COLLECTION</Item>
                        </Grid>
                    </Grid>
                </Box>
            </div> */}
