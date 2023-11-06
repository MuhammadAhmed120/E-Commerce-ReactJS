import { useState, useContext, useRef, useEffect } from 'react';
import Navbar from '../components/navbar'
import Card from '../components/card.js';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import '../index.css'

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { GrSort } from 'react-icons/gr'

import CartContext from '../config/cartContext.js';
import QuanContext from '../config/quanContext.js';

import { notification } from 'antd';

import cartInc from '../function/cartInc';

export default function Home() {
    const [clothData, setClothData] = useState([])
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const [sorting, setSorting] = useState('featured');
    const [loader, setLoader] = useState(false)
    const { category } = useParams()
    const [position, setPosition] = useState("static")
    const con = useRef(null)


    useEffect(() => {
        async function fetchDataFunc() {
            try {
                setLoader(false)
                if (category) {
                    const fetchData = await axios.get(`http://localhost:3001/home/${category}`)
                    return setClothData(fetchData.data.cloth)
                    setLoader(true)
                } else {
                    const fetchData = await axios.get(`http://localhost:3001/home`)
                    return setClothData(fetchData.data.cloth)
                    setLoader(true)
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
            if (window.scrollY >= 110) {
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
            <Navbar position={position} />

            {notificationContextHolder}

            <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 0 }} className={`${isSticky ? 'pos-mar' : ''}`}>
                {/* <p style={{ color: '#000', margin: 0, fontSize: 28, fontWeight: 500, width: "fit-content", borderBottom: "2px solid #2c69eb" }}>Products{category ? ` / ${category.toUpperCase()}` : ''}</p> */}
                <p style={{ color: '#000', margin: 0, fontSize: 28, fontWeight: 500, width: "fit-content", borderBottom: "2px solid #2c69eb" }}>Products</p>
            </div>


            <div className='home-sort-con'>
                {/* <p style={{ color: '#000', margin: 0, fontSize: 20 }}>{sorting.split("_").join(" ").toUpperCase()}</p> */}
                {/* <div>
                    <p style={{ color: '#000', margin: 0, fontSize: 20 }}>{category ? ` / ${category.toUpperCase()}` : ''} {`(${sorting.split("_").join(" ").toUpperCase()})`}</p>
                </div> */}
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
                    {/* <GrSort size={20} /> */}
                </div>
            </div>


            {
                loader ?
                    <div className='card-con' ref={con}>
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
                    : <span className='loader'>FLEXUS</span>
            }


        </div>
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
