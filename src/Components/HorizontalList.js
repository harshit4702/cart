import React, {useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 200,
    margin: 6,
    padding: 2
  }
});
import '../App.css';



const HorizontalList = (props) => {

    
    const classes = useStyles();

    const [selected,setSelected]= useState('item1');

    const [menuItems, setMenuItems]= useState(null)

    useEffect(()=>{
        setMenuItems(Menu(props.products,selected));
    },[])

    const MenuItem = ({product, selected}) => {
        return <div
        className={`menu-item ${selected ? 'active' : ''}`}
        >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="160"
                    image={product.src[0]}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography  component="h2">
                    {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {product.price}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
        </div>;
    };
  

    const Menu = (list, selected) =>{
        console.log(selected);
        return list.map((item,key) => {
            return <MenuItem product={item} key={key} selected={selected} />
        });
    };
  
  
    const Arrow = ({ text, className }) => {
        return (
        <div
            className={className}
        >{text}</div>
        );
    };

    const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
    const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

    const onSelect= (key)=>{
        console.log(key);
        setSelected(key);
    }

    return (
        <div className="App" style={{width:'100vw',padding:'0',margin:'0'}}>
            <ScrollMenu
                data={menuItems}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                selected={selected}
                onSelect={onSelect}
            />
        </div>
    );
}

export default HorizontalList;