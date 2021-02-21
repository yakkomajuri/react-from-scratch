// Auto-generated with kea-typegen. DO NOT EDIT!

import { Logic } from 'kea'

export interface counterLogicType extends Logic {
    actionCreators: {
        incrementCounter: () => {
            type: 'increment counter (src.components.Counter.counterLogic)'
            payload: {
                value: boolean
            }
        }
        decrementCounter: () => {
            type: 'decrement counter (src.components.Counter.counterLogic)'
            payload: {
                value: boolean
            }
        }
        updateCounter: (
            newValue: number
        ) => {
            type: 'update counter (src.components.Counter.counterLogic)'
            payload: {
                newValue: number
            }
        }
    }
    actionKeys: {
        'increment counter (src.components.Counter.counterLogic)': 'incrementCounter'
        'decrement counter (src.components.Counter.counterLogic)': 'decrementCounter'
        'update counter (src.components.Counter.counterLogic)': 'updateCounter'
    }
    actionTypes: {
        incrementCounter: 'increment counter (src.components.Counter.counterLogic)'
        decrementCounter: 'decrement counter (src.components.Counter.counterLogic)'
        updateCounter: 'update counter (src.components.Counter.counterLogic)'
    }
    actions: {
        incrementCounter: () => void
        decrementCounter: () => void
        updateCounter: (newValue: number) => void
    }
    constants: {}
    defaults: {
        count: number
    }
    events: {}
    key: undefined
    listeners: {}
    path: ['src', 'components', 'Counter', 'counterLogic']
    pathString: 'src.components.Counter.counterLogic'
    props: Record<string, unknown>
    reducer: (
        state: any,
        action: () => any,
        fullState: any
    ) => {
        count: number
    }
    reducerOptions: {}
    reducers: {
        count: (state: number, action: any, fullState: any) => number
    }
    selector: (
        state: any
    ) => {
        count: number
    }
    selectors: {
        count: (state: any, props?: any) => number
    }
    sharedListeners: {}
    values: {
        count: number
    }
    _isKea: true
    _isKeaWithKey: false
}
