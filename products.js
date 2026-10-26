// Ceny w PLN. Każdy wariant ma własny identyfikator, kolor, cenę i grafikę.
const PRODUCTS = [
{id:'porsche-993',name:'993 Turbo RWB',fit:'Regular',type:'tee',design:'porsche-design',photo:'porsche-photo',sizes:['S','M','L','XL','XXL'],variants:[{id:'porsche-black',color:'Czarny',swatch:'#171717',price:149,image:'porsche'}]},
{id:'most-wanted-regular',design:'bmw-design',photo:'bmw-photo',name:'Most Wanted',fit:'Regular',type:'tee',sizes:['S','M','L','XL','XXL'],variants:[
{id:'black',color:'Czarny',swatch:'#171717',price:129,image:'black'},
{id:'white',color:'Biały',swatch:'#f2f2ed',price:129,image:'white'},
{id:'washed',color:'Sprany czarny',swatch:'#666666',price:149,image:'washed'}]},
{id:'most-wanted-oversize',design:'bmw-design',photo:'bmw-photo',name:'Most Wanted',fit:'Oversize',type:'tee',sizes:['S','M','L','XL'],variants:[
{id:'black-oversize',color:'Czarny',swatch:'#171717',price:149,image:'black-oversize'},
{id:'white-oversize',color:'Biały',swatch:'#f2f2ed',price:149,image:'white-oversize'},
{id:'washed-oversize',color:'Sprany czarny',swatch:'#666666',price:169,image:'washed-oversize'}]},
{id:'hoodie',design:'drive-design',photo:'drive-photo',name:'Drive After Dark',fit:'Regular',type:'hoodie',sizes:['S','M','L','XL','XXL'],variants:[{id:'hoodie',color:'Czarny',swatch:'#171717',price:249,image:'hoodie'}]},
{id:'wheel',design:'wheel-design',photo:'wheel-photo',name:'Night Ride',fit:'Regular',type:'tee',sizes:['S','M','L','XL','XXL'],variants:[{id:'wheel',color:'Czarny',swatch:'#171717',price:139,image:'wheel'}]}
];
