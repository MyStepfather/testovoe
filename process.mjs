
// Не удалось быстро написать алгоритм перебора комбинаций для masterSize объектов,
// который бы позволил найти оптимальную выдачу товаров с упущением на желаемый размер.

const mockStore = [
    { size: 1, quantity: 1 },
    { size: 2, quantity: 2 },
    { size: 3, quantity: 1 },
];
const mockOrder = [
    { id: 100, size: [1] },
    { id: 101, size: [2] },
    { id: 102, size: [2, 3], masterSize: "s1" },
    { id: 103, size: [1, 2], masterSize: "s2" },
];
export const process = (store, order) => {
    const storeMap = makeHashmapFromStore(store);
    const stats = [];
    const assignment = [];
    let mismatches = 0;
    const sortedOrder = order.sort((a, b) => a.size.length - b.size.length);
    for (const orderItem of sortedOrder) {
        const result = processOrder(orderItem, storeMap, stats, assignment);
        if (result === false) {
            console.log("Невозможно выполнить заказ");
            return false;
        }
        mismatches += result.mismatch;
    }
    return {
        stats: stats.sort((a, b) => a.size - b.size),
        assignment,
        mismatches,
    };
};

// function check(store, order) {
//     let combinations = [];
//     let index = 0;
//     function generateCombinations(orders) {
//         const length = orders.length;
//         const totalCombinations = Math.pow(2, length); // 2^n
//         for (let i = 0; i < totalCombinations; i++) {
//             const newStore = new Map(store);
//             const stats = [];
//             const assignment = [];
//             const combination = orders.map((order, orderIndex) => {
//                 return Object.assign(Object.assign({}, order), { size: i & (1 << orderIndex) ? [order.size[1], order.size[0]] : order.size });
//             });
//             combinations.push(combination);
//             let mismatchesForCombination = 0;
//             let isValid = true;
//             for (const order of combination) {
//                 const result = processOrder(order, newStore, stats, assignment);
//                 if (result === false) {
//                     isValid = false;
//                     break;
//                 }
//                 mismatchesForCombination += result.mismatch;
//             }
//             if (isValid) {
//                 return mismatchesForCombination;
//             }
//         }
//         return false;
//     }
//     return generateCombinations(order);
// }
function processOrder(orderItem, store, stats, assignment) {
    if (orderItem.size.length === 1) {
        const size = orderItem.size[0];
        return handleSingleSizeOrder(size, orderItem.id, store, stats, assignment) ? { mismatch: 0 } : false;
    }
    if ("masterSize" in orderItem) {
        return handleMasterSizeOrder(orderItem, store, stats, assignment);
    }
    return false;
}
function handleSingleSizeOrder(size, id, store, stats, assignment) {
    if (checkAvailability(store, size)) {
        statsAdding(stats, size);
        assignmentAdding(assignment, id, size);
        storeRemoving(store, size);
        return true;
    }
    return false;
}
function handleMasterSizeOrder(orderItem, store, stats, assignment) {
    const index = orderItem.masterSize === "s1" ? 0 : 1;
    const primarySize = orderItem.size[index];
    const fallbackSize = orderItem.size[1 - index];
    if (handleSingleSizeOrder(primarySize, orderItem.id, store, stats, assignment)) {
        return { mismatch: 0 };
    }
    if (handleSingleSizeOrder(fallbackSize, orderItem.id, store, stats, assignment)) {
        return { mismatch: 1 };
    }
    return false;
}
function statsAdding(stats, size) {
    const existingItem = stats.find((item) => item.size === size);
    if (!existingItem) {
        stats.push({ size, quantity: 1 });
    }
    else {
        existingItem.quantity += 1;
    }
}
function assignmentAdding(assignment, id, size) {
    assignment.push({ id, size });
}
function storeRemoving(store, size) {
    const currentQuantity = store.get(size);
    if (currentQuantity) {
        if (currentQuantity > 1) {
            store.set(size, currentQuantity - 1);
        }
        else {
            store.delete(size);
        }
    }
    else {
        throw new Error("Ошибка удаления. Размер отсутствует на складе");
    }
}
function checkAvailability(store, size) {
    return store.has(size);
}
function makeHashmapFromStore(store) {
    return new Map(store.map((item) => [item.size, item.quantity]));
}
