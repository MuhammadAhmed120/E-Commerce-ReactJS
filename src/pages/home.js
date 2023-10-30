import { useState, useContext, useRef, useEffect } from 'react';
import Navbar from '../components/navbar'
import Card from '../components/card.js';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import '../index.css'

import CartContext from '../config/cartContext.js';
import QuanContext from '../config/quanContext.js';

import { notification } from 'antd';

import cartInc from '../function/cartInc';

export default function Home() {
    const [clothData, setClothData] = useState([])
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)

    const { category } = useParams()

    useEffect(() => {
        async function fetchDataFunc() {
            try {
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

    const [notificationApi, notificationContextHolder] = notification.useNotification();

    return (
        <div>
            <Navbar />

            {notificationContextHolder}
            <h1>1</h1>

            <div className='card-con'>
                {clothData.map((item, index) => (
                    <NavLink className="card-link" to={`/home/product/${item.clothID}`} key={index}>
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
                    </NavLink>
                ))}
            </div>

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
