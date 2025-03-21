export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" "); // Trim spaces and split by multiple spaces
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    // Fixed syntax error
    initials += words[i][0];
  }

  return initials.toUpperCase(); // Fixed incorrect method name
};
