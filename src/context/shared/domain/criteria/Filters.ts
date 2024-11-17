import Filter from "./Filter";

export enum FilterCondition {
    AND = "AND",
    OR = "OR",
}

export default class Filters {
    readonly condition: FilterCondition;
    readonly filters: Filter[];

    constructor(filters: Filter[], condition: FilterCondition = FilterCondition.AND) {
        this.filters = filters;
        this.condition = condition;
    }

    static fromValues(filters: Array<Map<string, string>>, condition?: FilterCondition): Filters {
        return new Filters(filters.map(Filter.fromValues), condition);
    }

    static none(): Filters {
        return new Filters([]);
    }
}