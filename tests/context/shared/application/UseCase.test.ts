import UseCase from '../../../../src/context/shared/application/UseCase';
import { jest } from '@jest/globals';

class TestUseCase extends UseCase<string, [string]> {
    public run(arg: string): string {
        return `Hello, ${arg}`;
    }
}

class TestUseCaseVoid extends UseCase {
    public run(): void {
        const a = 1;
        const b = 2;
        const c = a + b;
    }
}

describe('UseCase', () => {
    it('no provided any argument, return void', () => {
        const useCase = new TestUseCaseVoid();
        const spyOnRun = jest.spyOn(useCase, "run");
        useCase.run();
        expect(spyOnRun).toHaveBeenCalled();
    });

    it('should return a string with the provided argument', () => {
        const useCase = new TestUseCase();
        const result = useCase.run('World');
        expect(result).toBe('Hello, World');
    });

    it('should handle promises correctly', async () => {
        class AsyncTestUseCase extends UseCase<Promise<string>, [string]> {
            public async run(arg: string): Promise<string> {
                return `Hello, ${arg}`;
            }
        }

        const useCase = new AsyncTestUseCase();
        const result = await useCase.run('Async World');
        expect(result).toBe('Hello, Async World');
    });
});