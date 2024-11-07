import Entity, { PrimitivesProps, Props } from "../domain/Entity";
import Criteria from "../domain/criteria/Criteria";

export default interface Repository<E extends Entity<PrimitivesProps, Props>> {
    get(id: Props): Promise<E | null>;
    search(criteria: Criteria): Promise<E[]>;
    save(props: Props): Promise<void>;
    delete(id: Props): Promise<void>;
}
