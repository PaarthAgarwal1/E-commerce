import React, {memo} from 'react';
import Product from './product';

function ProductList({ products }){
  return(
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(function (item){
        return(
          <Product key={item.id} {...item}/>
        );
      })}
    </div>
  );
}
export default memo(ProductList);