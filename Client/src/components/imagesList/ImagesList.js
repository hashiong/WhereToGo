import * as React from 'react';
import { useEffect, useState } from "react"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';

// let d = new Date()
// let day = d.getDate()
// day = day <= 9 ? '0' + day : day;
// let month = d.getMonth()
// month = month <= 9 ? '0' + month : month;
// let date = d.getFullYear().toString() + month.toString() + day.toString()



// function srcset(image, size, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${
//       size * rows
//     }&fit=crop&auto=format&dpr=2 2x`,
//   };
// }


export default function ImagesList() {
  const [itemData, setItemData] = useState([])
  const updateData = async () =>{
    axios.get('http://localhost:3001/api/updateinfo').then((response) => {
      console.log(response.data)
    })
  }
  const getData = async () =>{
    axios.get('http://localhost:3001/api/getinfo').then((response) => {
      setItemData(response.data)
    })
  }
  
  useEffect(() => {
    updateData().then((res) => getData())
    return () => {
      console.log("Data Retrieved")
    }},[]
  );
  
  
  
  return (
    <ImageList sx={{ width: '100%', height: '100%' }}>
      {/* <ImageList
      variant="quilted"
      cols={4}
      rowHeight={'auto'}
    > */}
      {itemData.map((item) => (
        <ImageListItem key={item.img} 
        sx = {{
          opacity: '.8',
          transition: 'opacity .3s linear',
          cursor: 'pointer',
          '&:hover': {opacity:1}
        }}
        onClick = {() => window.location.href = item.url}>
          
          {/* <Link href = {item.url}> */}
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.city}
            loading="lazy"
          />
          {/* </Link> */}
        </ImageListItem>
      ))}
    </ImageList>

    
  );
}





// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     redirect: '#'
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     redirect: '#'
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//     author: '@arwinneil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//   },
//   {img: "https://www.visitdenmark.com/sites/visitdenmark.com/files/styles/tile_big/public/2019-03/Nyhavn%20K%C3%B8benhavn_43397.jpg?h=266c594a&itok=-iDx-KS3",
//     titile: 'place'
//   },
//   {img: "https://upload.wikimedia.org/wikipedia/commons/3/32/20190616154621%21Echo_Park_Lake_with_Downtown_Los_Angeles_Skyline.jpg"}
// ];
