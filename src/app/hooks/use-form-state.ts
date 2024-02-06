import { useState } from "react"
import { FormState } from "../utils"

export const useFormState = (initialState = FormState.INITIAL) => {
  const [state, setState] = useState(initialState)

  const update = (state: FormState, callback?: Function) => {
    setState(state)

    if (state !== FormState.INITIAL && state !== FormState.LOADING) {
      setTimeout(() => {
        setState(FormState.INITIAL)
        callback?.()
      }, 5000)
    }
  }

  return [state, update] as const
}