export const summaryParser = (summary: string) => {
  return summary.replace(/(<([^>]+)>)/gi, '');
};
