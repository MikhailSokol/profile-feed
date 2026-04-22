const MAX_SIZE_MB = 5;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const validateFile = (file: File) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `Неподдерживаемый формат: ${file.type}`;
  }

  if (file.size > MAX_SIZE) {
    return `Файл слишком большой (макс ${MAX_SIZE_MB}MB)`;
  }

  return null;
};
