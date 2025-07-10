export let navigate: (path: string) => void;

export const setNavigate = (navFunction: (path: string) => void) => {
  navigate = navFunction;
};
