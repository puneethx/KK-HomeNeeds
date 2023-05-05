import React from 'react'
import { urlFor,client } from '../../../lib/client';

const ProductDetails = ({ product, products }) => { 
    const { image, name, details, price } = product;
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image [0])} className='product-detail-image'/>
                </div>
            </div>
        </div>
    </div>
  )
}


export const getStaticPaths = async () => {
    //get all data from product but only show current slug property
    const query = `*[_type == "product"] {
        slug {current}
    }`;
    
    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    //As we are using getStaticProps we have to use fallback blocking
    return{
        paths,
        fallback: 'blocking'
    }
}


export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

    const productQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productQuery);
    
    console.log(product);
    return{
      props: { products, product}
    }
  }

export default ProductDetails