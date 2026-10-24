import { createSlice } from "@reduxjs/toolkit";

// Lấy dữ liệu giỏ hàng từ localStorage
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "{}");
  } catch (error) {
    return {};
  }
}

const cartSlice = createSlice({
  name: "cart",

  // Dữ liệu ban đầu
  initialState: {
    items: getCart(),
  },
  //   khởi tạo dữ liệu lấy dữ liệu từ localStorage

  // Những chức năng thay đổi dữ liệu giỏ hàng
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart(state, action) {
      // state dữ lieu hiện tại  mà reducer quản lý
      // action là đối tượng mô tả yêu cầu cập nhật, có thể kèm dữ liệu.
    //   payload là nơi chứa dữ liệu 
      const id = action.payload.id;
      // action.payload  chứa cái product truyền qua
      // state là dữ liệu hiện tai 

      if (state.items[id]) {
        state.items[id] += 1;
      } else {
        state.items[id] = 1;
      }
    },

    // Tăng hoặc giảm số lượng
    changeQuantity(state, action) {
      const id = action.payload.id;
      const value = action.payload.value;
    // value   giá trị khi tăng hay giảm số lượng sản phẩm

      if (state.items[id]) {
        state.items[id] += value;
      }

      if (state.items[id] < 1) {
        state.items[id] = 1;
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart(state, action) {
      const id = action.payload;

      delete state.items[id];
    },
  },
});

// Xuất các action để component sử dụng
export const { addToCart, changeQuantity, removeFromCart } = cartSlice.actions;

// Hàm lấy danh sách giỏ hàng
export const selectCartItems = (state) => state.cart.items;

// Hàm tính tổng số lượng sản phẩm
export const selectTotalCart = (state) => {
  return Object.values(state.cart.items).reduce(
    (total, quantity) => total + Number(quantity),
    0,
  );
};

export default cartSlice.reducer;
