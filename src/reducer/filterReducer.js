const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":


      // 1way
      // console.log(Math.max.apply(null, priceArr));

      // let maxPrice = priceArr.reduce(
      //   (initialVal, curVal) => Math.max(initialVal, curVal),
      //   0
      // );
      // console.log(
      //   "🚀 ~ file: filterReducer.js ~ line 16 ~ filterReducer ~ maxPrice",
      //   maxPrice
      // );



      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters },
      };

    case "GET_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
      return {
        ...state,
        sorting_value: action.payload,
      };

    // case "SORTING_PRODUCTS":
    //   let newSortData;
    //   // let tempSortProduct = [...action.payload];

    //   const { filter_products, sorting_value } = state;
    //   let tempSortProduct = [...filter_products];

    //   const sortingProducts = (a, b) => {
    //     if (sorting_value === "lowest") {
    //       return a.price - b.price;
    //     }

    //     if (sorting_value === "highest") {
    //       return b.price - a.price;
    //     }

    //     if (sorting_value === "a-z") {
    //       return a.name.localeCompare(b.name);
    //     }

    //     if (sorting_value === "z-a") {
    //       return b.name.localeCompare(a.name);
    //     }
    //   };

    //   newSortData = tempSortProduct.sort(sortingProducts);

    //   return {
    //     ...state,
    //     filter_products: newSortData,
    //   };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];
      console.log("filtered",tempFilterProduct);
      const { text, city, province, land_size, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        });
      }

      if (city !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.city.toLowerCase() === city.toLowerCase()
        );
      }

      if (province !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.province.toLowerCase() === province.toLowerCase()
        );
      }

      if (land_size !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.land_size.toLowerCase() === land_size.toLowerCase()
        );
      }
      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          city: "all",
          province: "all",
          land_size: "all"
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
