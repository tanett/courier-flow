// User
export const readUserPermissions = [ 'user.read-from-own-merchant' ];
export const addUserPermissions = [ 'user.write-to-own-merchant', ];
export const editUserPermissions = [ 'user.write-to-own-merchant' ];

// terminals
export const readTerminalPermissions = [ 'terminal.read-from-own-merchant' ];
export const readTerminalFromOwnStorePermissions = [ 'terminal.read-from-own-store' ];

// merchants
export const readMerchantPermissions = [ 'merchant.read-from-own-merchant' ];

export const editLimitedMerchantPermissions = [ 'merchant.limited-write-to-own-merchant', ];
export const remoteControlMerchantPermissions = [ 'merchant.remote-control-all' ];

// stores
export const readStoresPermissions = [ 'store.read-from-own-merchant',];
export const readFromOwnStorePermissions = [ 'store.read-from-own-store',];
export const editLimitedStoresPermissions = [ 'store.limited-write-to-own-merchant' ];

// orders
export const readOrdersPermissions = [ 'order.all-operations-in-own-merchant', 'order.read-from-own-merchant','order.read-from-own-store'];

export const addOrdersPermissions = [ 'order.all-operations-in-own-merchant', 'order.write-to-own-merchant', 'order.create-in-own-merchant', 'order.create-in-own-store' ];
export const editOrdersPermissions = [ 'order.all-operations-in-own-merchant', 'order.write-to-own-merchant', ];

// products
export const readProductsPermissions = [ 'product.all-operations-in-own-merchant', 'product.read-from-own-merchant'];
export const addProductsPermissions = [ 'product.all-operations-in-own-merchant', 'product.write-to-own-merchant'];
export const editProductsPermissions = [ 'product.all-operations-in-own-merchant', 'product.write-to-own-merchant'];

// category of products

export const readCategoryPermissions = [ 'product-category.all-operations-in-own-merchant', 'product-category.read-from-own-merchant'];
export const addCategoryPermissions = [ 'product-category.all-operations-in-own-merchant', 'product-category.write-to-own-merchant'];
export const editCategoryPermissions = [ 'product-category.all-operations-in-own-merchant', 'product-category.write-to-own-merchant'];

// todo add cash desk , billing, refund, sales, retail-product, roles
