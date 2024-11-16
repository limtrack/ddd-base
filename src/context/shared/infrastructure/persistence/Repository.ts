import Entity, { PrimitivesProps, Props } from "../../domain/Entity";
import Criteria from "../../domain/criteria/Criteria";

export default interface Repository<E extends Entity<PrimitivesProps, Props>> {
    get(criteria: Criteria): Promise<E | null>;
    getAll(criteria: Criteria): Promise<E[]>;
    create(entity: E): Promise<void>;
    update(entity: E): Promise<void>;
    delete(criteria: Criteria): Promise<void>;
    deleteAll(criteria: Criteria): Promise<void>;
}
