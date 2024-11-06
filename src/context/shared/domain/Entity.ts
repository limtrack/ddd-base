import EntityError from "./error/EntityError";
import ValueObject from "./value-object/ValueObject";
import { Primitives } from "./value-object/ValueObject";

export interface PrimitivesProps {
    [key: string]: Primitives | null | object;
}

export interface Props {
    [key: string]: ValueObject<Primitives | object>;
}

export default class Entity<PP extends PrimitivesProps, P extends Props> {

    private props: P

    protected constructor(props: P) {
        this.props = props
    }

    public static async fromPrimitives<E, PP>(props: PP): Promise<E>;
    public static fromPrimitives<E, PP>(props: PP): E;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static fromPrimitives<E, PP>(props: PP): E | Promise<E> {
        throw new EntityError("<fromPrimitives> method must be implemented")
    }

    public toPrimitives(): PP {
        return Object
            .entries(this.props)
            .reduce((acc, [key, value]) => {
                acc[key as keyof PP] = value.value as PP[keyof PP]
                return acc
            }, {} as PP);
    }
}
