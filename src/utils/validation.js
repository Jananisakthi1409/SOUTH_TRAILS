export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());

export const isPhone = (value) => String(value || "").replace(/\D/g, "").length >= 10;

export const required = (value) => Boolean(String(value || "").trim());

export const validateLoginForm = ({ email, password }) => {
  if (!required(email)) return "Email address is required.";
  if (!isEmail(email)) return "Please enter a valid email address.";
  if (!required(password)) return "Password is required.";
  return "";
};

export const validateSignupForm = (form) => {
  if (!required(form.fullName)) return "Full name is required.";
  if (!isPhone(form.phone)) return "Please enter a valid phone number.";
  if (!isEmail(form.email)) return "Please enter a valid email address.";
  if (!required(form.address)) return "Address is required.";
  if (String(form.password || "").length < 6) return "Password must be at least 6 characters.";
  if (form.password !== form.confirmPassword) return "Passwords do not match.";
  if (!form.agree) return "Please agree to the terms and conditions.";
  return "";
};

export const validateContactForm = (form) => {
  if (!required(form.name)) return "Name is required.";
  if (!isEmail(form.email)) return "Please enter a valid email address.";
  if (!isPhone(form.phone)) return "Please enter a valid phone number.";
  if (!required(form.message)) return "Message is required.";
  return "";
};

export const validateBookingForm = (form) => {
  const travelers = Number(form.travelers || 0);
  if (!travelers || travelers < 1) return "Please choose at least one traveler.";
  if (!required(form.travelDate)) return "Travel date is required.";
  if (Number.isNaN(Date.parse(form.travelDate))) return "Please choose a valid travel date.";
  if (!required(form.fullName)) return "Full name is required.";
  if (!isEmail(form.email)) return "Please enter a valid email address.";
  if (!isPhone(form.phone)) return "Please enter a valid phone number.";
  if (!required(form.paymentMethod)) return "Payment method is required.";
  return "";
};

export const validatePackageForm = (form) => {
  if (!required(form.title)) return "Package title is required.";
  if (!required(form.destination)) return "Destination is required.";
  if (!required(form.state)) return "State is required.";
  if (Number(form.price) <= 0) return "Price must be greater than zero.";
  if (Number(form.days) <= 0) return "Days must be greater than zero.";
  if (Number(form.nights) < 0) return "Nights cannot be negative.";
  if (!required(form.category)) return "Category is required.";
  if (!required(form.description)) return "Description is required.";
  return "";
};
