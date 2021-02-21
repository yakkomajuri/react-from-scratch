import { kea } from 'kea'
import { counterLogicType } from './counterLogicType'

export const counterLogic = kea<counterLogicType>({
    actions: {
        incrementCounter: true,
        decrementCounter: true,
        updateCounter: (newValue: number) => ({ newValue }),
    },
    reducers: {
        count: [
            0,
            {
                incrementCounter: (state) => state + 1,
                decrementCounter: (state) => state - 1,
                updateCounter: (_, { newValue }) => newValue,
            },
        ],
    },
})
