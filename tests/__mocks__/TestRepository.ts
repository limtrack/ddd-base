import Repository from "../../src/context/shared/infrastructure/Repository";
import TestEntity from "./TestEntity";
import Criteria from "../../src/context/shared/domain/criteria/Criteria";

export default class TestRepository implements Repository<TestEntity> {
    public readonly data: TestEntity[] = [
        TestEntity.fromPrimitives({ id: 1, name: "Test 1" }),
        TestEntity.fromPrimitives({ id: 2, name: "Test 2" }),
        TestEntity.fromPrimitives({ id: 3, name: "Test 3" }),
    ];
    
    public async get(criteria: Criteria): Promise<TestEntity | null> {
        return this.data[0];
    }

    public async getAll(criteria: Criteria): Promise<TestEntity[]> {
        return this.data[0];
    }

    public async create(entity: TestEntity): Promise<void> {
        this.data.push(entity);
    }

    public async update(entity: TestEntity): Promise<void> {
        const entityIndex = this.data.findIndex((e) => e.props.id.equals(entity.props.id));

        if(entityIndex > -1) {
            this.data[entityIndex] = entity;
        }
    }

    public async delete(criteria: Criteria): Promise<void> {
        return;
    }

    public async deleteAll(criteria: Criteria): Promise<void> {
        // const entityIndex = this.data.filter((e) => e.props.id.equals(entity.props.id));
    }
}