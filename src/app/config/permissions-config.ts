// User
export const readUserPermissions = [ 'user.read-from-own-merchant' ];
export const addUserPermissions = [ 'user.write-to-own-merchant', ];
export const editUserPermissions = [ 'user.write-to-own-merchant' ];

// terminals
export const readTerminalPermissions = [ 'terminal.read-from-own-merchant' ];
export const readTerminalFromOwnStorePermissions = [ 'terminal.read-from-own-store' ];

// terminals-configurations
export const readTerminalConfigurationsPermissions = [ 'terminal-config.read-from-own-merchant' ];
export const readTerminalConfigurationsFromOwnStorePermissions = [ 'terminal-config.read-from-own-store' ];
export const addTerminalConfigurationsPermissions = [ 'terminal-config.write-to-own-merchant' ];
export const editTerminalConfigurationsPermissions = [ 'terminal-config.write-to-own-merchant' ];

// merchants
export const readMerchantPermissions = [ 'merchant.read-from-own-merchant' ];

export const editLimitedMerchantPermissions = [ 'merchant.limited-write-to-own-merchant', ];
export const remoteControlMerchantPermissions = [ 'merchant.remote-control-all' ];

// stores
export const readStoresPermissions = [ 'store.read-from-own-merchant',];
export const readFromOwnStorePermissions = [ 'store.read-from-own-store',];
export const editLimitedStoresPermissions = [ 'store.limited-write-to-own-merchant' ];

// orders
export const readOrdersPermissions = [ 'order.all-operations-in-own-merchant', 'order.read-from-own-merchant','order.read-from-own-store', 'order.be-courier-in-own-merchant', 'order.be-courier-in-own-store'];

export const addOrdersPermissions = [ 'order.all-operations-in-own-merchant', 'order.create-in-own-merchant', 'order.create-in-own-store', ];
export const editOrdersPermissions = [ 'order.all-operations-in-own-merchant', 'order.modify-in-own-merchant', 'order.modify-in-own-store' ];

// products
export const readProductsPermissions = [ 'product.all-operations-in-own-merchant', 'product.read-from-own-merchant'];
export const addProductsPermissions = [ 'product.all-operations-in-own-merchant', 'product.write-to-own-merchant'];
export const editProductsPermissions = [ 'product.all-operations-in-own-merchant', 'product.write-to-own-merchant'];

// category of products
export const readCategoryPermissions = [ 'product-category.all-operations-in-own-merchant', 'product-category.read-from-own-merchant'];
export const addCategoryPermissions = [ 'product-category.all-operations-in-own-merchant', 'product-category.write-to-own-merchant'];
export const editCategoryPermissions = [ 'product-category.all-operations-in-own-merchant', 'product-category.write-to-own-merchant'];

// roles
export const readRolesPermissions = [ 'role.read-common-merchant-roles', 'role.read-from-own-merchant'];
export const addRolesPermissions = [ 'role.write-to-own-merchant'];
export const editRolesPermissions = [ 'role.write-to-own-merchant'];

//sales
export const readSalesPermissions = [ 'sale.read-from-own-merchant', 'sale.read-from-own-merchant-by-public-id', 'sale.read-from-own-store'];
export const addSalesPermissions = [ 'sale.write-to-own-merchant', 'sale.write-to-own-store'];
export const editSalesPermissions = [ 'sale.write-to-own-merchant', 'sale.write-to-own-store'];

// refund
export const readRefundsPermissions = [ 'refund.read-from-own-merchant', 'refund.read-from-own-store'];
export const addRefundsPermissions = [ 'refund.write-to-own-merchant', 'refund.write-to-own-store'];
export const editRefundsPermissions = [ 'refund.write-to-own-merchant', 'refund.write-to-own-store'];

// billing
export const readBillingPermissions = [ 'bill.read-from-own-merchant'];

// balance
export const readBalancePermissions = [ 'balance.read-from-own-merchant'];

// balance-payment
export const readBalancePaymentPermissions = [ 'balance-payment.read-from-own-merchant'];

// cash desks
export const readCashDesksPermissions = [ 'cash-desk.read-from-own-merchant', 'cash-desk.read-from-own-store'];
export const addCashDesksPermissions = [ 'cash-desk.write-to-own-store'];
export const editCashDesksPermissions = [ 'cash-desk.write-to-own-store'];

// cash desks operation
export const readCashDesksOperationPermissions = [ 'cash-desk-operation.read-from-own-merchant', 'cash-desk-operation.read-from-own-store'];
export const addCashDesksOperationPermissions = [ 'cash-desk-operation.write-to-own-store'];
export const editCashDesksOperationPermissions = [ 'cash-desk-operation.write-to-own-store'];

// retail product
export const readRetailProductPermissions = [ 'retail-product.all-operations-in-own-merchant', 'retail-product.read-from-own-merchant', 'retail-product.read-from-own-store'];
export const addRetailProductPermissions = [ 'retail-product.all-operations-in-own-merchant', 'retail-product.write-to-own-merchant', 'retail-product.write-to-own-store'];
export const editRetailProductPermissions = [ 'retail-product.all-operations-in-own-merchant', 'retail-product.write-to-own-merchant', 'retail-product.write-to-own-store'];

// z-reports
export const readZReportsPermissions = [ 'sale.read-from-own-merchant', 'sale.read-from-own-store', 'sale.write-to-own-store' ];

// advances
export const readAdvancesPermissions = [ 'advance.read-from-own-store', 'advance.read-from-own-merchant' ];
export const addAdvancesPermissions = [ 'advance.create-in-own-store' ];

// credits
export const readCreditsPermissions = [ 'credit.read-from-own-merchant', 'credit.read-from-own-store' ];
export const addCreditsPermissions = [ 'credit.create-in-own-store' ];
export const patchCreditsPermissions = [ 'credit.patch-in-own-merchant' ];

// handovers-records
export const readWorkingShiftsPermissions = [ 'working-shift.read-from-own-merchant', 'working-shift.read-from-own-store' ];
