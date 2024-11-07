export default abstract class UseCase<R = void, Args extends unknown[] = []> {
    public abstract run(...args: Args): R | Promise<R>;
}
