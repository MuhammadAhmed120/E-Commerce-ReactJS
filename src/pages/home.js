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

import Footer from '../components/footer.js';

export default function Home() {
    const [clothData, setClothData] = useState([])
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const [sorting, setSorting] = useState('featured');
    const [loader, setLoader] = useState(true)
    const { category } = useParams()
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

    // const [isSticky, setIsSticky] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY >= 310) {
    //             setIsSticky(true);
    //         } else if (window.scrollY === 0) {
    //             setIsSticky(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);


    return (
        <div>
            <Navbar />

            {notificationContextHolder}
            {/* ${isSticky ? 'home-mar' : ''} */}

            <div className={`land-sec`}>
                <div className='land-sec-left'>
                    <h2 className='land-day'>Outfit of the day</h2>
                    <h1 className='land-title'>
                        All your <br />
                        <span>
                            styles are here
                        </span>
                    </h1>
                    <p className='land-desc'>Consectetur adipiscing elit. Cursus condimentum donec non dictum. Id et sed ac mauris, adipiscing tincidunt amet vel at. Quis lobortis id. consectetur adipiscing elit. </p>
                    {/* <Button variant='contained' size='large' className='land-buy-btn'>
                        <span>
                            BUY NOW
                        </span>
                        <BsArrowRight className='btn-arrow' />
                    </Button> */}
                </div>
                <div className='land-sec-right'>
                    <Fade style={{ zIndex: 99 }} fraction={0.3} direction='right' triggerOnce>
                        <img src={require('../pic.png')} alt="" className='land-img' />
                    </Fade>
                    <Fade delay={450} fraction={0.3} triggerOnce>
                        <img src={require('../rectangles.png')} alt="" className='land-vector2' />
                    </Fade>
                </div>
                <img src={require('../vector1.png')} alt="" className='land-vector' />
            </div>

            {/* <p style={{ color: '#000', margin: 0, fontSize: 28, fontWeight: 500, width: "fit-content", borderBottom: "2px solid #2c69eb" }}>Products{category ? ` / ${category.toUpperCase()}` : ''}</p> */}

            <div className='land-quote-con' >
                <p>"Elevate your style with our unique anime-inspired t-shirt designs that blend fashion and fandom seamlessly."
                </p>
            </div>

            <div className='section-separator'></div>


            <div className='anime-title-con' >
                <p>
                    {/* <Fade delay={400} cascade damping={0.05} triggerOnce> */}
                    Anime Legends Fusion
                    {/* </Fade> */}
                </p>
            </div>

            {/* <p style={{ color: '#000', margin: 0, fontSize: 20 }}>{sorting.split("_").join(" ").toUpperCase()}</p> */}
            {/* <div>
                    <p style={{ color: '#000', margin: 0, fontSize: 20 }}>{category ? ` / ${category.toUpperCase()}` : ''} {`(${sorting.split("_").join(" ").toUpperCase()})`}</p>
                </div> */}


            <div className='home-sort-con'>
                <div>
                    {/* <p>Sort By:</p> */}
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
            </div>
            {/* <GrSort size={20} /> */}

            {/* <img src={'https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png'} alt="" /> */}

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
                        {/* <Button variant='contained' size='large' className='land-buy-btn'>
                            <span>
                                View all
                            </span>
                            <BsArrowRight className='btn-arrow' />
                        </Button> */}
                    </div>
                    : <span className='loader'></span>
            }


            <div className='section-separator'></div>


            <div className='why-con'>
                <Fade direction='left' fraction={0.3} triggerOnce>
                    <div className='why-con-img'>
                        <img src={require('../shirt1.jpeg')} alt="" />
                    </div>
                </Fade>
                <Fade direction='right' fraction={0.3} triggerOnce>
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
                        {/* <Button variant='contained' size='small' className='land-buy-btn'>
                            <span>
                                shop now
                            </span>
                            <BsArrowRight className='btn-arrow' />
                        </Button> */}
                    </div>
                </Fade>
            </div>

            <Footer />

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
