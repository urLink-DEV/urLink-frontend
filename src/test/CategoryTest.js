import React from 'react';
import {getCategory,writeCategory,updateCategory,deleteCategory} from '../commons/category';

export default function CategoryTest() {
  getCategory({ })
    .then((response) => console.log(response))
    .catch((error) => console.dir(error))

  // writeCategory({ name: "react" })
  //   .then((response) => console.log(response))
  //   .catch((error) => console.dir(error))

  // updateCategory({ id: 13, name: "reactUpdate" })
  //   .then((response) => console.log(response))
  //   .catch((error) => console.dir(error))

  // deleteCategory({ id: 13 })
  //   .then((response) => console.log(response))
  //   .catch((error) => console.dir(error))

  return (
    <div>
      this is Category TEST PAGE
    </div>
  )
}