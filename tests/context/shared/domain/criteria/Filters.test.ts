import Filters from "../../../../../src/context/shared/domain/criteria/Filters";

describe("Filters", () => {
    describe("none", () => {
        it("should return an instance of Filters with an empty array", () => {
            const filters = Filters.none();
            expect(filters).toBeInstanceOf(Filters);
            expect(filters.filters).toEqual([]);
        });
    });
});