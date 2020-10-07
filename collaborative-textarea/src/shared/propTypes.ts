import { PropType } from 'vue';

export function getObjectType<propType>(defaultValue: any) {
    return {
        type: Object as PropType<propType>,
        default() { return defaultValue; }
    }
}

export function getBooleanType(defaultValue: boolean) {
    return {
        type: Boolean,
        default() { return defaultValue; }
    }
}

export function getStringType(defaultValue: string) {
    return {
        type: String,
        default() { return defaultValue; }
    }
}

export function getNumberType(defaultValue: number) {
    return {
        type: Number,
        default() { return defaultValue; }
    }
}