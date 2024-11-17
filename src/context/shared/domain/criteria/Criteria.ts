import Filters from "./Filters";
import Order from "./Order";

export default class Criteria {
    readonly filters: Filters[];
    readonly order?: Order;
    readonly limit?: number;
    readonly offset?: number;

    constructor(filters: Filters[], order?: Order, limit?: number, offset?: number) {
        this.filters = filters;
        this.order = order;
        this.limit = limit;
        this.offset = offset;
    }

    public hasFilters(): boolean {
        return Array.isArray(this.filters) &&
            Array.isArray(this.filters[0].filters) &&
            this.filters[0].filters.length > 0;
    }
}