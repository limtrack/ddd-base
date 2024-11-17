import Filter from "./Filter";

export enum FiltersCondition {
    AND = "AND",
    OR = "OR",
}

export default class Filters {
    readonly condition: FiltersCondition;
    readonly filters: Filter[];

    constructor(filters: Filter[], condition: FiltersCondition = FiltersCondition.AND) {
        this.filters = filters;
        this.condition = condition;
    }

    static fromValues(filters: Array<Map<string, string>>, condition?: FiltersCondition): Filters {
        return new Filters(filters.map(Filter.fromValues), condition);
    }

    static none(): Filters {
        return new Filters([]);
    }
}