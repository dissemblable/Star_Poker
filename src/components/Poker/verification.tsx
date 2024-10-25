export const repeatIn = (arr: number[], nFactor: number) => {
    if (nFactor === 1 && arr.length > 1) {
      return true;
    }
  
    const letterMap = arr.reduce<Record<string, number>>((acc, next) => {
      if (!acc[next]) {
        return { ...acc, [next]: 1 };
      }
      return { ...acc, [next]: acc[next] + 1 };
    }, {});
  
    return Object.keys(letterMap).some((k) => {
      return letterMap[k] >= nFactor;
    });
};