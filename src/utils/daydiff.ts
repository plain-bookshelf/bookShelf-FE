export const getDayDiff = (targetDate: string) => {
    const now = new Date();
    const dueDate = new Date(targetDate);

    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };