import { createContext, useContext, memo, Context } from 'react';

export const mutationsContext = createContext<Record<string, (args?: any) => void>>({});
export const MutationsProvider = memo(mutationsContext.Provider);

export const actionsContext = createContext<Record<string, (args?: any) => Promise<any>>>({});
export const ActionsProvider = memo(actionsContext.Provider);

// this context holds the other contexts for each getter
export const gettersContext = createContext<Record<string, Context<any>>>({});
export const GettersProvider = memo(gettersContext.Provider);

export const useAction = <T, >(actionName: string) => {
  const actions = useContext(actionsContext);

  if (!actions[actionName]) {
    throw new Error(`Cannot find action: ${actionName}`)
  }

  return actions[actionName] as (args?: any) => Promise<T>;
}

export const useMutation = (mutationName: string) => {
  const mutations = useContext(mutationsContext);

  if (!mutations[mutationName]) {
    throw new Error(`Cannot find mutation: ${mutationName}`)
  }

  return mutations[mutationName];
}

export const useGetter = <T, >(getterName: string) => {
  const getters = useContext(gettersContext);

  if (!getters[getterName]) {
    throw new Error(`Cannot find getter: ${getterName}`)
  }

  const value = useContext<T>(getters[getterName])

  return value;
}