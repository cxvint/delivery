## Delivery food.

## Реализованы следующие требования к функциональности

##### React

- Пишем функциональные компоненты c хуками в приоритете над классовыми :heavy_check_mark:
- Есть разделение на умные и глупые компоненты; :heavy_check_mark:
- Есть рендеринг списков - [Catalog](https://github.com/cxvint/delivery/blob/main/src/components/Catalog/Catalog.jsx) :heavy_check_mark:
- Реализована хотя бы одна форма - [Форма заказа](https://github.com/cxvint/delivery/blob/main/src/components/ModalDelivery/ModalDelivery.jsx) :heavy_check_mark:
- Есть применение Контекст API - [тёмная тема в Header](https://github.com/cxvint/delivery/blob/main/src/components/Header/Header.jsx)
- Есть применение предохранителя - [ErrorBoundary](https://github.com/cxvint/delivery/blob/main/src/components/ErrorBoundary/ErrorBoundary.jsx)
- Есть хотя бы один кастомный хук - [useLogin](https://github.com/cxvint/delivery/blob/main/src/components/Login/useLogin.jsx)
- Хотя бы несколько компонентов используют PropTypes - есть [Order](https://github.com/cxvint/delivery/blob/main/src/components/Order/Order.jsx)
  [OrderGoods](https://github.com/cxvint/delivery/blob/main/src/components/OrderGoods/OrderGoods.jsx) :heavy_check_mark:
- Поиск не должен триггерить много запросов к серверу - не триггерит.
- Есть применение Suspense + Lazy - [App](https://github.com/cxvint/delivery/blob/main/src/App.jsx) :heavy_check_mark:

##### Redux

- Используем Modern Redux with Redux Toolkit - использовал. Примеры: [store](https://github.com/cxvint/delivery/tree/main/src/store) :heavy_check_mark:
- Используем слайсы - [categorySlice](https://github.com/cxvint/delivery/blob/main/src/store/category/categorySlice.js),
  [formSlice](https://github.com/cxvint/delivery/blob/main/src/store/form/formSlice.js) :heavy_check_mark:
- Есть хотя бы одна кастомная мидлвара - есть [orderSlice](https://github.com/cxvint/delivery/blob/main/src/store/order/orderSlice.js) :heavy_check_mark:
- Используется RTK Query - [productApi](https://github.com/cxvint/delivery/blob/main/src/store/product/productApi.js)
- Используется нормализованная структура стейта (createEntityAdapter). - [productSlice](https://github.com/cxvint/delivery/blob/main/src/store/product/productSlice.js)

##### Backend
-написан сервер [index.js](https://github.com/cxvint/api_delivery/blob/main/index.js)