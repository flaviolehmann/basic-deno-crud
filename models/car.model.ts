import Resource from './resource.model.ts';

export default interface Car extends Resource {
    model: string;
    year: number;
}
