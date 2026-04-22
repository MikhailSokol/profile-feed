const toNumber = (value: string | undefined, defaultValue: number) => {
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
};

export const ACCESS_TTL = toNumber(process.env.JWT_ACCESS_TTL, 900);
export const REFRESH_TTL = toNumber(process.env.JWT_REFRESH_TTL, 604800);
