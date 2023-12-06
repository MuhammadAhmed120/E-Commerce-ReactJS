import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Carousel } from 'antd';

const DisplayCard = ({ AddCartFunc, clothStatus, clothImg, clothTitle, clothPrice, clothImgHover, onCardClick, showBtn }) => {
    let [isHovered, setisHovered] = useState(null)
    // const imgSrc = isHovered ? clothImgHover : clothImg
    const imgSrc = clothImg

    function imgHovered() {
        setisHovered(true)
    }

    function imgNotHovered() {
        setisHovered(false)
    }

    return (
        <Card className='card' onClick={onCardClick}>
            {/* IMAGE */}
            <Carousel autoplay>
                <div onMouseEnter={imgHovered} onMouseLeave={imgNotHovered}>
                    {/* <img src={`http://localhost:3001/images/${imgSrc}`} alt={clothTitle} className={`card-img`} /> */}
                    {/* <img src={`https://essentialworkwear.com/wp-content/uploads/drummer-sky-blue-300x300.jpg`} alt={clothTitle} className={`card-img`} /> */}
                    <img src={require('../newpic.png')} alt={clothTitle} className={`card-img`} />
                </div>
            </Carousel>

            {/* BADGE */}
            <div className={`cloth-status ${clothStatus === 'In Stock' ? `status-clr` : `out-status-clr`}`}>{clothStatus}</div>

            {/* CARD CONTENT */}
            <CardContent className='card-det-con' style={{ marginBottom: -25 }}>
                <Typography
                    className='cloth-title' gutterBottom variant="h5" component="div">
                    {clothTitle}
                </Typography>
                <CardActions className='price-add-con'>
                    <Typography
                        variant="p"
                        className='price-con'>
                        RS {clothPrice}
                    </Typography>
                    {showBtn && <Button
                        className={`add-button ${clothStatus !== 'In Stock' ? `btn-disabled` : ``}`}
                        variant="outlined"
                        size="small"
                        onClick={AddCartFunc}
                    >ADD TO CART</Button>}
                </CardActions>
            </CardContent>
        </Card >
    )
};

export default DisplayCard