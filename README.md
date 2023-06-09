## Delivery food.

## Реализованы следующие требования к функциональности

##### React

- Пишем функциональные компоненты c хуками в приоритете над классовыми :heavy_check_mark: (классовых неу)
- Есть четкое разделение на умные и глупые компоненты; :heavy_check_mark:
- Есть рендеринг списков - [Catalog](https://github.com/cxvint/delivery/blob/main/src/components/Catalog/Catalog.jsx) :heavy_check_mark:
- Реализована хотя бы одна форма - [Форма корзины](https://github.com/cxvint/delivery/blob/main/src/components/ModalDelivery/ModalDelivery.jsx) :heavy_check_mark:
- Есть применение Контекст API - нет
- Есть хотя бы один кастомный хук - вроде бы не делал...
- Хотя бы несколько компонентов используют PropTypes - есть [Catalog](https://github.com/cxvint/delivery/blob/main/src/components/Catalog/Catalog.jsx) :heavy_check_mark:
- Поиск не должен триггерить много запросов к серверу - не триггерит.
- Есть применение Suspense - [App](https://github.com/cxvint/delivery/blob/main/src/App.jsx) :heavy_check_mark:

##### Redux

- Используем Modern Redux with Redux Toolkit - использовал. Примеры: [store](https://github.com/cxvint/delivery/tree/main/src/store) :heavy_check_mark:
- Используем слайсы - [categorySlice](https://github.com/cxvint/delivery/blob/main/src/store/category/categorySlice.js),
  [formSlice](https://github.com/cxvint/delivery/blob/main/src/store/form/formSlice.js) :heavy_check_mark:
- Есть хотя бы одна кастомная мидлвара - есть [orderSlice](https://github.com/cxvint/delivery/blob/main/src/store/order/orderSlice.js) :heavy_check_mark:
- Используется RTK Query - нет
- Используется Transforming Responses - нет
