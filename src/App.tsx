import React from 'react'
import { hot } from 'react-hot-loader/root'
import { MyJSComponent } from './components/MyJSComponent'
import { Counter } from './components/Counter'

export const App = hot(_App)
export function _App(): JSX.Element | null {
    return (
        <div>
            <h1>Hello world!</h1>
            <MyJSComponent />
            <Counter />
        </div>
    )
}
