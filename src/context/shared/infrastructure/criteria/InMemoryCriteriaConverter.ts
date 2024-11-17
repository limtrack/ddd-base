import { flow } from "lodash";
import Criteria from "../../domain/criteria/Criteria";
import Filter from "../../domain/criteria/Filter";
import Filters, { FilterCondition } from "../../domain/criteria/Filters";
import Order from "../../domain/criteria/Order";
import { OrderTypes } from "../../domain/criteria/OrderType";
import { Operator } from "../../domain/criteria/FilterOperator";

interface InMemoryData {
    [key: string]: string | number | string[] | number[];
};
type InMemoryFilter = (item: InMemoryData) => boolean;

type InMemoryFilters = {
    condition: FilterCondition
    filters: InMemoryFilter[];
};

type InMemoryFunction = (data: InMemoryData[]) => InMemoryData[];

interface TransformerFunction<F, FT> {
  (value: F): FT;
}

export default class InMemoryCriteriaConverter {
    private filterTransformers: Map<Operator, TransformerFunction<Filter, InMemoryFilter>>;

    constructor() {
        this.filterTransformers = new Map<Operator, TransformerFunction<Filter, InMemoryFilter>>([
            [Operator.EQUAL, this.equalFilter],
            [Operator.NOT_EQUAL, this.notEqualFilter],
            [Operator.GT, this.greaterThanFilter],
            [Operator.LT, this.lowerThanFilter],
            [Operator.CONTAINS, this.containsFilter],
        ]);
    }

    public convert(criteria: Criteria): InMemoryFunction {
        const functionsForFlow = [this.filterDataArray(criteria.filters)];

        if (criteria.order) {
            functionsForFlow.push(this.orderDataArray(criteria.order));
        }

        if (criteria.offset && criteria.limit) {
            functionsForFlow.push(this.subDataArray(criteria.offset, criteria.limit));
        }

        return flow(functionsForFlow);
    }

    private filterDataArray(filters: Filters[]): InMemoryFunction {
        const inMemoryFilters: InMemoryFilters[] = [];

        filters.forEach((currentfilters, index) => {
            inMemoryFilters[index] = {
                condition: currentfilters.condition,
                filters: currentfilters.filters.map(filter => {
                    const transformer = this.filterTransformers.get(filter.operator.value);
                
                    if (!transformer) {
                        throw Error(`Unexpected operator value ${filter.operator.value}`);
                    }
                
                    return transformer(filter);
                })
            }
        });

        return (data: InMemoryData[]): InMemoryData[] => {
            return data.filter((item) => {
                return inMemoryFilters.every(({ condition, filters }) => {
                    return condition === FilterCondition.AND
                        ? filters.every((filter) => filter(item))
                        : filters.some((filter) => filter(item));
                });
            });
        }
    }

    private orderDataArray(order: Order): InMemoryFunction {
        const { orderBy, orderType } = order;
        const key = orderBy.value as keyof InMemoryData;
        const type = orderType.value;

        return (data: InMemoryData[]): InMemoryData[] => {
            return data.sort((a, b) => {
                if (a[key] < b[key]) {
                    return type === OrderTypes.ASC ? -1 : 1;
                }
                
                if (a[key] > b[key]) {
                    return type === OrderTypes.ASC ? 1 : -1;
                }

                return 0;
            });
        }
    }

    private subDataArray(offset: number, limit: number): InMemoryFunction {
        return (data: InMemoryData[]): InMemoryData[] => {
            return data.slice(offset, offset + limit);
        }
    }

    private equalFilter(filter: Filter): InMemoryFilter {
        const field = filter.field.value;
        const value = filter.value.value;
        return (item: InMemoryData) => item[field] === value;
    }

    private notEqualFilter(filter: Filter): InMemoryFilter {
        const field = filter.field.value;
        const value = filter.value.value;
        return (item: InMemoryData) => item[field] !== value;
    }

    private greaterThanFilter(filter: Filter): InMemoryFilter {
        const field = filter.field.value;
        const value = filter.value.value;
        return (item: InMemoryData) => item[field] > value;
    }

    private lowerThanFilter(filter: Filter): InMemoryFilter {
        const field = filter.field.value;
        const value = filter.value.value;
        return (item: InMemoryData) => item[field] < value;
    }

    private containsFilter(filter: Filter): InMemoryFilter {
        const field = filter.field.value;
        const value = filter.value.value;
        return (item: InMemoryData) => { 
            return Array.isArray(item[field])
                ? (item[field] as (string | number)[]).includes(value as string | number)
                : String(item[field]).includes(String(value));
        }
    }
}