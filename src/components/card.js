import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Carousel } from 'antd';
import { Fade } from 'react-awesome-reveal';

const DisplayCard = ({ AddCartFunc, clothStatus, clothImg, clothTitle, clothPrice, clothImgHover, onCardClick, showBtn }) => {
    let [isHovered, setisHovered] = useState(null)
    const imgSrc = isHovered ? clothImgHover : clothImg

    function imgHovered() {
        setisHovered(true)
    }

    function imgNotHovered() {
        setisHovered(false)
    }

    return (
        // <Fade cascade>
            <Card className='card' onClick={onCardClick}>
                {/* IMAGE */}
                <Carousel autoplay>
                    <div onMouseEnter={imgHovered} onMouseLeave={imgNotHovered}>
                        <img src={imgSrc} alt={clothTitle} className={`card-img`} />
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
        // </Fade>
    )
};

export default DisplayCard